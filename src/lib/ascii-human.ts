type Vec = [number, number];

const ROWS = 72;
const COLS = 64;
// Monospace glyph width relative to line height (leading-none).
const CELL_ASPECT = 0.6;
const RAMP = " .:-=+*#%@";

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

// Signed distance to a standing human figure; y runs 0 (top) to 1 (bottom).
function body(p: Vec) {
  const m: Vec = [Math.abs(p[0]), p[1]];
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

function noise(i: number, j: number) {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function renderAsciiHuman() {
  const lines: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    let line = "";
    for (let c = 0; c < COLS; c++) {
      const x = ((c + 0.5 - COLS / 2) * CELL_ASPECT) / ROWS;
      const y = (r + 0.5) / ROWS;
      const d = body([x, y]);
      if (d > 0) {
        line += d < 0.01 && noise(r, c) < 0.35 ? "." : " ";
        continue;
      }
      const depth = Math.min(1, -d / 0.035);
      const shade = 0.2 + 0.8 * depth + (noise(r, c) - 0.5) * 0.15 - x * 0.6;
      const clamped = Math.max(0, Math.min(1, shade));
      line += RAMP[1 + Math.round(clamped * (RAMP.length - 2))];
    }
    lines.push(line.trimEnd());
  }
  return lines.join("\n");
}

export const ASCII_HUMAN = renderAsciiHuman();
