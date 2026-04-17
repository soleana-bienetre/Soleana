import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { Tarif } from './supabase';

export function useCategoryTarifs(categoryId: string | string[]) {
  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = Array.isArray(categoryId) ? categoryId : [categoryId];
    supabase
      .from('tarifs')
      .select('*')
      .in('category_id', ids)
      .eq('visible', true)
      .order('category_order', { ascending: true })
      .order('item_order', { ascending: true })
      .then(({ data }) => {
        if (data) setTarifs(data as Tarif[]);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(categoryId)]);

  // Retourne le prix d'un tarif par correspondance partielle de nom
  function getPrice(search: string, fallback = '[PRIX À DÉFINIR]'): string {
    const needle = search.toLowerCase().trim();
    const match = tarifs.find((t) => {
      const haystack = t.name.toLowerCase();
      // Retire la durée "- XX min" pour la comparaison
      const base = haystack.split(' - ')[0].trim();
      return base.includes(needle) || needle.includes(base);
    });
    return match?.price ?? fallback;
  }

  // Filtre les tarifs par category_id
  function byCategory(catId: string): Tarif[] {
    return tarifs.filter((t) => t.category_id === catId);
  }

  return { tarifs, loading, getPrice, byCategory };
}
