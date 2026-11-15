/* Optional enhancement: native anchors, links, and disclosure work without JS. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;

  if (!reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.section-top, .agent-feature, .project-card, .about-story, .expertise-heading, .expertise-list article, .lab-heading, .contact h2').forEach(element => {
      element.classList.add('reveal-ready');
      revealObserver.observe(element);
    });

    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('is-visible'));
        revealObserver.disconnect();
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.nav-center a'));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });

  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
})();
