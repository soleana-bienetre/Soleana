import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';

const services = [
  { label: 'Épilation laser', href: '/epilation-laser' },
  { label: 'Soins du visage', href: '/soins-visage' },
  { label: 'Kobido', href: '/kobido' },
  { label: 'Massages bien-être', href: '/massages' },
  { label: 'Drainage & Maderothérapie', href: '/drainage-lymphatique' },
  { label: 'Socio-esthétique', href: '/socio-esthetique' },
];

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Soins', href: '#', children: services },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const noHeroPages = ['/epilation-laser', '/soins-visage', '/tarifs', '/blog', '/contact'];
  const isHero = !isScrolled && !noHeroPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Réinitialise la position de scroll à chaque changement de page
  useEffect(() => {
    setIsScrolled(window.scrollY > 20);
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-100'
          : 'bg-white/0'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex flex-col group">
            <span className={`font-serif text-xl md:text-2xl font-light tracking-wide transition-colors duration-300 ${isHero ? 'text-white' : 'text-stone-800'}`}>
              Soléana
            </span>
            <span className={`font-sans text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${isHero ? 'text-white/70' : 'text-nude-600'}`}>
              Bien-Être
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.children ? (
                  <button
                    className={`flex items-center gap-1 font-sans text-sm font-medium transition-colors duration-200 py-2 ${
                      isHero ? 'text-white hover:text-white/75' : isScrolled ? 'text-stone-700 hover:text-nude-600' : 'text-stone-800 hover:text-nude-600'
                    }`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`font-sans text-sm font-medium transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-nude-500 after:transition-all after:duration-300 hover:after:w-full ${
                      location.pathname === link.href
                        ? isHero ? 'text-white after:w-full after:bg-white' : 'text-nude-600 after:w-full'
                        : isHero
                        ? 'text-white hover:text-white/75 after:bg-white'
                        : isScrolled
                        ? 'text-stone-700 hover:text-nude-600'
                        : 'text-stone-800 hover:text-nude-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {link.children && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-sand-100 p-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-4 py-2.5 rounded-xl text-sm font-sans transition-colors duration-200 hover:bg-sand-50 hover:text-nude-700 ${
                            location.pathname === child.href ? 'text-nude-600 bg-sand-50' : 'text-stone-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0762169814" className="btn-phone text-sm py-2.5">
              <Phone size={15} />
              07 62 16 98 14
            </a>
            <Link to="/contact" className="btn-primary text-sm py-2.5">
              <Calendar size={15} />
              Rendez-vous
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${isHero ? 'text-white hover:text-white/75' : 'text-stone-700 hover:text-nude-600 hover:bg-sand-50'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-sand-100 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container-wide py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-sand-50 hover:text-nude-600 transition-colors"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-sand-200 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block py-2 text-sm text-stone-600 hover:text-nude-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'text-nude-600 bg-sand-50'
                        : 'text-stone-700 hover:bg-sand-50 hover:text-nude-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-3 border-t border-sand-100 mt-4">
              <a href="tel:0762169814" className="btn-phone w-full justify-center">
                <Phone size={15} />
                07 62 16 98 14
              </a>
              <Link to="/contact" className="btn-primary w-full justify-center">
                <Calendar size={15} />
                Prendre rendez-vous
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
