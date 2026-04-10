import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  FileText,
  Star,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react';
import { adminLogout } from '../../lib/adminAuth';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/contacts', label: 'Contacts', icon: Mail },
  { href: '/admin/blog', label: 'Articles de blog', icon: FileText },
  { href: '/admin/avis', label: 'Avis clients', icon: Star },
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

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-stone-900 z-30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-stone-800">
          <div className="w-8 h-8 rounded-full bg-nude-600 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-serif text-sm font-light">Soléana</p>
            <p className="text-stone-400 text-xs">Administration</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
                isActive(item)
                  ? 'bg-nude-600 text-white'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-stone-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-stone-400 hover:bg-stone-800 hover:text-white transition-colors duration-150"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-sm text-stone-400 hover:bg-stone-800 hover:text-white transition-colors duration-150"
          >
            ← Voir le site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-stone-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-stone-100"
          >
            <Menu size={20} />
          </button>
          <span className="font-serif text-stone-800">Administration</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
