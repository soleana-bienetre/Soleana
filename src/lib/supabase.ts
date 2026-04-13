import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Variable d'environnement manquante: ${name}`);
  }

  return value;
}

const supabaseUrl = getRequiredEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getRequiredEnv('VITE_SUPABASE_ANON_KEY');
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (bypasse RLS) — utilise la service role key si disponible, sinon anon key
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey ?? supabaseAnonKey
);

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  initials: string;
  published: boolean;
  created_at: string;
};

export type Tarif = {
  id: string;
  category_id: string;
  category_label: string;
  category_order: number;
  name: string;
  price: string;
  note?: string;
  item_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  og_image_alt?: string;
  category?: string;
  tags?: string[];
  read_time: number;
  published: boolean;
  featured?: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
};
