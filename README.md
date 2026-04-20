# Personal portfolio site

The personal portfolio for Jennifer Culp — just hand-written HTML, CSS, and a
small amount of JavaScript. No bundler, no framework.

## Run locally

Any static file server works. The simplest option:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with Node installed:

```sh
npx --yes serve .
```

## Development checks

If you have Node.js installed you can run the linting and formatting checks:

```sh
npm install
npm run check   # runs prettier, stylelint, and htmlhint
npm run format  # auto-formats with prettier
```

Everything is pure static HTML/CSS/JS — there is no build step. The `npm`
tooling only exists to keep the source tidy.

## Deploy

The repo includes a GitHub Actions workflow
(`.github/workflows/pages.yml`) that publishes the contents of `main` to
GitHub Pages. To use it, enable Pages in the repo settings and choose
"GitHub Actions" as the source.

Any static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, …) also
works — just point it at the repo root.

## Project layout

```
assets/            fonts, icons, and the portrait illustration
index.html         the page markup
style.css          design tokens + all styling
script.js          intro animations + theme toggle
site.webmanifest   PWA manifest
robots.txt         crawler directives
sitemap.xml        sitemap for search engines
```
