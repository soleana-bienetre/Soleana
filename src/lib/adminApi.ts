import { adminLogout, getAdminToken } from './adminAuth';

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

export type AdminResource = 'contacts' | 'reviews' | 'blog_articles' | 'tarifs';

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

type AdminResponse<T> = {
  data?: T;
  count?: number;
  publicUrl?: string;
  error?: string;
};

export async function adminRequest<T>(payload: AdminRequestPayload): Promise<T> {
  const token = getAdminToken();

  if (!token) {
    throw new Error('Session administrateur expirée.');
  }

  const response = await fetch('/.netlify/functions/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => ({}))) as AdminResponse<T>;

  if (response.status === 401) {
    adminLogout();
  }

  if (!response.ok) {
    throw new Error(body.error || 'Erreur serveur.');
  }

  if (payload.op === 'count') {
    return (body.count ?? 0) as T;
  }

  if (payload.op === 'uploadBlogImage') {
    return (body.publicUrl ?? '') as T;
  }

  return body.data as T;
}
