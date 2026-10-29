import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, documentYToViewportY, getTitleMorphPosition, getTitleMorphProgress, lerp, smoothstep } from './titleMorph.ts';

test('title morph helpers clamp invalid progress at the edges', () => {
  assert.equal(clamp(-3, 0, 1), 0);
  assert.equal(clamp(4, 0, 1), 1);
  assert.equal(smoothstep(-1), 0);
  assert.equal(smoothstep(2), 1);
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
});

test('title morph starts with the hero title and ends with the navbar brand', () => {
  const start = getTitleMorphProgress(0, 400);
  assert.equal(start.raw, 0);
  assert.equal(start.eased, 0);
  assert.equal(start.brandOpacity, 0);
  assert.equal(start.overlayOpacity, 1);
  assert.equal(start.overlayVisible, true);

  const end = getTitleMorphProgress(400, 400);
  assert.equal(end.raw, 1);
  assert.equal(end.eased, 1);
  assert.equal(end.brandOpacity, 1);
  assert.equal(end.overlayOpacity, 0);
  assert.equal(end.overlayVisible, false);
});

test('title morph progress is monotonic and safe for zero-sized viewports', () => {
  const values = [0, 40, 80, 120, 160, 200].map((y) => getTitleMorphProgress(y, 200).eased);
  assert.deepEqual(values, [...values].sort((a, b) => a - b));
  assert.equal(getTitleMorphProgress(20, 0).raw, 1);
  assert.equal(getTitleMorphProgress(Number.NaN, 200).raw, 0);
});


test('document coordinates follow scrolling before the morph starts', () => {
  assert.equal(documentYToViewportY(720, 0), 720);
  assert.equal(documentYToViewportY(720, 240), 480);
  assert.equal(documentYToViewportY(Number.NaN, 240), -240);
});

test('title position stays attached to the hero at progress zero and lands on the navbar at one', () => {
  const atHeroTop = getTitleMorphPosition(32, 720, 24, 18, 0, 0);
  assert.deepEqual(atHeroTop, { x: 32, y: 720 });

  const whileScrollingBeforeTravel = getTitleMorphPosition(32, 720, 24, 18, 0, 240);
  assert.deepEqual(whileScrollingBeforeTravel, { x: 32, y: 480 });

  const atNavbar = getTitleMorphPosition(32, 720, 24, 18, 1, 520);
  assert.deepEqual(atNavbar, { x: 24, y: 18 });
});

test('title position clamps interpolation progress and tolerates invalid scroll values', () => {
  assert.deepEqual(getTitleMorphPosition(10, 100, 30, 20, -1, Number.NaN), { x: 10, y: 100 });
  assert.deepEqual(getTitleMorphPosition(10, 100, 30, 20, 2, 50), { x: 30, y: 20 });
});
