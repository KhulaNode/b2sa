# Back2SchoolAfrica Programme website

Static Astro and TypeScript website for Back2SchoolAfrica Programme, the nonprofit arm of Tutor Mentor Connect. The site is built for local review and a future Dokploy deployment; no domain or contact channel is assumed.

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

Before launch, confirm the public email or phone, donation channel if needed, NPO registration number displayed in the supplied logo, the requested registration wording “Registered as Back to School Afrai Programme”, final brand approval and any claims or community stories. The new organisation copy and nonprofit relationship were supplied by the client; confirm the final public wording. Replace the Commons photo with consented organisation imagery if preferred.
