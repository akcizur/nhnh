/** Pure progress helpers for the hero-title → navbar-brand transition. */
export interface TitleMorphProgress {
  /** Un-eased scroll progress, clamped to [0, 1]. */
  raw: number;
  /** Smoothstep progress used for the position and typography interpolation. */
  eased: number;
  /** Cross-fade amount for the destination navbar brand. */
  brandOpacity: number;
  /** Inverse cross-fade amount for the travelling hero title. */
  overlayOpacity: number;
  /** Whether the travelling title should still be rendered. */
  overlayVisible: boolean;
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

/** Convert a document-space Y coordinate to the current viewport space. */
export const documentYToViewportY = (documentY: number, scrollY: number): number => {
  const safeDocumentY = Number.isFinite(documentY) ? documentY : 0;
  const safeScrollY = Number.isFinite(scrollY) ? Math.max(0, scrollY) : 0;
  return safeDocumentY - safeScrollY;
};

/**
 * Calculate the title's current position. Until the morph begins, it tracks the
 * real heading as the document scrolls; then it travels into the fixed navbar.
 */
export function getTitleMorphPosition(
  startX: number,
  startDocumentY: number,
  endX: number,
  endViewportY: number,
  progress: number,
  scrollY: number,
): { x: number; y: number } {
  const p = clamp(progress, 0, 1);
  const sourceY = documentYToViewportY(startDocumentY, scrollY);
  return {
    x: lerp(startX, endX, p),
    y: lerp(sourceY, endViewportY, p),
  };
}

/** Smoothstep has zero velocity at both ends, avoiding a harsh start/stop. */
export const smoothstep = (progress: number): number => {
  const t = clamp(progress, 0, 1);
  return t * t * (3 - 2 * t);
};

export function getTitleMorphProgress(scrollY: number, travel: number): TitleMorphProgress {
  const safeTravel = Number.isFinite(travel) && travel > 0 ? travel : 1;
  const safeScroll = Number.isFinite(scrollY) ? Math.max(0, scrollY) : 0;
  const raw = clamp(safeScroll / safeTravel, 0, 1);
  const eased = smoothstep(raw);
  const brandOpacity = clamp((eased - 0.82) / 0.18, 0, 1);

  return {
    raw,
    eased,
    brandOpacity,
    overlayOpacity: 1 - brandOpacity,
    overlayVisible: raw < 1,
  };
}
