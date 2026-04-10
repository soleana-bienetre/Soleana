import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';
import type { Review } from '../../lib/supabase';

const SERVICES = ['Épilation laser', 'Soins du visage', 'Kobido', 'Massage bien-être', 'Drainage & Maderothérapie', 'Autre'];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function AdminReviewForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id && id !== 'nouveau';

  const [form, setForm] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
    service: '',
    date: new Date().getFullYear().toString(),
    initials: '',
    published: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      adminRequest<Review | null>({
        op: 'select',
        resource: 'reviews',
        filters: [{ column: 'id', value: id ?? '' }],
        single: true,
      }).then((data) => {
        if (data) setForm({ ...data });
      });
    }
  }, [id, isEdit]);

  function set(field: string, value: unknown) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name') next.initials = getInitials(value as string);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.text || !form.location) {
      setError('Nom, ville et avis sont obligatoires.');
      return;
    }
    setSaving(true);
    const payload = { ...form, initials: form.initials || getInitials(form.name) };
    if (isEdit) {
      await adminRequest({
        op: 'update',
        resource: 'reviews',
        data: payload,
        filters: [{ column: 'id', value: id ?? '' }],
      });
    } else {
      await adminRequest({
        op: 'insert',
        resource: 'reviews',
        data: payload,
      });
    }
    navigate('/admin/avis');
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/avis')}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-serif text-3xl text-stone-800 font-light">
            {isEdit ? 'Modifier l\'avis' : 'Ajouter un avis Google'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-100 p-6 space-y-5">
          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Note</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set('rating', n)}
                  className="p-1"
                >
                  <Star
                    size={28}
                    className={n <= form.rating ? 'fill-ecru-400 text-ecru-400' : 'text-stone-200'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Texte */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Texte de l'avis <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.text}
              onChange={(e) => set('text', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300 resize-none"
              placeholder="Copiez-collez l'avis Google ici..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300"
                placeholder="Sophie M."
              />
            </div>

            {/* Initiales */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Initiales</label>
              <input
                value={form.initials}
                onChange={(e) => set('initials', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300"
                placeholder="Auto-générées"
                maxLength={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Ville <span className="text-red-400">*</span>
              </label>
              <input
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300"
                placeholder="Venerque"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Année / date</label>
              <input
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300"
                placeholder="2025"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Soin concerné (optionnel)</label>
            <select
              value={form.service}
              onChange={(e) => set('service', e.target.value)}
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nude-300 bg-white"
            >
              <option value="">— Aucun —</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Publié */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="w-4 h-4 accent-nude-600"
            />
            <label htmlFor="published" className="text-sm text-stone-700">
              Publier sur la page d'accueil
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/avis')}
              className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm hover:bg-stone-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
