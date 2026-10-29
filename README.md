# RUZICKAJAKUB — Evolved V6

React, TypeScript and Vite portfolio with the giant-to-navbar title morph, viewport-reactive 3D typography, and the refined horizontal project gallery.

## Automatic GitHub Pages deployment

The workflow at `.github/workflows/pages.yml` is configured to run on every push to `main` and via **Actions → Build and deploy GitHub Pages → Run workflow**. It detects the Vite source tree, installs dependencies, runs tests, builds `dist/` and deploys it with GitHub Pages. If the source tree is missing, it skips deployment rather than failing.

## Current status

The repository has been initialized and the deploy workflow is committed, but **the full V6 source tree has not been uploaded**. The build will automatically run after the application files are pushed to the repository root (including `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json` and `src/`).

## Local development

```bash
npm install
npm run dev
```

## Verify production

```bash
npm test
npm run build
npm run preview
```

For the GitHub Pages project site, Vite uses `/nhnh/` as its base path when the build runs in GitHub Actions.
