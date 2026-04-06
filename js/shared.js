/* shared.js — ARC Foundation */
(function () {

  /* Nav scroll */
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* Hamburger */
  const ham   = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');

  function closeMenu() {
    if (!ham || !links) return;
    ham.classList.remove('open');
    links.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (ham && links) {
    ham.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      ham.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    links.querySelectorAll('button[data-donate]').forEach(btn => btn.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });
  }

  /* Active nav link */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* Scroll reveal */
  const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('visible'));
  }

  /* Donate modal */
  const overlay = document.getElementById('donate-overlay');
  if (overlay) {
    document.querySelectorAll('[data-donate]').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
    document.querySelectorAll('.donate-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.donate-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const inp = document.getElementById('donate-amount');
        if (inp) inp.value = btn.dataset.amount;
      });
    });
    document.getElementById('donate-pay-btn')?.addEventListener('click', () => {
      const amount = document.getElementById('donate-amount')?.value;
      if (!amount || isNaN(amount) || +amount < 1) {
        alert('Please enter a valid donation amount.');
        return;
      }
      /* TODO: Replace with live Razorpay key */
      alert('Razorpay integration coming soon. Thank you for your generosity!');
    });
  }

})();
