// Pond background engine for the Explorations page.
// Owns the water canvas, WebGL ripples, lily pads, card bobbing and card/background dragging.
export default class Pond {
  BX = 1500; BY = 1150; EX = 1100; EY = 720; SC = .4;
  constructor({ wrap, canvas, glCanvas, layer, items, getNight }) {
    this.wrap = wrap; this.cv = canvas; this.glc = glCanvas; this.layer = layer;
    this.items = items; this.getNight = getNight || (() => false);
    this.setup();
  }
  reset() {
    this.resetting = 1.2;
    this.resetTimer = setTimeout(() => this.cards.forEach((c, i) => i % 3 === 0 && this.ripple(c.hx, c.hy, .6)), 500);
  }
  destroy() {
    this.dead = true; cancelAnimationFrame(this.raf); clearTimeout(this.resetTimer);
    removeEventListener('resize', this.onResize);
    const w = this.wrap;
    w.removeEventListener('pointerdown', this.onDown); w.removeEventListener('pointermove', this.onMove);
    w.removeEventListener('pointerup', this.onUp); w.removeEventListener('pointercancel', this.onUp);
  }
  setup() {
    let z = 11; const R = () => (z = (z * 9301 + 49297) % 233280) / 233280;
    const BX = this.BX, BY = this.BY;
    this.pan = { x: 0, y: 0 }; this.nt = 0; this.z = 1;
    this.cards = this.items.map((it) => ({ x: it.x, y: it.y, hx: it.x, hy: it.y, ph: R() * 6.28, tilt: (R() - .5) * 4, lift: 0, ll: -1 }));
    this.ripples = [];
    const blocked = (x, y, r) => (Math.abs(x) < 230 + r && Math.abs(y) < 110 + r) || this.items.some((it) => Math.abs(it.x - x) < 135 + r && Math.abs(it.y - y) < 165 + r);
    this.rocks = [{ x: -1500, y: -760, r: 300 }, { x: 1380, y: 260, r: 190 }, { x: 420, y: 1330, r: 260 }, { x: -1250, y: 1250, r: 170 }, { x: 1300, y: -1180, r: 150 }, { x: -260, y: -1350, r: 120 }];
    this.pads = []; this.flowers = [];
    const PC = [[[205,227,92],[86,124,18]], [[178,217,90],[66,112,20]], [[219,234,114],[98,130,24]], [[151,205,98],[50,104,30]], [[195,223,102],[78,118,22]]];
    const addPad = (x, y, r) => {
      if (blocked(x, y, r) || this.pads.some((p) => Math.hypot(p.ax - x, p.ay - y) < p.r + r + 4)) return;
      this.pads.push({ ax: x, ay: y, x, y, vx: 0, vy: 0, r, a: R() * 6.28, va: (R() - .5) * .05, notch: .2 + R() * .15, c: PC[Math.floor(R() * PC.length)] });
    };
    const clusters = this.rocks.map((k) => ({ x: k.x + (R() - .5) * k.r * 2, y: k.y + (R() - .5) * k.r * 2, n: 14 }));
    for (let i = 0; i < 14; i++) clusters.push({ x: (R() - .5) * 2 * BX, y: (R() - .5) * 2 * BY, n: 3 + Math.floor(R() * 7) });
    for (const c of clusters) for (let j = 0; j < c.n * 4 && j < 80; j++) {
      const a = R() * 6.28, d = 40 + R() * 220;
      addPad(c.x + Math.cos(a) * d, c.y + Math.sin(a) * d, 9 + R() * 24);
    }
    for (let i = 0; i < 70; i++) {
      const p = this.pads[Math.floor(R() * this.pads.length)]; if (!p) break;
      const a = R() * 6.28, d = p.r + 8 + R() * 30;
      this.flowers.push({ x: p.ax + Math.cos(a) * d, y: p.ay + Math.sin(a) * d, vx: 0, vy: 0, a: R() * 6.28, va: (R() - .5) * .4, s: 3 + R() * 3 });
    }
    this.glints = [];
    for (let i = 0; i < 14; i++) {
      const cx = (R() - .5) * 2 * (BX + 300), cy = (R() - .5) * 2 * (BY + 300);
      for (let j = 0; j < 9; j++) this.glints.push({ x: cx + (R() - .5) * 220, y: cy + (R() - .5) * 140, w: 6 + R() * 10, ph: R() * 6.28, sp: 1 + R() * 2 });
    }
    this.bg = this.paintBg(R);

    const wrap = this.wrap;
    this.toWorld = (e) => { const r = wrap.getBoundingClientRect(); return { x: e.clientX - r.left - r.width / 2 - this.pan.x, y: e.clientY - r.top - r.height / 2 - this.pan.y }; };
    this.onDown = (e) => {
      if (e.target.closest('[data-ui]')) return;
      const w = this.toWorld(e), el = e.target.closest('[data-card]');
      if (el) {
        const c = this.cards[+el.dataset.card];
        this.drag = { type: 'card', c, el, ox: w.x - c.x, oy: w.y - c.y, lx: c.x, ly: c.y, lt: 0 };
        c.dragging = true; el.style.zIndex = ++this.z; el.style.cursor = 'grabbing';
      } else this.drag = { type: 'pan', sx: e.clientX, sy: e.clientY, px: this.pan.x, py: this.pan.y };
      wrap.style.cursor = 'grabbing';
      try { wrap.setPointerCapture(e.pointerId); } catch { /* pointer capture not supported */ }
      this.resetting = 0;
    };
    this.onMove = (e) => {
      const d = this.drag;
      if (!d && e.pointerType !== 'touch' && !e.target.closest('[data-ui]')) {
        const w = this.toWorld(e), now = performance.now(), m = this.lastHover;
        if (m && now - m.t < 200) {
          const dist = Math.hypot(w.x - m.x, w.y - m.y);
          if (dist > 3) {
            const sp = Math.min(1, dist / Math.max(8, now - m.t) / 2.2);
            this.trail(m.x, m.y, w.x, w.y, 14 + sp * 12, .025 + sp * .07);
            if (Math.random() < .25) this.ripples.push({ x: w.x, y: w.y, str: .15 + sp * .2, t0: now });
          }
        }
        this.lastHover = { x: w.x, y: w.y, t: now };
      }
      if (!d) return;
      if (d.type === 'card') {
        const w = this.toWorld(e); d.c.x = w.x - d.ox; d.c.y = w.y - d.oy;
        const now = performance.now();
        if (Math.hypot(d.c.x - d.lx, d.c.y - d.ly) > 12) { this.trail(d.lx, d.ly, d.c.x, d.c.y, 70, .05); if (now - d.lt > 160) { this.ripples.push({ x: d.c.x, y: d.c.y, str: .35, t0: now }); d.lt = now; } d.lx = d.c.x; d.ly = d.c.y; }
      } else {
        this.pan.x = Math.max(-BX, Math.min(BX, d.px + e.clientX - d.sx));
        this.pan.y = Math.max(-BY, Math.min(BY, d.py + e.clientY - d.sy));
      }
    };
    this.onUp = () => {
      const d = this.drag; if (!d) return;
      if (d.type === 'card') { d.c.dragging = false; d.el.style.cursor = 'grab'; this.ripple(d.c.x, d.c.y, 1); }
      this.drag = null; wrap.style.cursor = 'grab';
    };
    wrap.addEventListener('pointerdown', this.onDown);
    wrap.addEventListener('pointermove', this.onMove);
    wrap.addEventListener('pointerup', this.onUp);
    wrap.addEventListener('pointercancel', this.onUp);
    this.onResize = () => {
      const cv = this.cv, dpr = this.gl ? 1 : Math.min(1.5, devicePixelRatio || 1);
      this.W = wrap.clientWidth; this.H = wrap.clientHeight; this.dpr = dpr;
      cv.width = this.W * dpr; cv.height = this.H * dpr;
      const ctx = cv.getContext('2d');
      this.vg = ctx.createRadialGradient(this.W / 2, this.H / 2, Math.min(this.W, this.H) * .4, this.W / 2, this.H / 2, Math.max(this.W, this.H) * .8);
      this.vg.addColorStop(0, 'rgba(14,40,80,0)'); this.vg.addColorStop(1, 'rgba(14,40,80,.22)');
      if (this.gl) this.glResize();
    };
    try { this.glInit(); } catch (e) { console.warn('water gl off', e); this.gl = null; if (this.glc) this.glc.style.display = 'none'; }
    this.onResize(); addEventListener('resize', this.onResize);
    this.last = performance.now();
    const loop = () => { if (this.dead) return; this.raf = requestAnimationFrame(loop); try { this.frame(performance.now()); } catch (e) { console.warn(e); } };
    this.raf = requestAnimationFrame(loop);
  }
  blob(g, x, y, r, R, n = 9, jit = .35) {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * 6.283 + R() * .3, rr = r * (1 - jit / 2 + R() * jit); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * .9]); }
    g.beginPath();
    const m = (i) => { const p = pts[i % n], q = pts[(i + 1) % n]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
    const s = m(0); g.moveTo(s[0], s[1]);
    for (let i = 1; i <= n; i++) { const p = pts[i % n], e = m(i); g.quadraticCurveTo(p[0], p[1], e[0], e[1]); }
    g.closePath();
  }
  paintBg(R) {
    const SC = this.SC, WW = (this.BX + this.EX) * 2, HH = (this.BY + this.EY) * 2;
    const c = document.createElement('canvas'); c.width = Math.ceil(WW * SC); c.height = Math.ceil(HH * SC);
    const g = c.getContext('2d'); g.scale(SC, SC); g.translate(WW / 2, HH / 2);
    const lg = g.createLinearGradient(-WW / 2, -HH / 2, WW / 2, HH / 2);
    [[0, 'rgb(53,110,175)'], [.14, 'rgb(53,128,194)'], [.28, 'rgb(53,139,201)'], [.42, 'rgb(84,160,214)'], [.54, 'rgb(105,174,222)'], [.66, 'rgb(98,168,218)'], [.8, 'rgb(72,148,206)'], [1, 'rgb(53,126,190)']].forEach(([o, c]) => lg.addColorStop(o, c));
    g.fillStyle = lg; g.fillRect(-WW / 2, -HH / 2, WW, HH);
    const rad = (x, y, r, col) => { const rg = g.createRadialGradient(x, y, 0, x, y, r), a = +col.match(/([\d.]+)\)$/)[1]; for (let i = 0; i <= 8; i++) { const t = i / 8, k = Math.pow(1 - t, 2.2) * (3 - 2 * (1 - t)); rg.addColorStop(t, col.replace(/[\d.]+\)$/, (a * Math.min(1, k)).toFixed(3) + ')')); } g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2); };
    rad(-WW * .28, HH * .22, 1500, 'rgba(142,196,232,.55)');
    rad(WW * .3, -HH * .32, 1300, 'rgba(42,77,135,.45)');
    rad(WW * .25, HH * .35, 1000, 'rgba(167,210,240,.35)');
    rad(-WW * .05, HH * .05, 1400, 'rgba(105,170,220,.35)');
    rad(WW * .05, -HH * .12, 1200, 'rgba(53,139,201,.3)');
    rad(-WW * .32, -HH * .2, 1100, 'rgba(42,77,135,.3)');
    rad(0, 0, 700, 'rgba(195,227,250,.3)');
    for (let i = 0; i < 26; i++) rad((R() - .5) * WW, (R() - .5) * HH, 200 + R() * 300, 'rgba(255,255,255,.07)');
    const blocked = (x, y) => Math.abs(x) < 240 && Math.abs(y) < 120;
    g.filter = 'blur(34px)';
    const SCOL = ['rgba(42,77,135,.24)', 'rgba(42,77,135,.2)', 'rgba(36,70,128,.2)', 'rgba(56,88,150,.2)', 'rgba(44,90,150,.2)', 'rgba(53,110,175,.2)'];
    const stone = (x, y, r) => { g.fillStyle = SCOL[Math.floor(R() * SCOL.length)]; this.blob(g, x, y, r, R); g.fill(); };
    for (let i = 0; i < 300; i++) stone((R() - .5) * WW, (R() - .5) * HH, 30 + R() * 60);
    for (let i = 0; i < 130; i++) {
      const cx = (R() - .5) * WW, cy = (R() - .5) * HH; if (blocked(cx, cy)) continue;
      const n = 4 + Math.floor(R() * 9);
      for (let j = 0; j < n; j++) stone(cx + (R() - .5) * 380, cy + (R() - .5) * 300, 40 + R() * 90);
    }
    for (const k of this.rocks) for (let j = 0; j < 12; j++) { const a = R() * 6.28, d = k.r * (1 + R() * .9); stone(k.x + Math.cos(a) * d, k.y + Math.sin(a) * d, 30 + R() * 70); }
    g.strokeStyle = 'rgba(196,240,246,.2)'; g.lineCap = 'round'; g.lineWidth = 7;
    for (let i = 0; i < 26; i++) {
      const x = (R() - .5) * WW, y = (R() - .5) * HH, n = 6 + Math.floor(R() * 5), L = 30 + R() * 40;
      for (let j = 0; j < n; j++) { const a = j / n * 6.283 + R() * .4; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a + .3) * L * .6, y + Math.sin(a + .3) * L * .6, x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); }
    }
    g.filter = 'none';
    for (let i = 0; i < 30; i++) {
      const cx = (R() - .5) * WW, cy = (R() - .5) * HH;
      for (let j = 0; j < 14; j++) { g.fillStyle = `rgba(255,255,255,${.25 + R() * .35})`; g.fillRect(cx + (R() - .5) * 240, cy + (R() - .5) * 150, 5 + R() * 10, 2.5); }
    }
    return c;
  }
  drawRipple(ctx, r, ox, oy, SC) {
    const amp = r.fade * Math.min(1, r.str + .25);
    if (!(amp > .01) || !isFinite(r.R0)) return;
    const N = r.str > .7 ? 10 : r.str > .3 ? 6 : 4, sp = 7 + 4 * r.str, x = r.x, y = r.y;
    const band = (rad, k) => Math.sin(Math.PI * (k + 1) / (N + 1)) * amp;
    for (let k = 0; k < N; k++) {
      const ro = r.R0 - k * sp, ri = ro - sp; if (ro <= 1) break;
      const env = band(ro, k), s = 1 + (k % 2 ? -1 : 1) * .045 * env, src = ro / s;
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, ro, 0, 6.283); if (ri > 0) ctx.arc(x, y, ri, 0, 6.283, true); ctx.clip();
      ctx.drawImage(this.bg, (x - src + ox) * SC, (y - src + oy) * SC, src * 2 * SC, src * 2 * SC, x - ro, y - ro, ro * 2, ro * 2);
      ctx.restore();
    }
    for (let k = 0; k < N; k++) {
      const rad = r.R0 - k * sp; if (rad <= 1) break;
      const env = band(rad, k);
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.283); ctx.lineWidth = 1.4; ctx.strokeStyle = `rgba(255,255,255,${.62 * env})`; ctx.stroke();
      if (rad - sp * .5 > 1) { ctx.beginPath(); ctx.arc(x, y, rad - sp * .5, 0, 6.283); ctx.lineWidth = 2; ctx.strokeStyle = `rgba(8,40,80,${.26 * env})`; ctx.stroke(); }
    }
  }
  ripple(x, y, str) {
    this.ripples.push({ x, y, str, t0: performance.now() });
    const D = this.drops || (this.drops = []);
    if (str < .5) { D.push({ x, y, str }); return; }
    for (let i = 0; i < 5; i++) { const a = Math.random() * 6.28, r = 20 + Math.random() * 50; D.push({ x: x + Math.cos(a) * r, y: y + Math.sin(a) * r, x2: x + Math.cos(a + 1) * r * .4, y2: y + Math.sin(a + 1) * r * .4, rad: 22 + Math.random() * 26, amt: .18 + Math.random() * .2 }); }
  }
  trail(x1, y1, x2, y2, rad, amt) { (this.drops || (this.drops = [])).push({ x: x1, y: y1, x2, y2, rad, amt }); }
  glInit() {
    const c = this.glc; if (!c) return;
    const gl = c.getContext('webgl2', { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl || !gl.getExtension('EXT_color_buffer_float')) { c.style.display = 'none'; return; }
    const VS = '#version 300 es\nin vec2 p;out vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    const HD = '#version 300 es\nprecision highp float;in vec2 uv;out vec4 o;';
    const prog = (fs) => {
      const p = gl.createProgram();
      for (const [t, s] of [[gl.VERTEX_SHADER, VS], [gl.FRAGMENT_SHADER, HD + fs]]) {
        const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
        gl.attachShader(p, sh);
      }
      gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p);
      const u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) { const nm = gl.getActiveUniform(p, i).name; u[nm] = gl.getUniformLocation(p, nm); }
      return { p, u };
    };
    this.gp = {
      upd: prog('uniform sampler2D s;uniform vec2 px;uniform vec2 shift;void main(){vec2 u=uv-shift;vec4 i=texture(s,u);float a=(texture(s,u+vec2(px.x,0.)).r+texture(s,u-vec2(px.x,0.)).r+texture(s,u+vec2(0.,px.y)).r+texture(s,u-vec2(0.,px.y)).r)*.25;i.g+=(a-i.r)*1.6;i.g*=.955;i.r+=i.g;i.r*=.985;if(u.x<0.||u.y<0.||u.x>1.||u.y>1.)i=vec4(0.);o=i;}'),
      drop: prog('uniform sampler2D s;uniform vec2 c;uniform vec2 c2;uniform float rad;uniform float str;uniform float aspect;uniform float seed;void main(){vec4 i=texture(s,uv);vec2 A=vec2(aspect,1.);vec2 p=uv*A,a=c*A,b=c2*A,ba=b-a;float t=clamp(dot(p-a,ba)/max(dot(ba,ba),1e-8),0.,1.);vec2 q=p-(a+ba*t);float ang=atan(q.y,q.x);float wob=1.+.28*sin(ang*3.+seed)+.18*sin(ang*5.-seed*1.7);float d=length(q)/wob;float k=max(0.,1.-d/rad);k=k*k*(3.-2.*k);i.r+=k*str;o=i;}'),
      ren: prog('uniform sampler2D h;uniform sampler2D scene;uniform vec2 px;uniform float tm;void main(){vec2 amb=vec2(sin(uv.y*38.+tm*1.2)+sin((uv.x+uv.y)*21.-tm*.9),cos(uv.x*33.-tm*1.05)+sin((uv.x-uv.y)*17.+tm*.7))*.0011;float l=texture(h,uv-vec2(px.x,0.)).r,r=texture(h,uv+vec2(px.x,0.)).r,d=texture(h,uv-vec2(0.,px.y)).r,u=texture(h,uv+vec2(0.,px.y)).r;vec2 g=vec2(r-l,u-d);vec3 col=texture(scene,uv-g*.3+amb).rgb;vec3 n=normalize(vec3(-g*14.,1.));float sp=pow(max(0.,dot(n,normalize(vec3(-.5,.6,1.)))),70.);float sh=clamp(dot(g,vec2(.6,-.7))*3.,-.08,.08);o=vec4(col*(1.-sh)+sp*.32,1.);}'),
    };
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const tex = () => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; };
    this.glTex = tex; this.scTex = tex(); this.gl = gl;
  }
  glResize() {
    const gl = this.gl, c = this.glc; if (!gl || !c) return;
    c.width = this.W; c.height = this.H;
    const sw = Math.ceil(this.W / 2), sh = Math.ceil(this.H / 2); this.sim = { w: sw, h: sh };
    if (this.st) this.st.forEach((s) => { gl.deleteTexture(s.t); gl.deleteFramebuffer(s.f); });
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    this.st = [0, 1].map(() => {
      const t = this.glTex(); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, sw, sh, 0, gl.RGBA, gl.HALF_FLOAT, null);
      const f = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); return { t, f };
    });
    this.cur = 0;
  }
  glPass(pr, setU) {
    const gl = this.gl, src = this.st[this.cur], dst = this.st[1 - this.cur];
    gl.useProgram(pr.p); gl.bindFramebuffer(gl.FRAMEBUFFER, dst.f); gl.viewport(0, 0, this.sim.w, this.sim.h);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src.t); gl.uniform1i(pr.u.s, 0);
    setU(pr.u); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); this.cur = 1 - this.cur;
  }
  glFrame() {
    const gl = this.gl, W = this.W, H = this.H, P = this.gp, pan = this.pan;
    const lp = this.lastPan || { x: pan.x, y: pan.y }, sx = (pan.x - lp.x) / W, sy = -(pan.y - lp.y) / H;
    this.lastPan = { x: pan.x, y: pan.y };
    for (const d of this.drops || []) {
      const px = W / 2 + pan.x + d.x, py = H / 2 + pan.y + d.y;
      const ex = d.x2 == null ? px : W / 2 + pan.x + d.x2, ey = d.y2 == null ? py : H / 2 + pan.y + d.y2;
      this.glPass(P.drop, (u) => { gl.uniform2f(u.c, px / W, 1 - py / H); gl.uniform2f(u.c2, ex / W, 1 - ey / H); gl.uniform1f(u.rad, (d.rad || (14 + 30 * d.str)) / H); gl.uniform1f(u.str, d.amt != null ? d.amt : .05 + .45 * d.str); gl.uniform1f(u.aspect, W / H); gl.uniform1f(u.seed, Math.random() * 6.28); });
    }
    this.drops = [];
    for (let i = 0; i < 2; i++) this.glPass(P.upd, (u) => { gl.uniform2f(u.px, 1 / this.sim.w, 1 / this.sim.h); gl.uniform2f(u.shift, i ? 0 : sx, i ? 0 : sy); });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H); gl.useProgram(P.ren.p);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.scTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.cv);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.uniform1i(P.ren.u.scene, 1);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.st[this.cur].t); gl.uniform1i(P.ren.u.h, 0);
    gl.uniform2f(P.ren.u.px, 1 / this.sim.w, 1 / this.sim.h); gl.uniform1f(P.ren.u.tm, performance.now() / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  frame(now) {
    const dt = Math.min(.05, (now - this.last) / 1000); this.last = now;
    const t = now / 1000, ctx = this.cv && this.cv.getContext('2d'); if (!ctx || !this.W) return;
    this.nt += ((this.getNight() ? 1 : 0) - this.nt) * Math.min(1, dt * 2.2);
    const nt = this.nt, W = this.W, H = this.H, pan = this.pan;
    if (this.resetting > 0) {
      this.resetting -= dt; const k = Math.min(1, dt * 5);
      pan.x -= pan.x * k; pan.y -= pan.y * k;
      for (const c of this.cards) { c.x += (c.hx - c.x) * k; c.y += (c.hy - c.y) * k; }
    }
    this.layer.style.transform = `translate(${pan.x}px,${pan.y}px)`;
    this.cards.forEach((c, i) => {
      if (!c.el || !c.el.isConnected) { c.el = this.layer.querySelector(`[data-card="${i}"]`); c.inner = c.el && c.el.firstElementChild; c.ll = -1; }
      if (!c.el) return;
      c.lift += ((c.dragging ? 1 : 0) - c.lift) * Math.min(1, dt * 10);
      const f = 1 - c.lift, bob = f * Math.sin(t * 1.1 + c.ph) * 3.5, rot = f * (c.tilt + Math.sin(t * .7 + c.ph) * 1.1);
      c.el.style.transform = `translate(${c.x}px,${c.y + bob}px) translate(-50%,-50%) rotate(${rot}deg) scale(${1 + c.lift * .05})`;
      if (Math.abs(c.lift - c.ll) > .02) { c.ll = c.lift; c.inner.style.boxShadow = `0 ${10 + c.lift * 20}px ${26 + c.lift * 26}px rgba(10,40,70,${.32 - c.lift * .1})`; }
    });
    this.ripples = this.ripples.filter((r) => (now - r.t0) / 1000 < 2.4);
    const rs = this.ripples.map((r) => { const age = Math.max(0, (now - r.t0) / 1000); return { age, x: r.x, y: r.y, str: r.str, R0: 6 + (80 + 60 * r.str) * Math.pow(age, .8), fade: Math.pow(1 - age / 2.4, 1.6) }; });
    const push = (o, mass) => {
      for (const r of rs) {
        const dx = o.x - r.x, dy = o.y - r.y; if (Math.abs(dx) > r.R0 + 30 || Math.abs(dy) > r.R0 + 30) continue;
        const d = Math.hypot(dx, dy) || 1;
        if (Math.abs(d - r.R0) < 22) { const f = r.fade * r.str * 260 * dt / mass; o.vx += dx / d * f; o.vy += dy / d * f; }
      }
    };
    for (const p of this.pads) {
      if (rs.length) push(p, p.r / 22);
      p.vx += (p.ax - p.x) * .9 * dt; p.vy += (p.ay - p.y) * .9 * dt;
      p.vx *= .965; p.vy *= .965; p.x += p.vx * dt; p.y += p.vy * dt; p.a += (p.va + p.vx * .003) * dt;
    }
    for (const p of this.flowers) {
      if (rs.length) push(p, .5);
      p.vx += Math.sin(t * .2 + p.y * .003) * 2 * dt; p.vy += Math.cos(t * .17 + p.x * .003) * 2 * dt;
      p.vx *= .98; p.vy *= .98; p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
    }
    const dpr = this.dpr, SC = this.SC, ox = this.BX + this.EX, oy = this.BY + this.EY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(this.bg, (-W / 2 - pan.x + ox) * SC, (-H / 2 - pan.y + oy) * SC, W * SC, H * SC, 0, 0, W, H);
    ctx.save(); ctx.translate(W / 2 + pan.x, H / 2 + pan.y);
    const vx0 = -W / 2 - pan.x, vx1 = W / 2 - pan.x, vy0 = -H / 2 - pan.y, vy1 = H / 2 - pan.y;
    const vis = (x, y, m) => x > vx0 - m && x < vx1 + m && y > vy0 - m && y < vy1 + m;
    for (const g of this.glints) {
      if (!vis(g.x, g.y, 20)) continue;
      const a = .5 + .5 * Math.sin(t * g.sp + g.ph); if (a < .25) continue;
      ctx.fillStyle = `rgba(255,255,255,${a * .75})`; ctx.fillRect(g.x, g.y, g.w, 2.5);
    }
    if (!this.gl) for (const r of rs) this.drawRipple(ctx, r, ox, oy, SC);
    ctx.restore();
    if (nt > .01) { ctx.fillStyle = `rgba(8,18,52,${.58 * nt})`; ctx.fillRect(0, 0, W, H); }
    ctx.save(); ctx.translate(W / 2 + pan.x, H / 2 + pan.y);
    ctx.fillStyle = `rgba(${Math.round(16 - 10 * nt)},${Math.round(70 - 50 * nt)},${Math.round(110 - 70 * nt)},${.32 + .2 * nt})`;
    for (const p of this.pads) if (vis(p.x, p.y, 40)) { ctx.beginPath(); ctx.arc(p.x + 3, p.y + 5, p.r, 0, 6.283); ctx.fill(); }
    for (const p of this.pads) {
      if (!vis(p.x, p.y, 40)) continue;
      const cd = p.c[0], cn = p.c[1]; ctx.fillStyle = `rgb(${Math.round(cd[0] + (cn[0] - cd[0]) * nt)},${Math.round(cd[1] + (cn[1] - cd[1]) * nt)},${Math.round(cd[2] + (cn[2] - cd[2]) * nt)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, p.r, p.a + p.notch, p.a + 6.283 - p.notch); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = `rgba(${Math.round(255 - 25 * nt)},${Math.round(255 - 15 * nt)},255,.95)`;
    for (const f of this.flowers) {
      if (!vis(f.x, f.y, 10)) continue;
      ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.a);
      for (let i = 0; i < 5; i++) { ctx.rotate(1.2566); ctx.beginPath(); ctx.ellipse(f.s * .7, 0, f.s * .7, f.s * .28, 0, 0, 6.283); ctx.fill(); }
      ctx.restore();
    }
    ctx.restore();
    ctx.fillStyle = this.vg; ctx.fillRect(0, 0, W, H);
    if (this.gl) this.glFrame();
  }
}