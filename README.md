# RUZICKAJAKUB — Evolved V6

Personal portfolio of Jakub Růžička, built with React, TypeScript and Vite.

## Automatic GitHub Pages deployment

Every push to `main` runs the GitHub Actions workflow: restore the project source archive, install dependencies, run tests, build the site, and deploy the `dist/` output to GitHub Pages. A manual run is also available under **Actions → Build and deploy GitHub Pages → Run workflow**.

The source bundle is `.source-parts/` (a compressed tar archive split into text-safe parts to transfer it reliably). The workflow reconstructs and extracts it before running npm.

## Local development

After extracting the project source archive:

```bash
npm install
npm run dev
```

## Production build

```bash
npm test
npm run build
npm run preview
```

For a project site, Vite automatically uses `/nhnh/` as its base path in GitHub Actions.
