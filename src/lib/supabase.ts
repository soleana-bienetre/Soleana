import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ssenglsjrkjmambtxckl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZW5nbHNqcmtqbWFtYnR4Y2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Mzc2OTQsImV4cCI6MjA5MTMxMzY5NH0.TmdhyIw21vdAha0Uh1TCY3mm6tkxijnI-Tz3vDsTWUE';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZW5nbHNqcmtqbWFtYnR4Y2tsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTczNzY5NCwiZXhwIjoyMDkxMzEzNjk0fQ.bUTsTejUsaNCH8YR5Dw-gyuHrgq2P_jfoykJUoGiYrg';

// Client public (lecture des données publiées)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (bypasse RLS via service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

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
  published_at?: string;
  created_at: string;
  updated_at: string;
};
