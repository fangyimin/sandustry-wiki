# Inner page generation prompt (Sandustry wiki)

Use this when creating or refreshing `content/en/*.json` guide pages.

## Output format (strict JSON)

```json
{
  "slug": "kebab-case-url",
  "title": "SEO title 40-60 chars with keyword",
  "description": "140-160 chars meta description",
  "keyword": "primary search phrase",
  "h1": "Single H1",
  "sections": [
    { "h2": "Section heading", "paragraphs": ["...", "..."] }
  ],
  "note": "optional caveat",
  "sources": ["Steam / official / named article"]
}
```

Keys `sections[].h2` and `sections[].paragraphs` (array of strings) are REQUIRED — do not use
`heading`/`body` or any other key names.

## Rules

1. Only use facts from Steam, official Hooded Horse Sandustry wiki, official Discord/YouTube/Reddit, or named coverage.
2. Never invent recipes, ratios, unlock tables, codes, or multiplayer modes.
3. Mark Early Access uncertainty explicitly when patch-sensitive.
4. Prefer practical first-hour advice over copying competitor wiki pages.
5. Link related internal slugs that exist on this site.
6. Keep English natural for SEO landing pages (one clear intent per URL).

## Preferred sources

- https://store.steampowered.com/app/2764460/Sandustry/
- https://store.steampowered.com/app/3490390/Sandustry_Demo/
- https://wiki.hoodedhorse.com/Sandustry/Sandustry_Official_Wiki
- https://discord.gg/HJNk5eMnmt
- https://www.reddit.com/r/SandustryGame
- https://www.youtube.com/@sandustry
