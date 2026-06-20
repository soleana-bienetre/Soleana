import { supabaseAdmin } from './supabase';

type FilterValue = string | number | boolean | null;

export type AdminFilter = {
  column: string;
  operator?: 'eq';
  value: FilterValue;
};

export type AdminOrder = {
  column: string;
  ascending?: boolean;
};

export type AdminResource = 'contacts' | 'reviews' | 'blog_articles' | 'tarifs' | 'gift_cards' | 'gift_card_requests';

type AdminRequestPayload =
  | {
      op: 'select';
      resource: AdminResource;
      columns?: string;
      filters?: AdminFilter[];
      order?: AdminOrder[];
      single?: boolean;
    }
  | {
      op: 'count';
      resource: AdminResource;
      filters?: AdminFilter[];
    }
  | {
      op: 'insert';
      resource: AdminResource;
      data: Record<string, unknown>;
      columns?: string;
      single?: boolean;
    }
  | {
      op: 'update';
      resource: AdminResource;
      data: Record<string, unknown>;
      filters: AdminFilter[];
      columns?: string;
      single?: boolean;
    }
  | {
      op: 'delete';
      resource: AdminResource;
      filters: AdminFilter[];
    }
  | {
      op: 'uploadBlogImage';
      fileName: string;
      contentType: string;
      base64Data: string;
    };

function applyFilters(query: ReturnType<typeof supabaseAdmin.from>, filters?: AdminFilter[]) {
  let q = query;
  for (const f of filters ?? []) {
    q = q.eq(f.column, f.value) as typeof q;
  }
  return q;
}

export async function adminRequest<T>(payload: AdminRequestPayload): Promise<T> {
  // ── Upload image ──────────────────────────────────────────────────────────
  if (payload.op === 'uploadBlogImage') {
    const { fileName, base64Data } = payload;
    // Convert base64 data URL to Uint8Array
    const base64 = base64Data.split(',')[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const { error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(fileName, bytes, { contentType: 'image/webp', upsert: true });

    if (error) throw new Error(error.message);

    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return (urlData.publicUrl ?? '') as T;
  }

  // ── Count ─────────────────────────────────────────────────────────────────
  if (payload.op === 'count') {
    let q = supabaseAdmin.from(payload.resource).select('*', { count: 'exact', head: true });
    q = applyFilters(q, payload.filters) as typeof q;
    const { count, error } = await q;
    if (error) throw new Error(error.message);
    return (count ?? 0) as T;
  }

  // ── Select ────────────────────────────────────────────────────────────────
  if (payload.op === 'select') {
    let q = supabaseAdmin.from(payload.resource).select(payload.columns ?? '*');
    q = applyFilters(q, payload.filters) as typeof q;
    for (const o of payload.order ?? []) {
      q = q.order(o.column, { ascending: o.ascending ?? true }) as typeof q;
    }
    if (payload.single) {
      const { data, error } = await q.single();
      if (error) throw new Error(error.message);
      return data as T;
    }
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return data as T;
  }

  // ── Insert ────────────────────────────────────────────────────────────────
  if (payload.op === 'insert') {
    let q = supabaseAdmin.from(payload.resource).insert(payload.data).select(payload.columns ?? '*');
    if (payload.single) {
      const { data, error } = await q.single();
      if (error) throw new Error(error.message);
      return data as T;
    }
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return data as T;
  }

  // ── Update ────────────────────────────────────────────────────────────────
  if (payload.op === 'update') {
    let q = supabaseAdmin.from(payload.resource).update(payload.data);
    q = applyFilters(q, payload.filters) as typeof q;
    const { error } = await q;
    if (error) throw new Error(error.message);
    return undefined as T;
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  if (payload.op === 'delete') {
    let q = supabaseAdmin.from(payload.resource).delete();
    q = applyFilters(q, payload.filters) as typeof q;
    const { error } = await q;
    if (error) throw new Error(error.message);
    return undefined as T;
  }

  throw new Error('Opération inconnue');
}
