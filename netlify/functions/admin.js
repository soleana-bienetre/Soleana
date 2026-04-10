import {
  badRequest,
  createSupabaseAdminClient,
  getBearerToken,
  methodNotAllowed,
  ok,
  parseBody,
  serverError,
  unauthorized,
  verifyAdminToken,
} from './_admin.js';

const ALLOWED_RESOURCES = new Set(['contacts', 'reviews', 'blog_articles', 'tarifs']);
const ALLOWED_OPERATIONS = new Set(['select', 'count', 'insert', 'update', 'delete', 'uploadBlogImage']);

function applyFilters(query, filters = []) {
  return filters.reduce((current, filter) => {
    if (!filter?.column) {
      return current;
    }

    return current.eq(filter.column, filter.value);
  }, query);
}

function applyOrder(query, order = []) {
  return order.reduce(
    (current, item) => current.order(item.column, { ascending: item.ascending ?? true }),
    query
  );
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
}

function extractBase64(data) {
  const marker = 'base64,';
  const index = data.indexOf(marker);
  return index >= 0 ? data.slice(index + marker.length) : data;
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return ok({});
  }

  if (event.httpMethod !== 'POST') {
    return methodNotAllowed();
  }

  try {
    const token = getBearerToken(event.headers);

    if (!token || !verifyAdminToken(token)) {
      return unauthorized();
    }

    const body = parseBody(event.body);

    if (!ALLOWED_OPERATIONS.has(body.op)) {
      return badRequest('Opération invalide.');
    }

    const supabase = createSupabaseAdminClient();

    if (body.op === 'uploadBlogImage') {
      if (!body.fileName || !body.base64Data || !body.contentType) {
        return badRequest('Image invalide.');
      }

      const safeName = sanitizeFileName(body.fileName);
      const bytes = Buffer.from(extractBase64(body.base64Data), 'base64');

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(safeName, bytes, { contentType: body.contentType, upsert: true });

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(safeName);
      return ok({ publicUrl: data.publicUrl });
    }

    if (!ALLOWED_RESOURCES.has(body.resource)) {
      return badRequest('Ressource invalide.');
    }

    if (body.op === 'select') {
      let query = supabase.from(body.resource).select(body.columns || '*');
      query = applyFilters(query, body.filters);
      query = applyOrder(query, body.order);

      const result = body.single ? await query.maybeSingle() : await query;

      if (result.error) {
        throw result.error;
      }

      return ok({ data: result.data });
    }

    if (body.op === 'count') {
      let query = supabase.from(body.resource).select('*', { count: 'exact', head: true });
      query = applyFilters(query, body.filters);

      const result = await query;

      if (result.error) {
        throw result.error;
      }

      return ok({ count: result.count || 0 });
    }

    if (body.op === 'insert') {
      let query = supabase.from(body.resource).insert(body.data).select(body.columns || '*');
      const result = body.single ? await query.single() : await query;

      if (result.error) {
        throw result.error;
      }

      return ok({ data: result.data });
    }

    if (body.op === 'update') {
      let query = supabase.from(body.resource).update(body.data);
      query = applyFilters(query, body.filters);
      query = query.select(body.columns || '*');

      const result = body.single ? await query.single() : await query;

      if (result.error) {
        throw result.error;
      }

      return ok({ data: result.data });
    }

    if (body.op === 'delete') {
      let query = supabase.from(body.resource).delete();
      query = applyFilters(query, body.filters);

      const result = await query;

      if (result.error) {
        throw result.error;
      }

      return ok({ data: true });
    }

    return badRequest('Opération non gérée.');
  } catch (error) {
    return serverError(error);
  }
}
