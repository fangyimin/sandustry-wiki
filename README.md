# Sandustry Wiki

Fan-made English guide site for **Sandustry** (Lantto Games / Hooded Horse), deployed for the domain **playsandustry.online**.

- Template: Next.js App Router + JSON content (`config/site.json`, `content/en/*.json`)
- Hosting target: **Vercel** (not GitHub Pages)
- Live domain: https://playsandustry.online

## Local

```bash
npm install
npm run dev
```

Set optional env:

```bash
NEXT_PUBLIC_SITE_URL=https://playsandustry.online
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add env `NEXT_PUBLIC_SITE_URL=https://playsandustry.online`.
4. Attach custom domain `playsandustry.online` and follow Vercel DNS instructions.
