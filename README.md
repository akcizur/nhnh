# Jakub Růžička — Cinematic Portfolio · Evolved V6

React, TypeScript and Vite portfolio site.

## Local development

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## GitHub Pages

The site deploys automatically when changes are pushed to the `main` branch. In the repository settings, enable **Pages → Build and deployment → GitHub Actions**. The workflow builds the site and publishes the `dist` directory.

For a project site (`https://<owner>.github.io/<repository>/`), Vite derives the base path from the GitHub Actions repository name. For a user or organization site (`https://<owner>.github.io/`), name the repository `<owner>.github.io`; the build uses the root path.

## Hero title → navbar brand

The `RUZICKAJAKUB` hero headline starts at display scale and follows scroll into the compact navbar brand. The transition runs in both directions, recalibrates after viewport/font changes, and responds to changes in the browser's reduced-motion preference. Its progress/easing maths live in a small pure utility with unit tests. The semantic heading remains visible if JavaScript fails, and the light-theme animation uses the same theme-aware 3D lettering as the rest of the hero.

### Evolved interaction · V3 adaptive morph

- One visual title moves from the hero into the navbar; the semantic `<h1>` remains in document flow for accessibility.
- Progress uses clamped smoothstep easing and a late cross-fade to prevent duplicate branding.
- `ResizeObserver`, window resize, `visualViewport`, and web-font readiness keep the alignment current.
- `prefers-reduced-motion` is checked on startup and listened to while the page is open.
- Tiny screens use a more compact title scale, and no-JavaScript fallback keeps the main title readable.
- New tests cover transition endpoints, monotonic progress, and invalid viewport values.
- V3 fixes the coordinate-space bug: the moving title remains attached to the hero heading before travel begins, then resolves into the viewport-space navbar target.
- The moving title uses `translate3d()` for its position rather than changing `left`/`top` every frame.
- The extruded text shadow scales with the interpolated font size, preventing an oversized 3D shadow at navbar size.
- Additional tests cover scroll-restored pages, end-point alignment, invalid scroll data, and clamped interpolation.
- Czech page language and search/social metadata now match the actual site content.


## V3 verification

The six focused title-morph tests pass with Node.js 22 native TypeScript stripping. A full Vite production build was not run in this workspace because project dependencies are not installed; run `npm install` followed by `npm run build` locally.


## V4 · Viewport-reactive 3D typography

- The 3D extrusion of the hero title, travelling navbar title, navbar brand, section headings and display headings responds to each element's **current vertical position inside the visible viewport**.
- Near the top, the bevel leans slightly left and the extrusion is shallower; near the bottom, it leans right and becomes deeper. The midpoint provides a neutral bevel. Both light and dark themes keep distinct extrusion palettes.
- The effect is updated on animation frames during scrolling and viewport changes, recalculated after display-font loading, and refreshed when UI content is mounted.
- `prefers-reduced-motion` disables the scroll-linked shadow updates and retains the static theme-aware shadow.
- Pure helper logic is covered by four additional tests in `src/utils/viewportDepth.test.ts`; all 10 title-morph and viewport-depth tests passed in this workspace.
- A full Vite production build remains unverified here because dependencies are not installed; run `npm install`, `npm test`, and `npm run build` locally.

## V5 UI refinement
- The portfolio heading `Projekty` is kept as a single unbroken word with `white-space: nowrap`.
- The project gallery reserves a top safe area equal to `--nav-height`, so the gallery begins below the fixed navbar on desktop and mobile.
- Project panels scale to the remaining gallery viewport height automatically.


## V6 · Gallery polish

- Added a restrained glass status chip below the fixed navbar with a scroll-linked progress bar for the full horizontal project gallery.
- The gallery progress is updated directly by GSAP ScrollTrigger, avoiding React state updates on every animation frame.
- Project titles in the gallery now share the viewport-reactive 3D shadow used by the main display headings; the extrusion changes with each title's vertical position in the visible viewport.
- Gallery images decode asynchronously; the lead image is eager/high-priority and the remaining collage images are lazy-loaded.
- Tightened the gallery chrome for narrow phones and short landscape screens while keeping the top safe area tied to `--nav-height`.
- The existing reduced-motion layout remains a normal vertical stack rather than a pinned horizontal scroll experience.
