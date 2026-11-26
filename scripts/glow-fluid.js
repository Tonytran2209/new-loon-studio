/* Glow fluid adapted from the user-provided asset; independent hero and CTA instances. */
(()=>{document.querySelectorAll('[data-glow-fluid]').forEach(cv=>{const host=cv.closest('[data-fluid-host]');if(!host)return;const grain=document.createElement('div');grain.className='studio-fluid-grain';grain.setAttribute('aria-hidden','true');cv.parentElement.append(grain);

// ---- tweakables ----
const CELL = 12;              // fluid cell size (CSS px); blurred afterwards, so it never looks blocky
const EMITTERS = 6;           // ambient sources that keep the fluid flowing
const MOUSE_FORCE = 0.4;      // how hard the cursor pushes the fluid
const MOUSE_RADIUS = 90;      // px
const SPEED = 0.55;           // global time scale of the flow (lower = slower, heavier)
const VISCOSITY = 2.2;        // thick liquid: high viscosity smooths flow into broad, coherent sweeps
const DYE_FADE = 0.994;       // per frame; liquid lingers instead of vanishing like smoke
const VEL_FADE = 0.985;       // flow settles quickly after a push
const IDLE_FLOW = 0.008;      // strength of the slow currents that move the liquid when nobody interacts
const IDLE_DELAY = 1.2;       // s without pointer movement before the currents ramp up
const VORTICITY = 0.04;       // a little curl only; high values look like smoke
const SEEDS = 7;              // liquid pools already on screen at load
// colour ramp sampled from the reference: misty lavender-white → ice → aqua → sky blue → royal → deep blue
const RAMP = [[222,226,251],[196,224,250],[120,226,242],[56,170,240],[22,104,236],[8,62,214]];
const LAVENDER = [200,188,246];   // tint that drifts through the light areas

const ctx = cv.getContext('2d');if(!ctx)return;const calm=host.classList.contains('studio-contact');
let img, W, H, nx, ny, SZ, u, v, u0, v0, p, div, dens, tmp, curl;
const IX = (i, j) => i + (nx + 2) * j;

function resize() {
  const bounds=host.getBoundingClientRect();W=Math.max(1,bounds.width);H=Math.max(1,bounds.height);
  nx = Math.ceil(W / CELL); ny = Math.ceil(H / CELL); SZ = (nx + 2) * (ny + 2);
  cv.width = nx; cv.height = ny; img = ctx.createImageData(nx, ny);
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
function ramp(t) {
  t = Math.max(0, Math.min(0.9999, t)) * (RAMP.length - 1);
  const i = t | 0, f = t - i, a = RAMP[i], b = RAMP[i + 1];
  return [mix(a[0], b[0], f), mix(a[1], b[1], f), mix(a[2], b[2], f)];
}

// ---------- input ----------
let mouse = null, prevMouse = null;
// canvas is oversized by 12% (inset:-6%) so the blur has no soft border; map screen → simulation px
let lastInput = -1e9;
host.addEventListener('pointermove',e=>{if(reduce||calm||e.pointerType==='touch')return;lastInput=clock/1000;const r=host.getBoundingClientRect();mouse={x:(e.clientX-r.left+.06*W)/1.12,y:(e.clientY-r.top+.06*H)/1.12}},{passive:true});
host.addEventListener('pointerleave',()=>{mouse=prevMouse=null},{passive:true});

// ambient emitters: wander on slow lissajous paths, pushing dye along their direction of travel
const emitters = Array.from({ length: EMITTERS }, (_, i) => ({
  ph: Math.random() * 6.28, fx: 0.05 + Math.random() * 0.05, fy: 0.04 + Math.random() * 0.05,
  cx: 0.1 + 0.8 * Math.random(), cy: 0.15 + 0.7 * Math.random(),
}));
const ePos = (e, t) => [W * (e.cx + 0.22 * Math.sin(t * e.fx * 6.28 + e.ph)), H * (e.cy + 0.22 * Math.cos(t * e.fy * 6.28 + e.ph * 1.7))];

const motion=matchMedia('(prefers-reduced-motion: reduce)');let reduce=motion.matches,visible=false,raf=0,last=0,clock=0;
// large, slowly morphing sine currents: sweep the liquid in broad S-curves (projection keeps them fluid)
function currents(time, idle) {
  const a = IDLE_FLOW * idle, t1 = time * 0.11, t2 = time * 0.07;
  for (let j = 1; j <= ny; j++) {
    const y = j / ny, sy = Math.sin(y * 4.2 + t1), cy = Math.cos(y * 2.6 - t2);
    for (let i = 1; i <= nx; i++) {
      const x = i / nx, k = IX(i, j);
      u[k] += a * (sy + 0.6 * Math.sin(x * 3.1 - t2 * 1.3));
      v[k] += a * (Math.cos(x * 3.7 - t1) * 0.9 + 0.5 * cy);
    }
  }
}
function frame(ms) {
  raf=0;if(!visible||document.hidden||reduce||(calm&&host.matches(':focus-within'))){last=0;return;}clock+=last?Math.min(ms-last,40):16.67;last=ms;const time=clock/1000;
  // 0 while the user is interacting, eases to 1 once idle: ambient motion steps back when the cursor takes over
  const idle = reduce ? 0 : Math.min(1, Math.max(0, (time - lastInput - IDLE_DELAY) / 2));
  if (idle > 0) currents(time, idle);
  const et = reduce ? 0 : time;
  for (const e of emitters) {
    const [x, y] = ePos(e, et), [x2, y2] = ePos(e, et + 0.1);
    // emitter velocity in cells/frame; a small per-frame nudge settles the nearby liquid at roughly that speed
    // (a big nudge accumulates every frame and turns into chaotic jets)
    const k = 0.015 * (1 + idle) / (0.1 * 60 * CELL);
    splat(x, y, (x2 - x) * k, (y2 - y) * k, 0.028, 130);
  }
  if (mouse && prevMouse) {
    const dx = mouse.x - prevMouse.x, dy = mouse.y - prevMouse.y, sp = Math.hypot(dx, dy);
    if (sp > 0.5) {
      // splat along the segment so fast strokes stay continuous
      const n = Math.min(8, Math.ceil(sp / (MOUSE_RADIUS * 0.5)));
      const f = Math.min(1.6, sp / CELL * MOUSE_FORCE) / sp;
      for (let s = 1; s <= n; s++) {
        const x = prevMouse.x + dx * s / n, y = prevMouse.y + dy * s / n;
        splat(x, y, dx * f, dy * f, Math.min(0.6, 0.1 + sp * 0.014) / n, MOUSE_RADIUS);
      }
    }
  }
  if (mouse) prevMouse = { ...mouse };
  step();
  render(time);
  raf=requestAnimationFrame(frame);
}

// density → colour ramp; where the density changes fast (the fluid's edge) a white rim lights up,
// like the glowing seam in the reference image
function render(time) {
  const data = img.data;
  for (let j = 1; j <= ny; j++) for (let i = 1; i <= nx; i++) {
    const k = IX(i, j);
    // contrast curve: a clear sweep between the deep-blue body and the light mist, as in the reference
    const d = dens[k], c = Math.min(1, Math.max(0, (d - 0.25) / 1.1)), t = c * c * (3 - 2 * c);
    // edge strength over a 2-cell span (wide enough to survive the blur), strongest on the light side of the edge
    const i2 = Math.min(nx, i + 2), i0 = Math.max(1, i - 2), j2 = Math.min(ny, j + 2), j0 = Math.max(1, j - 2);
    const gx = dens[IX(i2, j)] - dens[IX(i0, j)], gy = dens[IX(i, j2)] - dens[IX(i, j0)];
    const rim = Math.min(1, Math.hypot(gx, gy) * 1.4) * (1 - t * 0.5);
    let [r, g, b] = ramp(t);
    // lavender haze wanders through the light regions
    const lv = (1 - t) * (1 - t) * (1 - t) * (0.5 + 0.5 * Math.sin(i * 0.05 + j * 0.03 - time * 0.12)) * 0.55;
    r = mix(r, LAVENDER[0], lv); g = mix(g, LAVENDER[1], lv); b = mix(b, LAVENDER[2], lv);
    r = mix(r, 255, rim); g = mix(g, 255, rim); b = mix(b, 255, rim);
    const o = ((j - 1) * nx + (i - 1)) * 4;
    data[o] = r; data[o + 1] = g; data[o + 2] = b; data[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}
// pre-seed liquid pools and let them settle, so the screen is alive before anyone touches it
function seed() {
  for (let s = 0; s < SEEDS; s++) {
    const x = W * (0.08 + 0.84 * Math.random()), y = H * (0.1 + 0.8 * Math.random()), a = Math.random() * 6.28;
    splat(x, y, Math.cos(a) * 0.6, Math.sin(a) * 0.6, 1.6, Math.min(W, H) * (0.14 + 0.08 * Math.random()));
  }
  for (let i = 0; i < 90; i++) step();
}

{ // grain: one 160px noise tile, repeated
  const g = document.createElement('canvas'); g.width = g.height = 160;
  const gc = g.getContext('2d'), id = gc.createImageData(160, 160);
  for (let o = 0; o < id.data.length; o += 4) { const n = Math.random() * 255; id.data[o] = id.data[o + 1] = id.data[o + 2] = n; id.data[o + 3] = 255; }
  gc.putImageData(id, 0, 0);
  grain.style.background = `url(${g.toDataURL()})`;
}
function sync(){cancelAnimationFrame(raf);raf=0;last=0;if(reduce)render(0);else if(visible&&!document.hidden&&!(calm&&host.matches(':focus-within')))raf=requestAnimationFrame(frame)}
new ResizeObserver(()=>{resize();seed();render(0);sync()}).observe(host);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{rootMargin:'80px'}).observe(host);
document.addEventListener('visibilitychange',sync);motion.addEventListener('change',()=>{reduce=motion.matches;mouse=prevMouse=null;sync()});if(calm){host.addEventListener('focusin',sync);host.addEventListener('focusout',()=>queueMicrotask(sync))}


});})();
