/* index.js — counter animation */
const counters = document.querySelectorAll('[data-target]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / 1800, 1);
      const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = target >= 10000 ? Math.round(v / 1000) + 'k' : v;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target >= 10000 ? Math.round(target / 1000) + 'k' : target;
    };
    requestAnimationFrame(tick);
    io.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => io.observe(c));
