import {
  badRequest,
  createAdminToken,
  getEnv,
  methodNotAllowed,
  ok,
  parseBody,
  safeCompare,
  serverError,
} from './_admin.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return ok({});
  }

  if (event.httpMethod !== 'POST') {
    return methodNotAllowed();
  }

  try {
    const { password } = parseBody(event.body);

    if (typeof password !== 'string' || password.length === 0) {
      return badRequest('Mot de passe manquant.');
    }

    if (!safeCompare(password, getEnv('ADMIN_PASSWORD'))) {
      return badRequest('Mot de passe incorrect.');
    }

    return ok({ token: createAdminToken() });
  } catch (error) {
    return serverError(error);
  }
}
