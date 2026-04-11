import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { IMAGE_REGISTRY } from '../lib/siteImages';

type ImageMap = Record<string, string>; // key → url

const SiteImagesContext = createContext<{
  getUrl: (key: string) => string;
  reload: () => void;
}>({
  getUrl: (key) => IMAGE_REGISTRY.find((s) => s.key === key)?.defaultUrl ?? '',
  reload: () => {},
});

export function SiteImagesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ImageMap>({});

  async function load() {
    const { data } = await supabase.from('site_images').select('key, url');
    if (data) {
      const map: ImageMap = {};
      for (const row of data as { key: string; url: string }[]) {
        map[row.key] = row.url;
      }
      setOverrides(map);
    }
  }

  useEffect(() => { load(); }, []);

  function getUrl(key: string): string {
    if (overrides[key]) return overrides[key];
    return IMAGE_REGISTRY.find((s) => s.key === key)?.defaultUrl ?? '';
  }

  return (
    <SiteImagesContext.Provider value={{ getUrl, reload: load }}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImages() {
  return useContext(SiteImagesContext);
}
