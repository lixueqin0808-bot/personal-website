(function () {
  const root = document.documentElement;
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('themeToggle');
  const imageDay = document.getElementById('imageDay');
  const imageNight = document.getElementById('imageNight');
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  const setTheme = (theme) => {
    const nextTheme = theme === 'dusk' ? 'dusk' : 'day';

    root.dataset.theme = nextTheme;
    localStorage.setItem('wolfan-theme', nextTheme);
    imageDay?.classList.toggle('is-active', nextTheme === 'day');
    imageNight?.classList.toggle('is-active', nextTheme === 'dusk');
  };

  const initialTheme = localStorage.getItem('wolfan-theme') || 'day';
  setTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'day' ? 'dusk' : 'day');
  });

  const updateNav = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 24);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const updateActiveLink = () => {
    const current = sections.findLast ? sections.findLast((section) => section.offsetTop <= window.scrollY + 160) : sections.filter((section) => section.offsetTop <= window.scrollY + 160).pop();
    navLinks.forEach((link) => link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`));
  };
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in'));
  }

  document.querySelectorAll('.resume-btn').forEach((button) => {
    button.addEventListener('click', () => {
      showToast('简历 PDF 正在准备中，当前请先通过邮箱联系我。');
    });
  });

})();
