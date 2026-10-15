// Navigation: keyboard accessible, with clear expanded and current states.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');

function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

if ('IntersectionObserver' in window) {
  const navAnchors = [...navigation.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navAnchors.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

// All projects remain readable without JavaScript; filters appear when ready.
const filters = document.querySelector('.project-filters');
const labProjects = [...document.querySelectorAll('.lab-project')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  const selected = button.dataset.filter;
  filters.querySelectorAll('button').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  labProjects.forEach(project => {
    project.hidden = selected !== 'all' && !project.dataset.category.split(' ').includes(selected);
    if (!project.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `${visible} projects shown for ${button.textContent}.`;
});

// Preserve the existing Formspree endpoint and native form fallback.
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton.disabled || !contactForm.reportValidity()) return;
  const label = submitButton.querySelector('span');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  submitButton.disabled = true;
  label.textContent = 'Sending…';
  contactForm.setAttribute('aria-busy', 'true');
  formStatus.dataset.state = 'pending';
  formStatus.textContent = 'Sending your message…';
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Message delivery failed');
    formStatus.dataset.state = 'success';
    formStatus.textContent = 'Thank you! Your message has been sent. I look forward to connecting.';
    contactForm.reset();
  } catch {
    formStatus.dataset.state = 'error';
    formStatus.textContent = 'Your message could not be sent. Please try again, or email srushtighatge25@gmail.com. Your draft is still here.';
  } finally {
    clearTimeout(timeout);
    submitButton.disabled = false;
    label.textContent = 'Send message';
    contactForm.removeAttribute('aria-busy');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
