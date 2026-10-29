# Aleo Local Explorer — frontend

Static React + Vite + Tailwind SPA, deployed to GitHub Pages. See the
[repo root README](../README.md) for the full picture.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs to `dist/`. `vite.config.ts` sets `base: '/aleo-local-explorer/'`
to match the GitHub Pages project-page subpath — change it if you deploy
this under a different path.
