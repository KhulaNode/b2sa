import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const rawUrl = process.env.SITE_URL?.trim();
let siteUrl;
if (rawUrl) {
  try {
    siteUrl = new URL(rawUrl);
    if (siteUrl.protocol !== 'https:' || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) throw new Error();
  } catch {
    throw new Error('SITE_URL must be a public HTTPS origin, for example https://example.org');
  }
}

function pagePaths(dir = dist, prefix = '/') {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return pagePaths(join(dir, entry.name), `${prefix}${entry.name}/`);
    return entry.name === 'index.html' ? [prefix] : [];
  });
}

if (siteUrl) {
  const paths = pagePaths().sort();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${new URL(path, siteUrl).toString()}</loc></url>`).join('\n')}\n</urlset>\n`;
  writeFileSync(join(dist, 'sitemap.xml'), xml);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteUrl)}\n`);
  console.log(`Generated sitemap for ${paths.length} pages.`);
} else {
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  console.log('SITE_URL unset: robots.txt blocks indexing and sitemap is omitted.');
}
