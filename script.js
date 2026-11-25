document.getElementById('year').textContent = new Date().getFullYear();

const countdown = document.querySelector('[data-countdown]');
if (countdown) {
  const target = Date.parse(countdown.dataset.countdown);
  const value = countdown.querySelector('.countdown-value');
  const pad = (number) => String(number).padStart(2, '0');
  const updateCountdown = () => {
    const remaining = Math.max(0, Math.ceil((target - Date.now()) / 1000));
    if (!remaining) {
      value.textContent = 'COUNTDOWN COMPLETE';
      countdown.setAttribute('aria-label', 'January 1, 2027 countdown complete');
      return false;
    }
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor(remaining % 86400 / 3600);
    const minutes = Math.floor(remaining % 3600 / 60);
    const seconds = remaining % 60;
    value.textContent = `${days}d  ${pad(hours)}h  ${pad(minutes)}m  ${pad(seconds)}s`;
    countdown.setAttribute('aria-label', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until January 1, 2027`);
    return true;
  };
  if (updateCountdown()) {
    const interval = setInterval(() => { if (!updateCountdown()) clearInterval(interval); }, 1000);
  }
}

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
