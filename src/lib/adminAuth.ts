const AUTH_KEY = 'soleana_admin_token';

type AdminAuthResponse = {
  token?: string;
};

export async function adminLogin(password: string): Promise<boolean> {
  const response = await fetch('/.netlify/functions/admin-auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const payload = (await response.json().catch(() => ({}))) as AdminAuthResponse;

  if (!response.ok || !payload.token) {
    sessionStorage.removeItem(AUTH_KEY);
    return false;
  }

  sessionStorage.setItem(AUTH_KEY, payload.token);
  return true;
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return Boolean(sessionStorage.getItem(AUTH_KEY));
}

export function getAdminToken(): string | null {
  return sessionStorage.getItem(AUTH_KEY);
}
