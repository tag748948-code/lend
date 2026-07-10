(() => {
  'use strict';

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    accordion.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      const current = button.closest('.faq-item');
      accordion.querySelectorAll('.faq-item').forEach((item) => {
        const itemButton = item.querySelector('button');
        const shouldOpen = item === current ? !item.classList.contains('is-open') : false;
        item.classList.toggle('is-open', shouldOpen);
        itemButton.setAttribute('aria-expanded', String(shouldOpen));
      });
    });
  }

  const form = document.querySelector('#reviewForm');
  const status = document.querySelector('#formStatus');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const linkedSelects = [...document.querySelectorAll('[form="reviewForm"]')];
      const controls = [...form.elements, ...linkedSelects];
      const invalid = controls.find((control) => control.required && !control.checkValidity());
      if (invalid) {
        invalid.focus();
        if (status) status.textContent = 'Please complete all required fields.';
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Submitting…';
      if (status) status.textContent = 'Your information is being prepared.';
      window.setTimeout(() => {
        window.location.assign('thank-you.html');
      }, 450);
    });
  }
})();
