import test from 'node:test';
import assert from 'node:assert/strict';
import { getViewportDepthShadow } from './viewportDepth.ts';

test('viewport depth is deterministic and produces a layered 3D extrusion', () => {
  const shadow = getViewportDepthShadow(0.5, 'dark');
  assert.equal(shadow, getViewportDepthShadow(0.5, 'dark'));
  assert.ok(shadow.split(',').length >= 14);
  assert.match(shadow, /#4a4a4a/);
});

test('the 3D direction and depth change with vertical viewport position', () => {
  const top = getViewportDepthShadow(0, 'dark');
  const center = getViewportDepthShadow(0.5, 'dark');
  const bottom = getViewportDepthShadow(1, 'dark');

  assert.notEqual(top, center);
  assert.notEqual(center, bottom);
  assert.notEqual(top, bottom);
  assert.match(top, /-0\.0040em 0\.0048em 0 #4a4a4a/);
  assert.match(bottom, /0\.0040em 0\.0080em 0 #4a4a4a/);
});

test('the effect clamps off-screen coordinates and safely handles invalid input', () => {
  assert.equal(getViewportDepthShadow(-2, 'dark'), getViewportDepthShadow(0, 'dark'));
  assert.equal(getViewportDepthShadow(3, 'dark'), getViewportDepthShadow(1, 'dark'));
  assert.equal(getViewportDepthShadow(Number.NaN, 'dark'), getViewportDepthShadow(0.5, 'dark'));
});

test('light mode keeps its silver/white extrusion palette', () => {
  const light = getViewportDepthShadow(0.5, 'light');
  const dark = getViewportDepthShadow(0.5, 'dark');
  assert.match(light, /#ffffff/);
  assert.match(light, /#bebebe/);
  assert.notEqual(light, dark);
});
