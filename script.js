document.getElementById('year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = [...document.querySelectorAll('.reveal')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

  // Observe before arming the transitions so no content is hidden when JS is unavailable.
  targets.forEach((element) => observer.observe(element));
  document.documentElement.classList.add('reveal-armed');
}
