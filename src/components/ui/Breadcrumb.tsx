import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-stone-400 flex-wrap">
      <Link to="/" className="hover:text-nude-600 transition-colors">Accueil</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-stone-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-nude-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-stone-600 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
