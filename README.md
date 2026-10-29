# RUZICKAJAKUB — Evolved V6

React, TypeScript and Vite portfolio with the giant-to-navbar title morph, viewport-reactive 3D typography, and the refined horizontal project gallery.

## GitHub Pages automation

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. Once the source bundle is present, every push to `main` automatically installs dependencies, runs tests, builds the site and deploys `dist/` to GitHub Pages. The workflow can also be started manually from **Actions**.

**Source transfer still needs to be completed:** this repository currently has the deploy workflow, but the full project source bundle has not been added to the repository yet. The workflow expects base64-encoded archive chunks at `.source-parts/part*.b64`; until those files exist, it safely skips build/deploy instead of failing.

## Local development

From the extracted project source:

```bash
npm install
npm run dev
```

## Verify before deploy

```bash
npm test
npm run build
npm run preview
```

For GitHub Pages project hosting, Vite uses `/nhnh/` as its base path when the build runs in GitHub Actions.
