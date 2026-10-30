(function () {
  if (window.__wcCursor || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  window.__wcCursor = true;
  const sh = '%3Cfilter id="s" x="-50%25" y="-50%25" width="200%25" height="200%25"%3E%3CfeDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity=".25"/%3E%3C/filter%3E';
  const arrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='24' viewBox='0 0 22 24'%3E${sh.replace(/"/g, "'")}%3Cpath filter='url(%23s)' d='M8.76 19.39 5.93 5.15c-.08-.42.37-.75.74-.53l12.57 7.16c.39.22.31.81-.13.92l-5.85 1.44a.5.5 0 0 0-.3.22l-3.29 5.2c-.24.39-.82.28-.91-.17Z' fill='%231C2B48' stroke='white'/%3E%3C/svg%3E") 6 5, auto`;
  const ibeam = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='24' viewBox='0 0 22 24'%3E${sh.replace(/"/g, "'")}%3Cpath filter='url(%23s)' d='M7 3.5h3a1.5 1.5 0 0 1 1 .4 1.5 1.5 0 0 1 1-.4h3v2.2h-2.4v12.6H15v2.2h-3a1.5 1.5 0 0 1-1-.4 1.5 1.5 0 0 1-1 .4H7v-2.2h2.4V5.7H7Z' fill='%231C2B48' stroke='white' stroke-linejoin='round'/%3E%3C/svg%3E") 11 12, text`;
  const link = arrow.replace('%231C2B48', '%23358BC9').replace(', auto', ', pointer');
  const L = ':is(a[href],button,[role=button],[role=tab],summary,select,label[for],[onclick],[style*="cursor: pointer"],[style*="cursor:pointer"],.heroHot,.heroWaterHit,.heroDive)';
  const T = ':where(p,h1,h2,h3,h4,h5,h6,li,span,em,strong,b,i,small,blockquote,figcaption,label,td,th,dd,dt,pre,code)';
  const st = document.createElement('style');
  st.textContent = `html,body{cursor:${arrow}}${T}{cursor:${ibeam}}:where(input:not([type=button],[type=submit],[type=checkbox],[type=radio],[type=range]),textarea,[contenteditable]){cursor:${ibeam}}:where(a,button,[role=button],[role=tab],summary,select) ${T}{cursor:inherit}:where([data-pid],[data-cursor-comment]),:where([data-pid],[data-cursor-comment]) *{cursor:${arrow}}${L},${L} *{cursor:${link}!important}[data-pid][data-pid],[data-pid][data-pid] *,[data-cursor-comment][data-cursor-comment],[data-cursor-comment][data-cursor-comment] *{cursor:${arrow}!important}::selection{background:#E4EFF8;color:#358BC9}[data-sel=day] ::selection{background:#C9DDF0;color:#1F5F96}`;
  document.head.appendChild(st);

  const INFO = {
    'Loop': ['Product Designer', '1 PM, 1 APM, 1 TPM, 3 devs, 2 designers, 2 PMMs', 'Figma, Notion, Claude Code'],
    'BeeWitched': ['Programmer + Artist', '5 developers, 3 designers', 'LibGDX, Java, Figma'],
    'CornellGO': ['Product Designer', '1 PM, 1 APM, 1 TPM, 4 devs, 2 designers, 1 PMM', 'Figma'],
    'creator-cuts': ['UI/UX Designer', 'Solo', 'Figma'],
    'oh-my-camel': ['Developer & Artist', '4 developers', 'OCaml, Raylib, Medibang Paint Pro'],
    'quack-a-goose': ['Developer & Artist', '2 developers', 'Java, Medibang Paint Pro'],
    'FamJam': ['Designer', '4 designers', 'Figma'],
    'darn': ['Designer Intern', '1 PM, 1 TPM, 2 developers, 3 designers', 'Figma, WordPress, UiChemy, Claude Code']
  };

  const SPRING = 'cubic-bezier(.34,1.45,.64,1)';
  const b = document.createElement('div');
  b.setAttribute('aria-hidden', 'true');
  Object.assign(b.style, { position: 'fixed', left: '0', top: '0', zIndex: '2147483647', pointerEvents: 'none', willChange: 'transform' });
  const card = document.createElement('div');
  Object.assign(card.style, {
    maxWidth: '290px', width: 'max-content', padding: '12px 16px', borderRadius: '4px 16px 16px 16px',
    background: '#2E90FA', border: '2px solid #1570EF', boxShadow: '4px 4px 10px rgba(247,209,88,.16)',
    font: "400 14px/1.35 'Nunito', sans-serif", color: '#fff',
    opacity: '0', scale: '.35', transformOrigin: '0 0',
    transition: `opacity .18s ease, scale .42s ${SPRING}, border-radius .3s ease`
  });
  b.appendChild(card);
  const row = (k, v, n) => `<div data-r style="display:contents"><span style="text-transform:uppercase;letter-spacing:.08em;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.78);padding-top:2px;opacity:0;translate:0 6px;transition:opacity .3s ease ${n * 60 + 90}ms, translate .4s ${SPRING} ${n * 60 + 90}ms">${k}</span><span style="opacity:0;translate:0 6px;transition:opacity .3s ease ${n * 60 + 120}ms, translate .4s ${SPRING} ${n * 60 + 120}ms;text-wrap:pretty">${v}</span></div>`;
  const fill = (el) => {
    const t = el.getAttribute('data-cursor-comment');
    const d = !t && INFO[(el.getAttribute('data-pid') || '').trim()];
    card.innerHTML = d
      ? `<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 14px">${row('Role', d[0], 0)}${row('Team', d[1], 1)}${row('Tools', d[2], 2)}</div>`
      : `<div style="font-weight:600;white-space:nowrap;opacity:0;translate:0 6px;transition:opacity .3s ease 80ms, translate .4s ${SPRING} 80ms" data-v>${t || 'View project'}</div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => card.querySelectorAll('span,[data-v]').forEach(s => { s.style.opacity = '1'; s.style.translate = '0 0'; })));
  };
  let cur = null, x = 0, y = 0, bx = 0, by = 0, raf = 0;
  const tick = () => {
    const w = card.offsetWidth, h = card.offsetHeight, pad = 18;
    let tx = x + pad, ty = y + pad, fx = false, fy = false;
    if (tx + w > innerWidth - 12) { tx = x - w - pad + 6; fx = true; }
    if (ty + h > innerHeight - 12) { ty = y - h - pad + 6; fy = true; }
    card.style.transformOrigin = `${fx ? '100%' : '0'} ${fy ? '100%' : '0'}`;
    card.style.borderRadius = `${!fx && !fy ? 4 : 16}px ${fx && !fy ? 4 : 16}px ${fx && fy ? 4 : 16}px ${!fx && fy ? 4 : 16}px`;
    bx += (tx - bx) * .24; by += (ty - by) * .24;
    b.style.transform = `translate(${bx}px, ${by}px)`;
    raf = (Math.abs(tx - bx) + Math.abs(ty - by) > .3 || cur) ? requestAnimationFrame(tick) : 0;
  };
  const show = (el) => {
    if (el === cur) return;
    const was = cur; cur = el;
    if (el) {
      if (!b.isConnected) document.body.appendChild(b);
      if (!was) { bx = x + 18; by = y + 18; }
      fill(el);
      card.style.opacity = '1'; card.style.scale = '1';
      if (!raf) raf = requestAnimationFrame(tick);
    } else { card.style.opacity = '0'; card.style.scale = '.35'; }
  };
  const loading = () => document.querySelector('.fishIntro, .pond-loader:not(.is-done)');
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    if (loading()) { show(null); return; }
    show(e.target.closest ? e.target.closest('[data-pid],[data-cursor-comment]') : null);
    if (cur && !raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  addEventListener('scroll', () => { if (cur && !document.elementFromPoint(x, y)?.closest('[data-pid],[data-cursor-comment]')) show(null); }, { passive: true });
  document.addEventListener('pointerleave', () => show(null));
})();