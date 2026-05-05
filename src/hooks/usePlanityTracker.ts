import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPlanityClick } from '../lib/trackClick';

export function usePlanityTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (!href.includes('planity.com')) return;
      const label = anchor.textContent?.trim().slice(0, 80) ?? '';
      trackPlanityClick(pathname, label);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);
}
