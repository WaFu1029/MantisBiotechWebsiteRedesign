type Vec = [number, number];

function capsule(p: Vec, a: Vec, b: Vec, r: number) {
  const pax = p[0] - a[0];
  const pay = p[1] - a[1];
  const bax = b[0] - a[0];
  const bay = b[1] - a[1];
  const len = bax * bax + bay * bay || 1;
  const h = Math.max(0, Math.min(1, (pax * bax + pay * bay) / len));
  return Math.hypot(pax - bax * h, pay - bay * h) - r;
}

function ellipse(p: Vec, c: Vec, rx: number, ry: number) {
  const x = (p[0] - c[0]) / rx;
  const y = (p[1] - c[1]) / ry;
  return (Math.hypot(x, y) - 1) * Math.min(rx, ry);
}

// Smooth union so limbs blend into the torso.
function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

/**
 * Signed distance to a standing human figure (negative inside).
 * y runs 0 (top) to 1 (bottom); x is centered on 0 in the same units,
 * and the figure spans roughly x ∈ [-0.22, 0.22].
 */
export function humanSdf(x: number, y: number) {
  const p: Vec = [x, y];
  const m: Vec = [Math.abs(x), y];
  let d = ellipse(p, [0, 0.095], 0.052, 0.066); // head
  d = smin(d, capsule(p, [0, 0.15], [0, 0.2], 0.026), 0.02); // neck
  d = smin(d, capsule(m, [0.075, 0.225], [0.075, 0.225], 0.036), 0.03); // shoulders
  d = smin(d, ellipse(p, [0, 0.32], 0.088, 0.125), 0.03); // chest
  d = smin(d, ellipse(p, [0, 0.43], 0.07, 0.08), 0.04); // abdomen
  d = smin(d, ellipse(p, [0, 0.5], 0.082, 0.055), 0.03); // pelvis
  d = smin(d, capsule(m, [0.095, 0.235], [0.15, 0.38], 0.024), 0.02); // upper arms
  d = smin(d, capsule(m, [0.15, 0.38], [0.19, 0.52], 0.019), 0.015); // forearms
  d = smin(d, ellipse(m, [0.2, 0.555], 0.018, 0.03), 0.01); // hands
  d = smin(d, capsule(m, [0.042, 0.52], [0.052, 0.73], 0.036), 0.02); // thighs
  d = smin(d, capsule(m, [0.052, 0.73], [0.056, 0.92], 0.025), 0.015); // shins
  d = smin(d, capsule(m, [0.056, 0.945], [0.075, 0.955], 0.016), 0.01); // feet
  return d;
}
