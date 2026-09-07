# Inner page generation prompt (Sandustry wiki)

Use this when creating or refreshing `content/en/*.json` guide pages.

## Output shape

JSON with: slug, title, description, updated (YYYY-MM-DD), sections[{heading, body}], faq[{q,a}], sources[], related[]

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
