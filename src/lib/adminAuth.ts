// Authentification admin simple par mot de passe stocké localement
// Pour un usage mono-utilisateur (Laetitia)

const ADMIN_PASSWORD = 'soleana2026!';
const AUTH_KEY = 'soleana_admin_auth';

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}
