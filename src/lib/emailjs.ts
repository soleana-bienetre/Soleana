function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Variable d'environnement manquante: ${name}`);
  }

  return value;
}

export const EMAILJS_CONFIG = {
  publicKey: getRequiredEnv('VITE_EMAILJS_PUBLIC_KEY'),
  serviceId: getRequiredEnv('VITE_EMAILJS_SERVICE_ID'),
  templateClientId: getRequiredEnv('VITE_EMAILJS_TEMPLATE_CLIENT_ID'),
  templateAdminId: getRequiredEnv('VITE_EMAILJS_TEMPLATE_ADMIN_ID'),
};

export const ADMIN_EMAIL = getRequiredEnv('VITE_ADMIN_EMAIL');
