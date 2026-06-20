import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  FileText,
  Star,
  Tag,
  Image,
  Gift,
  BarChart2,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Leaf,
} from 'lucide-react';
import { adminLogout } from '../../lib/adminAuth';

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/contacts', label: 'Contacts', icon: Mail },
  { href: '/admin/blog', label: 'Articles de blog', icon: FileText },
  { href: '/admin/avis', label: 'Avis clients', icon: Star },
  { href: '/admin/tarifs', label: 'Tarifs', icon: Tag },
  { href: '/admin/photos', label: 'Photos du site', icon: Image },
  { href: '/admin/cadeau', label: 'Cartes cadeaux', icon: Gift },
  { href: '/admin/statistiques', label: 'Statistiques', icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    adminLogout();
    navigate('/admin');
  }

  function isActive(item: typeof navItems[0]) {
    if (item.exact) return location.pathname === item.href;
    return location.pathname.startsWith(item.href);
  }

  const Sidebar = (
    <aside className="w-64 bg-stone-900 flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-stone-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-nude-600 flex items-center justify-center shrink-0">
            <Leaf size={15} className="text-white" />
          </div>
          <div>
            <p className="text-white font-serif text-sm font-light leading-tight">Soléana</p>
            <p className="text-stone-500 text-xs leading-tight">Administration</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-stone-600 text-[10px] font-semibold uppercase tracking-widest px-3 pb-2 pt-1">
          Navigation
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive(item)
                ? 'bg-nude-600 text-white shadow-sm'
                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <item.icon size={17} className="shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer sidebar */}
      <div className="px-3 py-4 border-t border-stone-800 shrink-0 space-y-0.5">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-400 hover:bg-stone-800 hover:text-white transition-colors duration-150"
        >
          <ExternalLink size={17} className="shrink-0" />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-stone-400 hover:bg-red-900/40 hover:text-red-300 transition-colors duration-150"
        >
          <LogOut size={17} className="shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* ── Sidebar desktop (toujours visible, sticky) ── */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:z-30">
        {Sidebar}
      </div>

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar mobile (drawer) ── */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {Sidebar}
      </div>

      {/* ── Contenu principal ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Top bar mobile */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white border-b border-stone-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-nude-600 flex items-center justify-center">
              <Leaf size={11} className="text-white" />
            </div>
            <span className="font-serif text-stone-800 text-sm">Administration</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
