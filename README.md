# Back 2 School Africa Programme website

Static Astro and TypeScript website for Back 2 School Africa Programme, the nonprofit arm of Tutor Mentor Connect. The site is built for local review and a future Dokploy deployment; no domain or contact channel is assumed.

## Local development

Requires Node 22+ and npm.

```bash
npm ci
npm run dev
npm run lint
npm run check
npm run build
```

The local build omits the sitemap and writes a `robots.txt` that blocks indexing. For a launch build, set the **confirmed** public HTTPS origin: `SITE_URL=https://your-confirmed-domain.example npm run build`. This generates canonical and Open Graph URLs, `sitemap.xml`, and a production `robots.txt`. Astro statically renders every page.

## Content and launch settings

- Programme copy: `src/data/programmes.ts` (six client-supplied programme areas)
- Education opportunities: `src/pages/education-opportunities.astro`. The page contains guidance but no live scholarship, bursary or training listings. Verify each provider, eligibility criteria, closing date and official application link before publishing a listing.
- Impact reporting: `src/pages/our-impact.astro`. Publish figures and stories only after verification and appropriate permission.
- Unconfirmed public contact, donation and social URLs: `src/config/site.ts`
- Page copy: `src/pages/`
- Mockup-aligned homepage styling: `src/styles/mockup-home.css`
- Image attribution: `public/images/ATTRIBUTION.md`

Keep unknown config values empty. The site hides unfinished links and does not collect enquiries. The contact page gives a privacy-conscious path and only renders a `mailto:` or phone link after a public channel has been confirmed. There is no registration, booking, payment or digital-campus integration.

Before launch, confirm the public email or phone, donation channel if needed, NPO registration number displayed in the supplied logo, final brand approval and any claims or community stories. The new organisation copy and nonprofit relationship were supplied by the client; confirm the final public wording. Replace the Commons photo with consented organisation imagery if preferred.

## Dokploy

1. Add this repository to Dokploy as a **Docker Compose** application with `docker-compose.yml` at the root.
2. Set `SITE_URL` in Dokploy to the confirmed public `https://` origin. It is a build argument used for SEO; it is not a secret. Rebuild when it changes.
3. Route the public domain to service `website` on container port **8080**. Let Dokploy manage HTTPS and the reverse proxy. Do not publish a host port or add a proxy container.
4. Build/deploy, then check `/healthz`, the Education opportunities page, `robots.txt` and `sitemap.xml` on the domain. Dokploy should report the container healthy.

No runtime environment variables or credentials are required for this static site. Do not add unconfirmed contact details to Dokploy variables; update the config and rebuild after approval. The Nginx image is unprivileged and has security headers, gzip and asset caching.

For a local Docker smoke test, run `docker build -t back2school-africa .` and `docker run --rm -p 8080:8080 back2school-africa`, then visit `http://127.0.0.1:8080/healthz`.
