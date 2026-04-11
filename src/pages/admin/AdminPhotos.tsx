import { useEffect, useRef, useState } from 'react';
import { Upload, Check, AlertCircle, ImageIcon, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin } from '../../lib/supabase';
import { IMAGE_REGISTRY, getSlotsByPage, type ImageSlot } from '../../lib/siteImages';

const BUCKET = 'Images du site';

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

async function convertToWebp(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas error')); return; }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error('Conversion failed'));
      }, 'image/webp', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}

function PhotoSlotCard({ slot, currentUrl, onSuccess }: {
  slot: ImageSlot;
  currentUrl: string;
  onSuccess: (key: string, url: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setErrorMsg('Fichier invalide — image uniquement.');
      return;
    }
    setUploading(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      const webp = await convertToWebp(file);
      const filename = `${slot.key}-${slugify(slot.label)}.webp`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(filename, webp, { contentType: 'image/webp', upsert: true });

      if (uploadError) throw new Error(uploadError.message);

      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(filename);

      const publicUrl = urlData.publicUrl;

      // Upsert in site_images table
      const { error: dbError } = await supabaseAdmin
        .from('site_images')
        .upsert({ key: slot.key, url: publicUrl, alt: slot.alt, page: slot.page, section: slot.section, label: slot.label, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (dbError) throw new Error(dbError.message);

      setStatus('success');
      onSuccess(slot.key, publicUrl);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Erreur lors de l\'upload.');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-sm transition-shadow">
      {/* Image preview */}
      <div className="relative aspect-video bg-stone-50 overflow-hidden">
        {currentUrl ? (
          <img
            src={currentUrl}
            alt={slot.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={32} className="text-stone-300" />
          </div>
        )}

        {/* Upload overlay on drag */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'bg-nude-600/80'
              : 'bg-black/0 hover:bg-black/40'
          }`}
        >
          <div className={`flex flex-col items-center gap-2 transition-opacity duration-200 ${dragOver ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
            {uploading ? (
              <RefreshCw size={28} className="text-white animate-spin" />
            ) : (
              <>
                <Upload size={28} className="text-white" />
                <span className="text-white text-xs font-medium text-center px-4">
                  {dragOver ? 'Déposer la photo' : 'Glisser-déposer ou cliquer'}
                </span>
              </>
            )}
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {/* Status badge */}
        {status === 'success' && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-green-500 text-white text-xs px-2.5 py-1.5 rounded-full font-medium">
            <Check size={12} />
            Mis à jour
          </div>
        )}
        {status === 'error' && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-500 text-white text-xs px-2.5 py-1.5 rounded-full font-medium">
            <AlertCircle size={12} />
            Erreur
          </div>
        )}
        {uploading && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg text-center">
            Conversion WebP & upload…
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-stone-800 leading-tight">{slot.label}</p>
        <p className="text-xs text-stone-400 mt-0.5">{slot.section}</p>
        {status === 'error' && errorMsg && (
          <p className="text-xs text-red-500 mt-1">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminPhotos() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [tableReady, setTableReady] = useState<boolean | null>(null);

  useEffect(() => {
    async function load() {
      // Check if table exists & load current URLs
      const { data, error } = await supabaseAdmin
        .from('site_images')
        .select('key, url');

      if (error) {
        setTableReady(false);
        return;
      }

      setTableReady(true);
      const map: Record<string, string> = {};
      for (const row of (data ?? []) as { key: string; url: string }[]) {
        map[row.key] = row.url;
      }
      // Fill missing with defaults
      for (const slot of IMAGE_REGISTRY) {
        if (!map[slot.key]) map[slot.key] = slot.defaultUrl;
      }
      setUrls(map);
    }
    load();
  }, []);

  function handleSuccess(key: string, url: string) {
    setUrls((prev) => ({ ...prev, [key]: url }));
  }

  const byPage = getSlotsByPage();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Photos du site</h1>
        <p className="text-stone-500 text-sm mt-1">
          Glissez-déposez une photo sur l'emplacement à remplacer. Elle est automatiquement convertie en WebP optimisé.
        </p>
      </div>

      {tableReady === false && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <p className="text-red-700 text-sm">Impossible de charger les photos. Vérifiez la connexion Supabase.</p>
        </div>
      )}

      {tableReady === null && (
        <p className="text-stone-400 text-sm">Chargement…</p>
      )}

      {tableReady !== null && (
        <div className="space-y-10">
          {Object.entries(byPage).map(([page, slots]) => (
            <div key={page}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-serif text-xl text-stone-800 font-light">{page}</h2>
                <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                  {slots.length} photo{slots.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {slots.map((slot) => (
                  <PhotoSlotCard
                    key={slot.key}
                    slot={slot}
                    currentUrl={urls[slot.key] ?? slot.defaultUrl}
                    onSuccess={handleSuccess}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
