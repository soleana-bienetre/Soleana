import { useEffect, useState } from 'react';
import { Pencil, Check, X, PlusCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin, type Tarif } from '../../lib/supabase';

type GroupedCategory = {
  id: string;
  label: string;
  order: number;
  items: Tarif[];
};

export default function AdminTarifs() {
  const [categories, setCategories] = useState<GroupedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabaseAdmin
      .from('tarifs')
      .select('*')
      .order('category_order')
      .order('item_order');

    if (data) {
      const map = new Map<string, GroupedCategory>();
      for (const t of data as Tarif[]) {
        if (!map.has(t.category_id)) {
          map.set(t.category_id, { id: t.category_id, label: t.category_label, order: t.category_order, items: [] });
        }
        map.get(t.category_id)!.items.push(t);
      }
      setCategories(Array.from(map.values()));
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(tarif: Tarif) {
    setEditingId(tarif.id);
    setEditPrice(tarif.price);
    setEditNote(tarif.note ?? '');
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(tarif: Tarif) {
    setSaving(true);
    await supabaseAdmin
      .from('tarifs')
      .update({ price: editPrice, note: editNote || null, updated_at: new Date().toISOString() })
      .eq('id', tarif.id);
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === tarif.id ? { ...item, price: editPrice, note: editNote || undefined } : item
        ),
      }))
    );
    setEditingId(null);
    setSaving(false);
  }

  async function toggleVisible(tarif: Tarif) {
    await supabaseAdmin.from('tarifs').update({ visible: !tarif.visible }).eq('id', tarif.id);
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === tarif.id ? { ...item, visible: !tarif.visible } : item
        ),
      }))
    );
  }

  async function addItem(categoryId: string, categoryLabel: string, categoryOrder: number) {
    const name = prompt('Nom du soin :');
    if (!name) return;
    const price = prompt('Prix :') ?? '[PRIX À DÉFINIR]';
    const cat = categories.find((c) => c.id === categoryId);
    const nextOrder = (cat?.items.length ?? 0) + 1;
    const { data } = await supabaseAdmin
      .from('tarifs')
      .insert({ category_id: categoryId, category_label: categoryLabel, category_order: categoryOrder, name, price, item_order: nextOrder })
      .select()
      .single();
    if (data) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, items: [...cat.items, data as Tarif] } : cat
        )
      );
    }
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Tarifs</h1>
        <p className="text-stone-500 text-sm mt-1">Cliquez sur le crayon pour modifier un prix. Les changements sont appliqués immédiatement sur le site.</p>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Chargement...</p>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-50 bg-stone-50/50">
                <h2 className="font-serif text-lg text-stone-800 font-light">{cat.label}</h2>
                <button
                  onClick={() => addItem(cat.id, cat.label, cat.order)}
                  className="inline-flex items-center gap-1.5 text-xs text-nude-600 hover:text-nude-700 font-medium"
                >
                  <PlusCircle size={14} />
                  Ajouter
                </button>
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-stone-50">
                  {cat.items.map((tarif) => (
                    <tr key={tarif.id} className={`${!tarif.visible ? 'opacity-40' : ''} hover:bg-stone-50/30 transition-colors`}>
                      <td className="px-5 py-3 text-sm text-stone-700 w-1/2">
                        {tarif.name}
                        {tarif.note && editingId !== tarif.id && (
                          <p className="text-xs text-stone-400 mt-0.5">{tarif.note}</p>
                        )}
                      </td>
                      <td className="px-5 py-3 w-1/2">
                        {editingId === tarif.id ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-nude-200"
                                placeholder="ex: 45€"
                                autoFocus
                              />
                              <button onClick={() => saveEdit(tarif)} disabled={saving} className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                <Check size={14} />
                              </button>
                              <button onClick={cancelEdit} className="p-1.5 bg-stone-100 text-stone-500 rounded-lg hover:bg-stone-200">
                                <X size={14} />
                              </button>
                            </div>
                            <input
                              value={editNote}
                              onChange={(e) => setEditNote(e.target.value)}
                              className="border border-stone-200 rounded-lg px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-nude-200"
                              placeholder="Note optionnelle..."
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <span className={`text-sm font-medium ${tarif.price.startsWith('[') ? 'text-stone-400 italic' : 'text-stone-800'}`}>
                              {tarif.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEdit(tarif)}
                                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-nude-600 transition-colors"
                                title="Modifier le prix"
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                onClick={() => toggleVisible(tarif)}
                                className="text-xs px-2 py-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors"
                                title={tarif.visible ? 'Masquer' : 'Afficher'}
                              >
                                {tarif.visible ? '👁' : '🙈'}
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
