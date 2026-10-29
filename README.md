# RUZICKAJAKUB — Evolved V6

Portfolio built with React, TypeScript and Vite. The latest source bundle is available here: [RUZICKAJAKUB Evolved V6 ZIP](sandbox:/mnt/data/ruzickajakub-evolved-v6.zip).

## Automatic GitHub Pages deployment

The workflow at `.github/workflows/pages.yml` is configured to run on every push to `main` and via **Actions → Build and deploy GitHub Pages → Run workflow**. It detects the Vite source tree, installs dependencies, runs tests, builds `dist/` and deploys it with GitHub Pages. If the source tree is missing, it skips deployment rather than failing.

## Current repository status

The repository has been initialized with the deployment workflow, but the full V6 application source has **not yet been pushed into the repository**. To finish the upload, extract the contents of the ZIP into the repository root, preserving `src/`, `public/` (if present), `index.html`, `package.json`, `tsconfig.json`, and `vite.config.ts`; then commit and push to `main`. The workflow will build and deploy automatically.

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

For the GitHub Pages project site, Vite uses `/nhnh/` as its base path in Actions.
