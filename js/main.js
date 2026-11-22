document.documentElement.classList.remove('no-js');

const menu = document.querySelector('#primary-nav');
const toggle = document.querySelector('.nav-toggle');
const mobile = window.matchMedia('(max-width: 700px)');
const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];

function setMenuOpen(isOpen) {
  menu.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? 'Close' : 'Menu';
}

toggle.addEventListener('click', () => {
  setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;

  setMenuOpen(false);
  const section = link.hash ? document.getElementById(link.hash.slice(1)) : null;
  if (section) {
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  } else {
    toggle.focus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    toggle.focus();
  }
});

mobile.addEventListener('change', () => setMenuOpen(false));

function updateCurrentLink() {
  sectionLinks.forEach((link) => {
    if (link.hash === location.hash) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('hashchange', updateCurrentLink);
updateCurrentLink();
document.querySelector('#current-year').textContent = new Date().getFullYear();
