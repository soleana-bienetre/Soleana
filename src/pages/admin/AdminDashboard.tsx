import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, FileText, Star, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ contacts: 0, unread: 0, articles: 0, reviews: 0 });

  useEffect(() => {
    async function load() {
      const [contacts, unread, articles, reviews] =
        await Promise.all([
          adminRequest<number>({ op: 'count', resource: 'contacts' }),
          adminRequest<number>({ op: 'count', resource: 'contacts', filters: [{ column: 'is_read', value: false }] }),
          adminRequest<number>({ op: 'count', resource: 'blog_articles' }),
          adminRequest<number>({ op: 'count', resource: 'reviews' }),
        ]);
      setStats({ contacts, unread, articles, reviews });
    }
    load();
  }, []);

  const cards = [
    { label: 'Messages reçus', value: stats.contacts, sub: `${stats.unread} non lu(s)`, icon: Mail, href: '/admin/contacts', color: 'bg-blue-50 text-blue-600' },
    { label: 'Articles de blog', value: stats.articles, sub: 'Articles publiés et brouillons', icon: FileText, href: '/admin/blog', color: 'bg-nude-50 text-nude-600' },
    { label: 'Avis clients', value: stats.reviews, sub: 'Affichés sur la page d\'accueil', icon: Star, href: '/admin/avis', color: 'bg-ecru-50 text-ecru-600' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-stone-800 font-light">Tableau de bord</h1>
        <p className="text-stone-500 text-sm mt-1">Bienvenue dans l'espace d'administration de Soléana.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            to={card.href}
            className="bg-white rounded-2xl border border-stone-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={20} />
            </div>
            <p className="text-3xl font-serif font-light text-stone-800">{card.value}</p>
            <p className="text-sm font-medium text-stone-700 mt-1">{card.label}</p>
            <p className="text-xs text-stone-400 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-serif text-lg text-stone-800 mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <Link to="/admin/blog/nouveau" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-sm text-stone-600 transition-colors">
              <FileText size={16} className="text-nude-500" />
              Rédiger un nouvel article
            </Link>
            <Link to="/admin/avis/nouveau" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-sm text-stone-600 transition-colors">
              <Star size={16} className="text-ecru-500" />
              Ajouter un avis Google
            </Link>
            <Link to="/admin/contacts" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 text-sm text-stone-600 transition-colors">
              <Eye size={16} className="text-blue-500" />
              Voir les messages non lus
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-serif text-lg text-stone-800 mb-4">Accès rapide au site</h2>
          <div className="space-y-2 text-sm text-stone-500">
            {['/', '/blog', '/contact', '/tarifs'].map((path) => (
              <a
                key={path}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <Eye size={14} />
                {path === '/' ? 'Page d\'accueil' : path.replace('/', '')}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
