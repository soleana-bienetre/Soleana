# Soleana

Site Vite + React deployable sur Netlify.

## Variables d'environnement

Le projet utilise un fichier local `.env` et un modèle versionné `.env.example`.

Variables front:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_CLIENT_ID`
- `VITE_EMAILJS_TEMPLATE_ADMIN_ID`
- `VITE_ADMIN_EMAIL`

Variables serveur Netlify Functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Déploiement Netlify

Le dépôt contient déjà la configuration Netlify dans [`netlify.toml`](./netlify.toml).

Réglages attendus:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

Avant le déploiement, ajoutez toutes les variables de `.env.example` dans Netlify:

1. `Site configuration`
2. `Environment variables`
3. Copier les clés de `.env.example`

## Admin sécurisé

L'administration n'utilise plus la `service_role` directement dans le navigateur.
Les opérations sensibles passent maintenant par des Netlify Functions:

- `/.netlify/functions/admin-auth`
- `/.netlify/functions/admin`
