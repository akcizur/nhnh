/**
 * Build a theme-aware embossed text-shadow whose extrusion follows an element's
 * vertical position inside the current viewport.
 *
 * `viewportProgress` is normalized: 0 = top edge, 0.5 = viewport center,
 * 1 = bottom edge. The extrusion becomes gradually deeper toward the bottom
 * and its horizontal bevel changes direction across the viewport.
 */
export type ViewportDepthTheme = 'dark' | 'light';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const lerp = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

const DARK_EXTRUSION = [
  '#4a4a4a', '#454545', '#404040', '#3b3b3b', '#363636', '#313131',
  '#2c2c2c', '#282828', '#242424', '#202020', '#1c1c1c', '#161616',
] as const;

const LIGHT_EXTRUSION = [
  '#ffffff', '#ffffff', '#fafafa', '#f5f5f5', '#f0f0f0', '#ebebeb',
  '#e5e5e5', '#dfdfdf', '#d9d9d9', '#d2d2d2', '#cccccc', '#bebebe',
] as const;

/** Returns an embosssed multi-layer CSS shadow without reading browser globals. */
export function getViewportDepthShadow(
  viewportProgress: number,
  theme: ViewportDepthTheme = 'dark',
): string {
  const safeProgress = Number.isFinite(viewportProgress)
    ? Math.round(clamp(viewportProgress, 0, 1) * 100) / 100
    : 0.5;

  // A gentle left-to-right bevel sweep plus increasing extrusion toward the
  // bottom of the viewport creates the impression of changing perspective.
  const xStepEm = (safeProgress - 0.5) * 0.008;
  const yStepEm = lerp(0.0048, 0.008, safeProgress);
  const shadows: string[] = [];
  const isDark = theme === 'dark';
  const highlight = isDark ? 'rgba(255,255,255,0.68)' : 'rgba(0,0,0,0.35)';
  const extrusion = isDark ? DARK_EXTRUSION : LIGHT_EXTRUSION;

  shadows.push(
    `${(-xStepEm * 0.8).toFixed(4)}em ${(-yStepEm * 0.65).toFixed(4)}em 0 ${highlight}`,
  );

  extrusion.forEach((color, index) => {
    const layer = index + 1;
    shadows.push(
      `${(xStepEm * layer).toFixed(4)}em ${(yStepEm * layer).toFixed(4)}em 0 ${color}`,
    );
  });

  const ambientY = yStepEm * 14;
  shadows.push(
    `${(xStepEm * 1.6).toFixed(4)}em ${ambientY.toFixed(4)}em 0.045em ${
      isDark ? 'rgba(0,0,0,0.48)' : 'rgba(0,0,0,0.11)'
    }`,
  );
  shadows.push(
    `${(xStepEm * 2.2).toFixed(4)}em ${(yStepEm * 19).toFixed(4)}em 0.09em ${
      isDark ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.07)'
    }`,
  );

  return shadows.join(', ');
}
