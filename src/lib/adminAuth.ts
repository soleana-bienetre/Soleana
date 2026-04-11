const AUTH_KEY = 'soleana_admin_token';
const ADMIN_PASSWORD = 'soleana2026!';

export async function adminLogin(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD) return false;
  sessionStorage.setItem(AUTH_KEY, 'authenticated');
  return true;
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
}

export function getAdminToken(): string | null {
  return sessionStorage.getItem(AUTH_KEY);
}
