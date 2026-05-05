import { supabase } from './supabase';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Accueil',
  '/a-propos': 'À propos',
  '/epilation-laser': 'Épilation laser',
  '/soins-visage': 'Soins du visage',
  '/kobido': 'Kobido',
  '/massages': 'Massages',
  '/drainage-lymphatique': 'Drainage & Maderothérapie',
  '/tarifs': 'Tarifs',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/blog': 'Blog',
};

export function getPageLabel(pathname: string): string {
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname];
  if (pathname.startsWith('/blog/')) return 'Article blog';
  return pathname;
}

export async function trackPlanityClick(pathname: string, buttonLabel: string) {
  await supabase.from('cta_clicks').insert({
    page: pathname,
    button_label: buttonLabel,
  });
}
