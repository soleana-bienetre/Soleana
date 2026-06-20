import { useEffect, useRef, useState } from 'react';
import {
  Upload, RefreshCw, ImageIcon, PlusCircle, Trash2, Check, Eye, EyeOff,
  Gift, Mail, Phone, Inbox,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';
import { supabaseAdmin } from '../../lib/supabase';
import { IMAGE_REGISTRY } from '../../lib/siteImages';
import type { GiftCard, GiftCardRequest } from '../../lib/supabase';

const BUCKET = 'Images du site';
const COVER_KEY = 'bon-cadeau-cover';

const STATUS_OPTIONS = [
  { value: 'nouveau', label: 'Nouveau', cls: 'bg-nude-100 text-nude-700' },
  { value: 'en_attente_paiement', label: 'En attente de paiement', cls: 'bg-amber-100 text-amber-700' },
  { value: 'paye', label: 'Payé', cls: 'bg-sage-100 text-sage-700' },
  { value: 'envoye', label: 'Carte envoyée', cls: 'bg-green-100 text-green-700' },
];

// ─── Helpers upload WebP ──────────────────────────────────────────────────────

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function convertToWebp(file: File): Promise<Blob> {
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
        if (blob) resolve(blob); else reject(new Error('Conversion échouée'));
      }, 'image/webp', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Chargement image échoué')); };
    img.src = url;
  });
}

async function uploadWebp(file: File, filename: string): Promise<string> {
  const webp = await convertToWebp(file);
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filename, webp, { contentType: 'image/webp', upsert: true });
  if (error) throw new Error(error.message);
  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename);
  return `${data.publicUrl}?v=${Date.now()}`;
}

// ─── Section : Photo de couverture ────────────────────────────────────────────

function CoverUploader() {
  const slot = IMAGE_REGISTRY.find((s) => s.key === COVER_KEY)!;
  const [url, setUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabaseAdmin.from('site_images').select('url').eq('key', COVER_KEY).maybeSingle();
      setUrl((data as { url: string } | null)?.url ?? slot.defaultUrl);
    }
    load();
  }, [slot.defaultUrl]);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) { setError('Image uniquement.'); return; }
    setUploading(true); setError('');
    try {
      const filename = `${slot.key}-${slugify(slot.label)}.webp`;
      const publicUrl = await uploadWebp(file, filename);
      const { error: dbErr } = await supabaseAdmin.from('site_images').upsert(
        { key: slot.key, url: publicUrl, alt: slot.alt, page: slot.page, section: slot.section, label: slot.label, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );
      if (dbErr) throw new Error(dbErr.message);
      setUrl(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'upload.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden max-w-2xl">
      <div className="relative aspect-video bg-stone-50">
        {url ? (
          <img src={url} alt={slot.alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><ImageIcon size={32} className="text-stone-300" /></div>
        )}
        <div
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all ${dragOver ? 'bg-nude-600/80' : 'bg-black/0 hover:bg-black/40'}`}
        >
          <div className={`flex flex-col items-center gap-2 transition-opacity ${dragOver ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
            {uploading ? <RefreshCw size={28} className="text-white animate-spin" /> : (
              <>
                <Upload size={28} className="text-white" />
                <span className="text-white text-xs font-medium">{dragOver ? 'Déposer la photo' : 'Glisser-déposer ou cliquer'}</span>
              </>
            )}
          </div>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-stone-800">Photo de couverture de la page</p>
        <p className="text-xs text-stone-400 mt-0.5">Conversion automatique en WebP optimisé.</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
}

// ─── Section : Cartes / prestations ───────────────────────────────────────────

function CardRow({ card, onChange, onDelete }: {
  card: GiftCard;
  onChange: (c: GiftCard) => void;
  onDelete: (c: GiftCard) => void;
}) {
  const [local, setLocal] = useState(card);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dirty = local.title !== card.title || local.description !== card.description || local.price !== card.price;

  async function save(patch?: Partial<GiftCard>) {
    const merged = { ...local, ...patch };
    setSaving(true);
    await adminRequest({
      op: 'update',
      resource: 'gift_cards',
      data: {
        title: merged.title,
        description: merged.description || null,
        price: merged.price || null,
        image_url: merged.image_url || null,
        visible: merged.visible,
        updated_at: new Date().toISOString(),
      },
      filters: [{ column: 'id', value: card.id }],
    });
    setLocal(merged);
    onChange(merged);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleImage(file: File) {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const newUrl = await uploadWebp(file, `gift-card-${card.id}.webp`);
      await save({ image_url: newUrl });
    } catch { /* ignore */ } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`bg-white rounded-2xl border p-4 ${local.visible ? 'border-stone-100' : 'border-stone-100 opacity-60'}`}>
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-nude-100 to-sand-100">
          {local.image_url ? (
            <img src={local.image_url} alt={local.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><Gift size={26} className="text-nude-400" /></div>
          )}
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 text-white opacity-0 hover:opacity-100 transition-all"
          >
            {uploading ? <RefreshCw size={18} className="animate-spin" /> : <Upload size={18} />}
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} />
        </div>

        {/* Champs */}
        <div className="flex-1 min-w-0 space-y-2">
          <input
            value={local.title}
            onChange={(e) => setLocal({ ...local, title: e.target.value })}
            placeholder="Titre de la prestation"
            className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-nude-200"
          />
          <input
            value={local.price ?? ''}
            onChange={(e) => setLocal({ ...local, price: e.target.value })}
            placeholder="Prix affiché (ex : À partir de 60€, ou Montant au choix)"
            className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-nude-200"
          />
          <textarea
            value={local.description ?? ''}
            onChange={(e) => setLocal({ ...local, description: e.target.value })}
            placeholder="Description de la prestation…"
            rows={2}
            className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-nude-200"
          />
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => save()}
              disabled={saving || !dirty}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-nude-600 text-white text-xs rounded-lg hover:bg-nude-700 disabled:opacity-40 transition-colors"
            >
              {saving ? <RefreshCw size={12} className="animate-spin" /> : <Check size={12} />}
              {saved ? 'Enregistré' : 'Enregistrer'}
            </button>
            <button
              onClick={() => save({ visible: !local.visible })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs rounded-lg hover:bg-stone-200 transition-colors"
            >
              {local.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              {local.visible ? 'Visible' : 'Masquée'}
            </button>
            <button
              onClick={() => onDelete(card)}
              className="ml-auto p-1.5 rounded-lg hover:bg-red-50 text-stone-300 hover:text-red-400 transition-colors"
              title="Supprimer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCadeau() {
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [requests, setRequests] = useState<GiftCardRequest[]>([]);
  const [selected, setSelected] = useState<GiftCardRequest | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const [c, r] = await Promise.all([
      adminRequest<GiftCard[]>({ op: 'select', resource: 'gift_cards', order: [{ column: 'card_order', ascending: true }] }),
      adminRequest<GiftCardRequest[]>({ op: 'select', resource: 'gift_card_requests', order: [{ column: 'created_at', ascending: false }] }),
    ]);
    setCards(c ?? []);
    setRequests(r ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addCard() {
    const nextOrder = cards.length ? Math.max(...cards.map((c) => c.card_order)) + 1 : 1;
    const created = await adminRequest<GiftCard>({
      op: 'insert',
      resource: 'gift_cards',
      data: { title: 'Nouvelle prestation', description: '', price: '', card_order: nextOrder, visible: true },
      single: true,
    });
    if (created) setCards((prev) => [...prev, created as GiftCard]);
  }

  async function deleteCard(card: GiftCard) {
    if (!confirm(`Supprimer la carte « ${card.title} » ?`)) return;
    await adminRequest({ op: 'delete', resource: 'gift_cards', filters: [{ column: 'id', value: card.id }] });
    setCards((prev) => prev.filter((c) => c.id !== card.id));
  }

  function updateCard(card: GiftCard) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  async function setStatus(req: GiftCardRequest, status: string) {
    await adminRequest({ op: 'update', resource: 'gift_card_requests', data: { status }, filters: [{ column: 'id', value: req.id }] });
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, status } : r)));
    if (selected?.id === req.id) setSelected((s) => (s ? { ...s, status } : s));
  }

  async function markRead(req: GiftCardRequest) {
    if (req.is_read) return;
    await adminRequest({ op: 'update', resource: 'gift_card_requests', data: { is_read: true }, filters: [{ column: 'id', value: req.id }] });
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, is_read: true } : r)));
  }

  async function deleteRequest(req: GiftCardRequest) {
    if (!confirm('Supprimer cette demande ?')) return;
    await adminRequest({ op: 'delete', resource: 'gift_card_requests', filters: [{ column: 'id', value: req.id }] });
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    if (selected?.id === req.id) setSelected(null);
  }

  function openRequest(req: GiftCardRequest) {
    setSelected(req);
    markRead(req);
  }

  const unread = requests.filter((r) => !r.is_read).length;

  function statusMeta(value: string) {
    return STATUS_OPTIONS.find((s) => s.value === value) ?? STATUS_OPTIONS[0];
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Cartes cadeaux</h1>
        <p className="text-stone-500 text-sm mt-1">
          Gérez la page « carte cadeau » du site : photo de couverture, prestations proposées et demandes reçues.
        </p>
      </div>

      {/* ── Couverture ── */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-stone-800 font-light mb-4">Photo de couverture</h2>
        <CoverUploader />
      </section>

      {/* ── Cartes ── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl text-stone-800 font-light">Prestations proposées</h2>
            <p className="text-stone-400 text-xs mt-0.5">Ces cartes s'affichent sur le site. Les modifications sont appliquées immédiatement.</p>
          </div>
          <button onClick={addCard} className="inline-flex items-center gap-1.5 text-sm text-nude-600 hover:text-nude-700 font-medium">
            <PlusCircle size={16} /> Ajouter une carte
          </button>
        </div>
        {loading ? (
          <p className="text-stone-400 text-sm">Chargement…</p>
        ) : cards.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center">
            <Gift size={28} className="text-stone-300 mx-auto mb-2" />
            <p className="text-stone-400 text-sm">Aucune carte. Cliquez sur « Ajouter une carte ».</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {cards.map((card) => (
              <CardRow key={card.id} card={card} onChange={updateCard} onDelete={deleteCard} />
            ))}
          </div>
        )}
      </section>

      {/* ── Demandes ── */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-serif text-xl text-stone-800 font-light">Demandes reçues</h2>
          {unread > 0 && (
            <span className="text-xs bg-nude-100 text-nude-700 px-2.5 py-1 rounded-full font-medium">{unread} nouvelle{unread > 1 ? 's' : ''}</span>
          )}
        </div>

        {loading ? (
          <p className="text-stone-400 text-sm">Chargement…</p>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center">
            <Inbox size={28} className="text-stone-300 mx-auto mb-2" />
            <p className="text-stone-400 text-sm">Aucune demande pour l'instant.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Liste */}
            <div className="space-y-2">
              {requests.map((req) => {
                const meta = statusMeta(req.status);
                return (
                  <button
                    key={req.id}
                    onClick={() => openRequest(req)}
                    className={`w-full text-left bg-white rounded-xl border p-4 hover:shadow-sm transition-all ${selected?.id === req.id ? 'border-nude-300 ring-1 ring-nude-200' : 'border-stone-100'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!req.is_read && <span className="w-2 h-2 rounded-full bg-nude-500 shrink-0" />}
                          <p className={`text-sm truncate ${req.is_read ? 'font-normal text-stone-600' : 'font-semibold text-stone-800'}`}>{req.buyer_name}</p>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5 truncate">
                          {req.gift_choice || 'Montant libre'}{req.amount ? ` · ${req.amount}` : ''}
                        </p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${meta.cls}`}>{meta.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Détail */}
            {selected ? (
              <div className="bg-white rounded-2xl border border-stone-100 p-6 h-fit lg:sticky lg:top-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl text-stone-800">{selected.buyer_name}</h3>
                    <a href={`mailto:${selected.buyer_email}`} className="text-nude-600 text-sm hover:underline flex items-center gap-1.5 mt-1">
                      <Mail size={13} /> {selected.buyer_email}
                    </a>
                    {selected.buyer_phone && (
                      <a href={`tel:${selected.buyer_phone}`} className="text-stone-500 text-sm hover:text-nude-600 flex items-center gap-1.5 mt-1">
                        <Phone size={13} /> {selected.buyer_phone}
                      </a>
                    )}
                    <p className="text-xs text-stone-400 mt-1">
                      {new Date(selected.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button onClick={() => deleteRequest(selected)} className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors" title="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>

                <dl className="space-y-2.5 text-sm bg-stone-50 rounded-xl p-4">
                  <Detail label="Pour qui" value={selected.recipient} />
                  <Detail label="Cadeau" value={selected.gift_choice || 'Montant libre'} />
                  <Detail label="Montant / prestation" value={selected.amount} />
                  <Detail label="Mode de réception" value={selected.delivery_method} />
                  {selected.postal_address && <Detail label="Adresse postale" value={selected.postal_address} />}
                  {selected.message && <Detail label="Message" value={selected.message} />}
                </dl>

                <div className="mt-5">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Statut</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStatus(selected, opt.value)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${selected.status === opt.value ? opt.cls + ' ring-2 ring-offset-1 ring-stone-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:${selected.buyer_email}?subject=Votre carte cadeau Soléana Bien-Être`}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors"
                >
                  <Mail size={15} /> Répondre par email
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-100 p-12 flex items-center justify-center">
                <p className="text-stone-400 text-sm">Sélectionnez une demande</p>
              </div>
            )}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3">
      <dt className="text-stone-400 sm:w-40 shrink-0">{label}</dt>
      <dd className="text-stone-700 whitespace-pre-wrap">{value}</dd>
    </div>
  );
}
