import type { Context } from '@netlify/edge-functions';

const BOT_UA = [
  'facebookexternalhit', 'Facebot',
  'Twitterbot', 'LinkedInBot',
  'WhatsApp', 'Slackbot', 'Slack-ImgProxy',
  'TelegramBot', 'Discordbot',
  'Pinterest', 'Googlebot', 'bingbot',
];

function isBot(ua: string): boolean {
  return BOT_UA.some((p) => ua.includes(p));
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(request: Request, context: Context) {
  const ua = request.headers.get('user-agent') ?? '';
  if (!isBot(ua)) return context.next();

  const url = new URL(request.url);
  const slug = url.pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
  if (!slug) return context.next();

  const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL') ?? '';
  const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY') ?? '';
  if (!supabaseUrl || !supabaseKey) return context.next();

  try {
    const apiUrl =
      `${supabaseUrl}/rest/v1/blog_articles` +
      `?slug=eq.${encodeURIComponent(slug)}` +
      `&published=eq.true` +
      `&select=title,excerpt,og_image_url,og_image_alt,meta_title,meta_description,slug` +
      `&limit=1`;

    const res = await fetch(apiUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) return context.next();

    const [article] = await res.json();
    if (!article) return context.next();

    const title = esc((article.meta_title || article.title) + ' – Soléana Bien-Être');
    const description = esc(article.meta_description || article.excerpt || '');
    const image = esc(article.og_image_url || 'https://www.soleana-bienetre.com/og-share.jpg');
    const pageUrl = esc(`https://www.soleana-bienetre.com/blog/${article.slug}`);

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Soléana Bien-Être">
<meta property="og:url" content="${pageUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<link rel="canonical" href="${pageUrl}">
</head>
<body><p><a href="${pageUrl}">${title}</a></p></body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600',
      },
    });
  } catch {
    return context.next();
  }
}
