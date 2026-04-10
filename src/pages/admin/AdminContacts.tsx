import { useEffect, useState } from 'react';
import { Mail, Trash2, Check, Phone } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin, type Contact } from '../../lib/supabase';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  async function load() {
    const { data } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setContacts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await supabaseAdmin.from('contacts').update({ is_read: true }).eq('id', id);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, is_read: true } : c));
    if (selected?.id === id) setSelected((s) => s ? { ...s, is_read: true } : s);
  }

  async function deleteContact(id: string) {
    if (!confirm('Supprimer ce message ?')) return;
    await supabaseAdmin.from('contacts').delete().eq('id', id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function openContact(contact: Contact) {
    setSelected(contact);
    if (!contact.is_read) markRead(contact.id);
  }

  const unread = contacts.filter((c) => !c.is_read).length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Messages</h1>
        <p className="text-stone-500 text-sm mt-1">
          {unread > 0 ? `${unread} message(s) non lu(s)` : 'Tous les messages sont lus'}
        </p>
      </div>

      {loading ? (
        <div className="text-stone-400 text-sm">Chargement...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center">
          <Mail size={32} className="text-stone-300 mx-auto mb-3" />
          <p className="text-stone-400 text-sm">Aucun message pour l'instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Liste */}
          <div className="space-y-2">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => openContact(contact)}
                className={`w-full text-left bg-white rounded-xl border p-4 hover:shadow-sm transition-all duration-150 ${
                  selected?.id === contact.id ? 'border-nude-300 ring-1 ring-nude-200' : 'border-stone-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!contact.is_read && (
                        <span className="w-2 h-2 rounded-full bg-nude-500 shrink-0" />
                      )}
                      <p className={`text-sm ${contact.is_read ? 'font-normal text-stone-600' : 'font-semibold text-stone-800'} truncate`}>
                        {contact.name}
                      </p>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5 truncate">{contact.email}</p>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                  <p className="text-xs text-stone-400 shrink-0">
                    {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Détail */}
          {selected ? (
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-xl text-stone-800">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-nude-600 text-sm hover:underline">{selected.email}</a>
                  {selected.phone && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Phone size={13} className="text-stone-400" />
                      <a href={`tel:${selected.phone}`} className="text-stone-500 text-sm hover:text-nude-600">{selected.phone}</a>
                    </div>
                  )}
                  <p className="text-xs text-stone-400 mt-1">
                    {new Date(selected.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!selected.is_read && (
                    <button
                      onClick={() => markRead(selected.id)}
                      className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 transition-colors"
                      title="Marquer comme lu"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(selected.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <div className="mt-4">
                <a
                  href={`mailto:${selected.email}?subject=Re: votre message à Soléana Bien-Être`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors"
                >
                  <Mail size={15} />
                  Répondre par email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-100 p-12 flex items-center justify-center">
              <p className="text-stone-400 text-sm">Sélectionnez un message</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
