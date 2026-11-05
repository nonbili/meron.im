# Writing a post

Create `content/blog/<slug>/en.mdx`. The directory name becomes `/blog/<slug>`.
Add `<locale>.mdx` alongside it for translations (for example, `ja.mdx` or
`zh_Hans.mdx`). Missing translations use the English post. Locale names are in
`lib/i18n.ts`. Each file contains complete prose rather than translation keys.

Posts are discovered automatically and sorted by publication date. No registry,
React component, or route file is needed for a new article.

```mdx
---
version: "0.5.0"
title: "Meron 0.5.0: A calmer inbox"
publishedAt: "2026-12-01"
readingTime: "3 min read"
summary: "A short description used in the blog index and page metadata."
highlights:
  - "The first improvement"
  - "The second improvement"
image: "/screenshots/blog/example.png"
releaseBadge: "Release · v0.5.0"
---

An introductory paragraph with **emphasis** and [links](/changelog).

<PostSection>

<Badge icon="Sparkles">What's new</Badge>

## A section heading

Write normal Markdown here.

- A useful detail.
- Another useful detail.

<BlogImage
  src="/screenshots/blog/example.png"
  alt="Describe what the screenshot shows"
  caption="An optional caption."
  width={1280}
  height={820}
/>

</PostSection>
```

`platformsSubtitle` is optional frontmatter for a subtitle beneath the summary.
`slug` is optional; if supplied, it must match the directory name. Translations
include their own frontmatter so titles, summaries, and highlights are localized.

Available components are defined in `components/BlogPost.tsx`:

- `Strong`, `Em`: emphasis for text where adjacent CJK punctuation prevents Markdown emphasis from parsing.
- `PostSection`: groups a heading and its paragraphs with consistent spacing.
- `Badge`: section label with an icon (for example, `Sparkles`, `Search`, or `Users`).
- `BlogImage`: screenshot with a caption and the existing image lightbox support.
- `PlatformNote`: a small inset paragraph for platform availability.
- `CardGrid`, `Card`, `CardTitle`, `CodeList`: optional feature cards.
- `KeyboardShortcuts`: shortcut cards with `title`, `items` (`label` and `keys`), `or`, and `note` props.
- `ReleaseCTA`: download links with localized `heading`, `text`, `download`, `changelog`, and `github` props.

Only repository-authored MDX is loaded. It is compiled on the server during the
static build, and can include JSX expressions. Run `bun run build` to validate
all content and export English and localized pages.
