(function () {
  const root = document.documentElement;
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('themeToggle');
  const imageDay = document.getElementById('imageDay');
  const imageNight = document.getElementById('imageNight');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setTheme = (theme) => {
    const nextTheme = theme === 'dusk' ? 'dusk' : 'day';
    root.dataset.theme = nextTheme;
    localStorage.setItem('wolfan-theme', nextTheme);
    imageDay?.classList.toggle('is-active', nextTheme === 'day');
    imageNight?.classList.toggle('is-active', nextTheme === 'dusk');
    themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'dusk'));
    themeToggle?.setAttribute('aria-label', nextTheme === 'dusk' ? '切换到日间模式' : '切换到夜间模式');
  };

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'day';
  setTheme(localStorage.getItem('wolfan-theme') || systemTheme);
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'day' ? 'dusk' : 'day'));

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const updateOnScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 24);
    const visible = sections.filter((section) => section.offsetTop <= window.scrollY + 180).pop();
    navLinks.forEach((link) => link.classList.toggle('active', Boolean(visible) && link.hash === `#${visible.id}`));
  };

  updateOnScroll();
  window.addEventListener('scroll', updateOnScroll, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('in'));
  } else {
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    const revealAll = () => reveals.forEach((element) => element.classList.add('in'));
    const revealWhenVisible = () => {
      if (document.visibilityState !== 'visible') return;
      revealAll();
      document.removeEventListener('visibilitychange', revealWhenVisible);
    };

    reveals.forEach((element) => observer.observe(element));
    window.setTimeout(revealAll, 8000);
    document.addEventListener('visibilitychange', revealWhenVisible);
  }
})();
