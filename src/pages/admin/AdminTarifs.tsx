import { useEffect, useState } from 'react';
import { Pencil, Check, X, PlusCircle, Trash2, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';
import type { Tarif } from '../../lib/supabase';

type GroupedCategory = {
  id: string;
  label: string;
  order: number;
  items: Tarif[];
};

// ─── Sortable Row ─────────────────────────────────────────────────────────────

function SortableRow({
  tarif,
  editingId,
  editName,
  editPrice,
  editNote,
  saving,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleVisible,
  onDelete,
  onEditName,
  onEditPrice,
  onEditNote,
}: {
  tarif: Tarif;
  editingId: string | null;
  editName: string;
  editPrice: string;
  editNote: string;
  saving: boolean;
  onStartEdit: (t: Tarif) => void;
  onCancelEdit: () => void;
  onSaveEdit: (t: Tarif) => void;
  onToggleVisible: (t: Tarif) => void;
  onDelete: (t: Tarif) => void;
  onEditName: (v: string) => void;
  onEditPrice: (v: string) => void;
  onEditNote: (v: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tarif.id,
    disabled: editingId !== null,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  const isEditing = editingId === tarif.id;

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`${!tarif.visible ? 'opacity-40' : ''} hover:bg-stone-50/30 transition-colors`}
    >
      {/* Drag handle */}
      <td className="pl-3 pr-1 py-3 w-6">
        {!isEditing && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-400 touch-none"
            tabIndex={-1}
          >
            <GripVertical size={14} />
          </button>
        )}
      </td>

      {/* Nom */}
      <td className="px-3 py-3 text-sm text-stone-700 w-1/2">
        {isEditing ? (
          <input
            value={editName}
            onChange={(e) => onEditName(e.target.value)}
            className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-nude-200"
            placeholder="Nom du soin"
          />
        ) : (
          <>
            {tarif.name}
            {tarif.note && (
              <p className="text-xs text-stone-400 mt-0.5 whitespace-pre-line">{tarif.note}</p>
            )}
          </>
        )}
      </td>

      {/* Prix + actions */}
      <td className="px-3 py-3 w-1/2">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-nude-200">
                <input
                  value={editPrice}
                  onChange={(e) => onEditPrice(e.target.value)}
                  className="px-3 py-1.5 text-sm w-24 focus:outline-none"
                  placeholder="ex: 45"
                  autoFocus
                />
                <span className="px-2 py-1.5 text-sm text-stone-400 bg-stone-50 border-l border-stone-200 select-none">€</span>
              </div>
              <button onClick={() => onSaveEdit(tarif)} disabled={saving} className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                <Check size={14} />
              </button>
              <button onClick={onCancelEdit} className="p-1.5 bg-stone-100 text-stone-500 rounded-lg hover:bg-stone-200">
                <X size={14} />
              </button>
            </div>
            <input
              value={editNote}
              onChange={(e) => onEditNote(e.target.value)}
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
                onClick={() => onStartEdit(tarif)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-nude-600 transition-colors"
                title="Modifier"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => onToggleVisible(tarif)}
                className="text-xs px-2 py-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors"
                title={tarif.visible ? 'Masquer' : 'Afficher'}
              >
                {tarif.visible ? '👁' : '🙈'}
              </button>
              <button
                onClick={() => onDelete(tarif)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-stone-300 hover:text-red-400 transition-colors"
                title="Supprimer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminTarifs() {
  const [categories, setCategories] = useState<GroupedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  async function load() {
    const data = await adminRequest<Tarif[]>({
      op: 'select',
      resource: 'tarifs',
      order: [
        { column: 'category_order', ascending: true },
        { column: 'item_order', ascending: true },
      ],
    });
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
    setEditName(tarif.name);
    setEditPrice(tarif.price.replace(/\s*€$/, ''));
    setEditNote(tarif.note ?? '');
  }

  function cancelEdit() { setEditingId(null); }

  function formatPrice(raw: string): string {
    const trimmed = raw.trim();
    return /^\d+([.,]\d+)?$/.test(trimmed) ? `${trimmed}€` : trimmed;
  }

  async function saveEdit(tarif: Tarif) {
    setSaving(true);
    const finalPrice = formatPrice(editPrice);
    await adminRequest({
      op: 'update',
      resource: 'tarifs',
      data: { name: editName, price: finalPrice, note: editNote || null, updated_at: new Date().toISOString() },
      filters: [{ column: 'id', value: tarif.id }],
    });
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === tarif.id ? { ...item, name: editName, price: finalPrice, note: editNote || undefined } : item
        ),
      }))
    );
    setEditingId(null);
    setSaving(false);
  }

  async function toggleVisible(tarif: Tarif) {
    await adminRequest({
      op: 'update',
      resource: 'tarifs',
      data: { visible: !tarif.visible },
      filters: [{ column: 'id', value: tarif.id }],
    });
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === tarif.id ? { ...item, visible: !tarif.visible } : item
        ),
      }))
    );
  }

  async function deleteItem(tarif: Tarif) {
    if (!confirm(`Supprimer "${tarif.name}" ?`)) return;
    await adminRequest({
      op: 'delete',
      resource: 'tarifs',
      filters: [{ column: 'id', value: tarif.id }],
    });
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.id !== tarif.id),
      }))
    );
  }

  async function addItem(categoryId: string, categoryLabel: string, categoryOrder: number) {
    const name = prompt('Nom du soin :');
    if (!name) return;
    const rawPrice = prompt('Prix (chiffre uniquement, ex: 45) :') ?? '';
    const price = rawPrice ? formatPrice(rawPrice) : '[PRIX À DÉFINIR]';
    const cat = categories.find((c) => c.id === categoryId);
    const nextOrder = (cat?.items.length ?? 0) + 1;
    const data = await adminRequest<Tarif>({
      op: 'insert',
      resource: 'tarifs',
      data: { category_id: categoryId, category_label: categoryLabel, category_order: categoryOrder, name, price, item_order: nextOrder },
      single: true,
    });
    if (data) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, items: [...cat.items, data as Tarif] } : cat
        )
      );
    }
  }

  async function handleDragEnd(event: DragEndEvent, categoryId: string) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        const oldIndex = cat.items.findIndex((i) => i.id === active.id);
        const newIndex = cat.items.findIndex((i) => i.id === over.id);
        const reordered = arrayMove(cat.items, oldIndex, newIndex).map((item, idx) => ({
          ...item,
          item_order: idx + 1,
        }));

        // Persist in background
        reordered.forEach((item) => {
          adminRequest({
            op: 'update',
            resource: 'tarifs',
            data: { item_order: item.item_order },
            filters: [{ column: 'id', value: item.id }],
          });
        });

        return { ...cat, items: reordered };
      })
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Tarifs</h1>
        <p className="text-stone-500 text-sm mt-1">
          Glissez <GripVertical size={12} className="inline" /> pour réordonner. Cliquez sur le crayon pour modifier. Les changements sont appliqués immédiatement sur le site.
        </p>
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

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, cat.id)}
              >
                <SortableContext items={cat.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                  <table className="w-full">
                    <tbody className="divide-y divide-stone-50">
                      {cat.items.map((tarif) => (
                        <SortableRow
                          key={tarif.id}
                          tarif={tarif}
                          editingId={editingId}
                          editName={editName}
                          editPrice={editPrice}
                          editNote={editNote}
                          saving={saving}
                          onStartEdit={startEdit}
                          onCancelEdit={cancelEdit}
                          onSaveEdit={saveEdit}
                          onToggleVisible={toggleVisible}
                          onDelete={deleteItem}
                          onEditName={setEditName}
                          onEditPrice={setEditPrice}
                          onEditNote={setEditNote}
                        />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
