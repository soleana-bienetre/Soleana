import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Eye, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';
import type { BlogArticle } from '../../lib/supabase';

const CATEGORIES = ['Bien-être', 'Épilation laser', 'Soins du visage', 'Kobido', 'Massages', 'Conseils beauté', 'Actualités'];

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 0.82;

async function convertToWebp(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = img.naturalWidth > MAX_WIDTH ? MAX_WIDTH / img.naturalWidth : 1;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas error')); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error('Conversion WebP échouée'));
      }, 'image/webp', WEBP_QUALITY);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Impossible de charger l\'image')); };
    img.src = url;
  });
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error('Unable to read image.'));
    };
    reader.onerror = () => reject(new Error('Unable to read image.'));
    reader.readAsDataURL(blob);
  });
}

function seoSlug(title: string): string {
  return slugify(title);
}

export default function AdminBlogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id && id !== 'nouveau';
  const dropRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    og_image_url: '',
    og_image_alt: '',
    category: '',
    tags: '',
    read_time: 5,
    published: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (isEdit) {
      adminRequest<BlogArticle | null>({
        op: 'select',
        resource: 'blog_articles',
        filters: [{ column: 'id', value: id ?? '' }],
        single: true,
      }).then((data) => {
        if (data) {
          setForm({
            title: data.title ?? '',
            slug: data.slug ?? '',
            excerpt: data.excerpt ?? '',
            content: data.content ?? '',
            meta_title: data.meta_title ?? '',
            meta_description: data.meta_description ?? '',
            og_image_url: data.og_image_url ?? '',
            og_image_alt: data.og_image_alt ?? '',
            category: data.category ?? '',
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
            read_time: data.read_time ?? 5,
            published: data.published ?? false,
          });
          if (data.og_image_url) setImagePreview(data.og_image_url);
          setSlugManual(true);
        }
      });
    }
  }, [id, isEdit]);

  function set(field: string, value: unknown) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugManual) {
        next.slug = seoSlug(value as string);
        if (!next.meta_title) next.meta_title = value as string;
      }
      return next;
    });
  }

  async function handleImageFile(file: File) {
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file);
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return form.og_image_url || null;
    setUploading(true);
    try {
      const webp = await convertToWebp(imageFile);
      const filename = `${seoSlug(form.title || 'article')}-${Date.now()}.webp`;
      const base64Data = await blobToDataUrl(webp);
      return await adminRequest<string>({
        op: 'uploadBlogImage',
        fileName: filename,
        contentType: 'image/webp',
        base64Data,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Erreur upload image : ${msg}`);
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug) { setError('Titre et slug sont obligatoires.'); return; }
    setSaving(true);
    setError('');

    const imageUrl = await uploadImage();

    // Si une nouvelle image était sélectionnée mais l'upload a échoué, ne pas continuer
    if (imageFile !== null && imageUrl === null) {
      setSaving(false);
      return;
    }

    const payload: Partial<BlogArticle> = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description,
      og_image_url: imageUrl ?? form.og_image_url,
      og_image_alt: form.og_image_alt,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      read_time: form.read_time,
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    if (form.published && !isEdit) {
      payload.published_at = new Date().toISOString();
    }

    if (isEdit) {
      try {
        await adminRequest({
          op: 'update',
          resource: 'blog_articles',
          data: payload,
          filters: [{ column: 'id', value: id ?? '' }],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde.');
        setSaving(false);
        return;
      }
    } else {
      try {
        await adminRequest({
          op: 'insert',
          resource: 'blog_articles',
          data: { ...payload, created_at: new Date().toISOString() },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde.');
        setSaving(false);
        return;
      }
    }
    navigate('/admin/blog');
  }

  const inputClass = 'w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300';

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/admin/blog')} className="p-2 rounded-lg hover:bg-stone-100 text-stone-500">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-serif text-3xl text-stone-800 font-light">
            {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-5">
                <h2 className="font-medium text-stone-700 text-sm">Contenu</h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Titre <span className="text-red-400">*</span></label>
                  <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} placeholder="Mon article sur le Kobido..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Slug (URL)</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 bg-stone-50 border border-stone-200 rounded-l-xl text-stone-400 text-sm border-r-0">/blog/</span>
                    <input
                      value={form.slug}
                      onChange={(e) => { setSlugManual(true); set('slug', slugify(e.target.value)); }}
                      className="flex-1 px-4 py-3 border border-stone-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300"
                      placeholder="mon-article-kobido"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Extrait (résumé)</label>
                  <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} className={inputClass + ' resize-none'} placeholder="Une courte description de l'article..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Contenu</label>
                  <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={14} className={inputClass + ' resize-y font-mono text-xs'} placeholder="Rédigez votre article ici..." />
                </div>
              </div>

              {/* Image */}
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <h2 className="font-medium text-stone-700 text-sm mb-4">Image de couverture</h2>

                <div
                  ref={dropRef}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className={`relative border-2 border-dashed rounded-xl transition-colors ${
                    dragOver ? 'border-nude-400 bg-nude-50' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(''); setImageFile(null); set('og_image_url', ''); }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow text-stone-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                        {imageFile ? `→ WebP max 1200px · ${(imageFile.size / 1024).toFixed(0)} Ko originale` : 'Image existante'}
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-10 cursor-pointer">
                      <Upload size={24} className="text-stone-300 mb-3" />
                      <p className="text-sm text-stone-500">Glissez-déposez une image ou <span className="text-nude-600 underline">parcourir</span></p>
                      <p className="text-xs text-stone-400 mt-1">Convertie automatiquement en WebP optimisé</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])} />
                    </label>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Texte alternatif (alt SEO)</label>
                  <input value={form.og_image_alt} onChange={(e) => set('og_image_alt', e.target.value)} className={inputClass} placeholder="Description de l'image pour le SEO..." />
                </div>
              </div>
            </div>

            {/* Colonne SEO + params */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
                <h2 className="font-medium text-stone-700 text-sm">Publication</h2>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="published" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-nude-600" />
                  <label htmlFor="published" className="text-sm text-stone-700">Publier l'article</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Catégorie</label>
                  <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputClass + ' bg-white'}>
                    <option value="">— Choisir —</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Tags (séparés par des virgules)</label>
                  <input value={form.tags} onChange={(e) => set('tags', e.target.value)} className={inputClass} placeholder="kobido, massage, bien-être" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Temps de lecture (min)</label>
                  <input type="number" min={1} max={60} value={form.read_time} onChange={(e) => set('read_time', Number(e.target.value))} className={inputClass} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
                <h2 className="font-medium text-stone-700 text-sm flex items-center gap-2">
                  <Eye size={14} />
                  SEO
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Meta title</label>
                  <input value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} className={inputClass} placeholder="Titre pour Google (60 car.)" maxLength={70} />
                  <p className="text-xs text-stone-400 mt-1">{form.meta_title.length}/70 caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Meta description</label>
                  <textarea value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} rows={3} className={inputClass + ' resize-none'} placeholder="Description pour Google (160 car.)" maxLength={160} />
                  <p className="text-xs text-stone-400 mt-1">{form.meta_description.length}/160 caractères</p>
                </div>

                {/* Prévisualisation SERP */}
                {(form.meta_title || form.title) && (
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                    <p className="text-xs text-stone-400 mb-2">Aperçu Google</p>
                    <p className="text-blue-700 text-sm font-medium leading-snug line-clamp-1">{form.meta_title || form.title}</p>
                    <p className="text-green-700 text-xs mt-0.5">soleana-bienetre.com/blog/{form.slug}</p>
                    <p className="text-stone-500 text-xs mt-1 line-clamp-2">{form.meta_description || form.excerpt || '—'}</p>
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
                >
                  {(saving || uploading) ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? 'Enregistrement...' : uploading ? 'Upload image...' : 'Enregistrer'}
                </button>
                <button type="button" onClick={() => navigate('/admin/blog')} className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm hover:bg-stone-50 transition-colors text-center">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
