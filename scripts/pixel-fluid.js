/* Adapted from the user-supplied pixel-fluid.html; isolated per surface. */
(()=>{document.querySelectorAll('[data-pixel-fluid]').forEach(cv=>{const host=cv.closest('[data-fluid-host]');if(!host)return;

const calm=host.classList.contains('studio-contact');
// ---- tweakables ----
const CELL = 14;              // grid spacing (CSS px) = one fluid cell = one dot
const EMITTERS = calm ? 6 : 15;          // ambient sources that keep the fluid flowing
const MOUSE_FORCE = 0.3;      // how hard the cursor pushes the fluid
const MOUSE_RADIUS = 56;      // px
const SPEED = calm ? 0.2 : 0.55;           // global time scale of the flow (lower = slower, heavier)
const VISCOSITY = 2.2;        // thick liquid: high viscosity smooths flow into broad, coherent sweeps
const DYE_FADE = 0.986;       // per frame; liquid lingers instead of vanishing like smoke
const VEL_FADE = 0.985;       // flow settles quickly after a push
const VORTICITY = 0.04;       // a little curl only; high values look like smoke
const SEEDS = calm ? 8 : 20;             // liquid pools already on screen at load
// palette sampled from the gradient image: lavender → periwinkle → blue → deep blue → cyan → mint
const PALETTE = [[185,168,245],[127,166,242],[59,139,240],[10,99,224],[73,198,240],[126,235,213]];

const ctx = cv.getContext('2d'); if(!ctx)return;
let W, H, nx, ny, SZ, u, v, u0, v0, p, div, dens, tmp, curl;
const IX = (i, j) => i + (nx + 2) * j;

function resize() {
  const DPR = Math.min(2, devicePixelRatio || 1);
  const bounds=host.getBoundingClientRect(); W = Math.max(1,bounds.width); H = Math.max(1,bounds.height);
  cv.width = W * DPR; cv.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  nx = Math.ceil(W / CELL); ny = Math.ceil(H / CELL); SZ = (nx + 2) * (ny + 2);
  [u, v, u0, v0, p, div, dens, tmp, curl] = Array.from({ length: 9 }, () => new Float32Array(SZ));
}


// ---------- stable-fluids solver (Jos Stam), velocities in cells/frame ----------
function setBnd(b, x) {
  for (let i = 1; i <= nx; i++) {
    x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
    x[IX(i, ny + 1)] = b === 2 ? -x[IX(i, ny)] : x[IX(i, ny)];
  }
  for (let j = 1; j <= ny; j++) {
    x[IX(0, j)] = b === 1 ? -x[IX(1, j)] : x[IX(1, j)];
    x[IX(nx + 1, j)] = b === 1 ? -x[IX(nx, j)] : x[IX(nx, j)];
  }
}
function advect(b, d, d0, uu, vv) {
  for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
    const k = IX(i, j);
    let x = i - uu[k], y = j - vv[k];
    x = x < 0.5 ? 0.5 : x > nx + 0.5 ? nx + 0.5 : x;
    y = y < 0.5 ? 0.5 : y > ny + 0.5 ? ny + 0.5 : y;
    const i0 = x | 0, j0 = y | 0, s1 = x - i0, t1 = y - j0, s0 = 1 - s1, t0 = 1 - t1;
    d[k] = s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j0 + 1)]) + s1 * (t0 * d0[IX(i0 + 1, j0)] + t1 * d0[IX(i0 + 1, j0 + 1)]);
  }
  setBnd(b, d);
}
function project() {
  for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
    const k = IX(i, j);
    div[k] = -0.5 * (u[k + 1] - u[k - 1] + v[k + nx + 2] - v[k - nx - 2]);
    p[k] = 0;
  }
  setBnd(0, div); setBnd(0, p);
  for (let it = 0; it < 20; it++) {
    for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
      const k = IX(i, j);
      p[k] = (div[k] + p[k - 1] + p[k + 1] + p[k - nx - 2] + p[k + nx + 2]) / 4;
    }
    setBnd(0, p);
  }
  for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
    const k = IX(i, j);
    u[k] -= 0.5 * (p[k + 1] - p[k - 1]);
    v[k] -= 0.5 * (p[k + nx + 2] - p[k - nx - 2]);
  }
  setBnd(1, u); setBnd(2, v);
}
function vorticity() {
  for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
    const k = IX(i, j);
    curl[k] = 0.5 * (v[k + 1] - v[k - 1] - u[k + nx + 2] + u[k - nx - 2]);
  }
  for (let j = 2; j < ny; j++) for (let i = 2; i < nx; i++) {
    const k = IX(i, j);
    let gx = 0.5 * (Math.abs(curl[k + 1]) - Math.abs(curl[k - 1]));
    let gy = 0.5 * (Math.abs(curl[k + nx + 2]) - Math.abs(curl[k - nx - 2]));
    const len = Math.hypot(gx, gy) + 1e-5; gx /= len; gy /= len;
    u[k] += VORTICITY * gy * curl[k];
    v[k] -= VORTICITY * gx * curl[k];
  }
}
function diffuse(b, x, x0, a) {
  x0.set(x);
  for (let it = 0; it < 6; it++) {
    for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
      const k = IX(i, j);
      x[k] = (x0[k] + a * (x[k - 1] + x[k + 1] + x[k - nx - 2] + x[k + nx + 2])) / (1 + 4 * a);
    }
    setBnd(b, x);
  }
}
function step() {
  vorticity();
  diffuse(1, u, u0, VISCOSITY); diffuse(2, v, v0, VISCOSITY);
  project();
  for (let k = 0; k < SZ; k++) { u0[k] = u[k] * SPEED; v0[k] = v[k] * SPEED; }
  { const su = u0.slice(), sv = v0.slice(); u0.set(u); v0.set(v); advect(1, u, u0, su, sv); advect(2, v, v0, su, sv); }
  project();
  // dye channels ride the velocity field (u0/v0/div are free scratch buffers at this point)
  for (let k = 0; k < SZ; k++) { curl[k] = u[k] * SPEED; p[k] = v[k] * SPEED; }   // scaled velocity (scratch)
  tmp.set(dens); advect(0, dens, tmp, curl, p);
  for (let k = 0; k < SZ; k++) {
    u[k] *= VEL_FADE; v[k] *= VEL_FADE;
    dens[k] *= DYE_FADE;
  }
}
// gaussian splat of force + dye at pixel (x,y)
function splat(x, y, fx, fy, amount, radiusPx) {
  const ci = x / CELL + 1, cj = y / CELL + 1, r = radiusPx / CELL, R = Math.ceil(r * 2.5);
  for (let j = Math.max(1, (cj - R) | 0); j <= Math.min(ny, (cj + R) | 0); j++)
    for (let i = Math.max(1, (ci - R) | 0); i <= Math.min(nx, (ci + R) | 0); i++) {
      const g = Math.exp(-((i - ci) ** 2 + (j - cj) ** 2) / (r * r)), k = IX(i, j);
      u[k] += fx * g; v[k] += fy * g;
      const a = amount * g;
      dens[k] += a;
    }
}

// ---------- colour ----------
const mix = (a, b, t) => a + (b - a) * t;
function palette(t) {
  t = ((t % 1) + 1) % 1 * PALETTE.length;
  const i = Math.floor(t), f = t - i, a = PALETTE[i], b = PALETTE[(i + 1) % PALETTE.length];
  return [mix(a[0], b[0], f), mix(a[1], b[1], f), mix(a[2], b[2], f)];
}

// ---------- input ----------
let mouse = null, prevMouse = null;
host.addEventListener('pointermove', e => { if(calm||reduce||e.pointerType==='touch')return;const r=host.getBoundingClientRect();mouse = { x: e.clientX-r.left, y: e.clientY-r.top }; },{passive:true});
host.addEventListener('pointerleave', () => { mouse = prevMouse = null; },{passive:true});

// ambient emitters: wander on slow lissajous paths, pushing dye along their direction of travel
const emitters = Array.from({ length: EMITTERS }, (_, i) => ({
  ph: Math.random() * 6.28, fx: 0.03 + Math.random() * 0.03, fy: 0.025 + Math.random() * 0.03,
  cx: 0.1 + 0.8 * Math.random(), cy: 0.12 + 0.76 * Math.random(),   // scattered: many separate patches, like the reference
}));
const ePos = (e, t) => [W * (e.cx + 0.14 * Math.sin(t * e.fx * 6.28 + e.ph)), H * (e.cy + 0.16 * Math.cos(t * e.fy * 6.28 + e.ph * 1.7))];

const motion=matchMedia('(prefers-reduced-motion: reduce)');let reduce=motion.matches,raf=0,visible=false,last=0,clock=0;
function frame(ms) {
  raf=0;if(!visible||document.hidden||reduce||(calm&&host.matches(':focus-within'))){last=0;return;}clock+=last?Math.min(ms-last,40):16.67;last=ms;const time=clock/1000*(calm?.35:1);
  const et = reduce ? 0 : time;
  for (const e of emitters) {
    const [x, y] = ePos(e, et), [x2, y2] = ePos(e, et + 0.1);
    splat(x, y, (x2 - x) / CELL * 0.35, (y2 - y) / CELL * 0.35, 0.036, 60);
  }
  if (mouse && prevMouse) {
    const dx = mouse.x - prevMouse.x, dy = mouse.y - prevMouse.y, sp = Math.hypot(dx, dy);
    if (sp > 0.5) {
      // splat along the segment so fast strokes stay continuous
      const n = Math.min(8, Math.ceil(sp / (MOUSE_RADIUS * 0.5)));
      const f = Math.min(1.6, sp / CELL * MOUSE_FORCE) / sp;
      for (let s = 1; s <= n; s++) {
        const x = prevMouse.x + dx * s / n, y = prevMouse.y + dy * s / n;
        splat(x, y, dx * f, dy * f, Math.min(0.5, 0.08 + sp * 0.012) / n, MOUSE_RADIUS);
      }
    }
  }
  if (mouse) prevMouse = { ...mouse };
  step();
  render(time);
  raf=requestAnimationFrame(frame);
}

// colour comes from a slowly drifting screen-space gradient (as in the reference image), not from mixed dye,
// which would average the palette into grey; the fluid decides only where the dots are and how big
function render(time) {
  ctx.clearRect(0, 0, W, H);
  for (let j = 1; j <= ny; j++) {
    const y = (j - 1) * CELL + CELL / 2;
    for (let i = 1; i <= nx; i++) {
      const k = IX(i, j);
      // light 5-tap blur so dot sizes change smoothly from neighbour to neighbour
      const d = (dens[k] * 4 + dens[k - 1] + dens[k + 1] + dens[k - nx - 2] + dens[k + nx + 2]) / 8;
      // soft threshold: thin haze disappears, so blobs keep clear edges and negative space
      // liquid surface: a smoothstep gives blobs a defined edge (like surface tension), small fringe dots outside
      const t = Math.min(1, Math.max(0, (d - 0.1) / 0.6)), val = t * t * (3 - 2 * t);
      if (val < 0.02) continue;
      const x = (i - 1) * CELL + CELL / 2;
      const [r, g, b] = palette(x / W * 0.8 + y / H * 0.45 + time * 0.025 + val * 0.08);
      const w = Math.max(0, (val - 0.75) / 0.25) * 0.5;            // dense cores wash towards white
      ctx.fillStyle = `rgba(${r + (255 - r) * w | 0},${g + (255 - g) * w | 0},${b + (255 - b) * w | 0},${0.6 + 0.28 * val})`;
      ctx.beginPath(); ctx.arc(x, y, CELL * (0.12 + 0.36 * val + 0.06 * w), 0, 6.2832); ctx.fill();
    }
  }
}
// pre-seed liquid pools and let them settle, so the screen is alive before anyone touches it
function seed() {
  for (let s = 0; s < SEEDS; s++) {
    const x = W * (0.08 + 0.84 * Math.random()), y = H * (0.1 + 0.8 * Math.random()), a = Math.random() * 6.28;
    splat(x, y, Math.cos(a) * 0.4, Math.sin(a) * 0.4, 1.1, Math.min(W, H) * (0.1 + 0.06 * Math.random()));
  }
  for (let i = 0; i < 90; i++) step();
}
function sync(){cancelAnimationFrame(raf);raf=0;last=0;if(reduce)render(0);else if(visible&&!document.hidden&&!(calm&&host.matches(':focus-within')))raf=requestAnimationFrame(frame)}
new ResizeObserver(()=>{resize();seed();render(0);sync()}).observe(host);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{rootMargin:'80px'}).observe(host);
if(calm){host.addEventListener('focusin',sync);host.addEventListener('focusout',()=>queueMicrotask(sync));}
document.addEventListener('visibilitychange',sync);motion.addEventListener('change',()=>{reduce=motion.matches;mouse=prevMouse=null;sync()});

});})();
