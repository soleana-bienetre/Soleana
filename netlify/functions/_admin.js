import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function json(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

export function ok(body) {
  return json(200, body);
}

export function badRequest(message) {
  return json(400, { error: message });
}

export function unauthorized(message = 'Non autorisé.') {
  return json(401, { error: message });
}

export function methodNotAllowed() {
  return json(405, { error: 'Méthode non autorisée.' });
}

export function serverError(error) {
  console.error(error);
  return json(500, { error: 'Erreur serveur.' });
}

export function parseBody(body) {
  if (!body) {
    return {};
  }

  return JSON.parse(body);
}

export function getEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function createSupabaseAdminClient() {
  return createClient(getEnv('SUPABASE_URL'), getEnv('SUPABASE_SERVICE_ROLE_KEY'));
}

export function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function encode(data) {
  return Buffer.from(data).toString('base64url');
}

function decode(data) {
  return Buffer.from(data, 'base64url').toString('utf8');
}

export function createAdminToken() {
  const secret = getEnv('ADMIN_SESSION_SECRET');
  const payload = encode(
    JSON.stringify({
      role: 'admin',
      exp: Date.now() + 1000 * 60 * 60 * 12,
    })
  );
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token) {
  const secret = getEnv('ADMIN_SESSION_SECRET');
  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    return false;
  }

  const expected = createHmac('sha256', secret).update(payload).digest('base64url');

  if (!safeCompare(signature, expected)) {
    return false;
  }

  const decoded = JSON.parse(decode(payload));
  return decoded.role === 'admin' && typeof decoded.exp === 'number' && decoded.exp > Date.now();
}

export function getBearerToken(headers = {}) {
  const authorization = headers.authorization || headers.Authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice('Bearer '.length);
}
