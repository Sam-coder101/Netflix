/* script.js - handles carousel, FAQ accordion, forms, reveals and scroll-to-top */

// DOM helper
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Set current year in footer
const yearSpan = $('#year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// -- Carousel controls & auto-scroll
const moviesContainer = $('#movies');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

// Safe guards (if controls missing)
if (leftBtn && moviesContainer) {
  leftBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: -300, behavior: 'smooth' }));
}
if (rightBtn && moviesContainer) {
  rightBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: 300, behavior: 'smooth' }));
}

// Auto-scroll (pauses on hover or focus)
let autoScrollInterval = null;
function startAutoScroll(){
  if (!moviesContainer) return;
  stopAutoScroll();
  autoScrollInterval = setInterval(() => {
    const maxScroll = moviesContainer.scrollWidth - moviesContainer.clientWidth;
    // scroll by 280 px
    moviesContainer.scrollBy({ left: 280, behavior: 'smooth' });
    if (moviesContainer.scrollLeft >= maxScroll - 10) {
      // loop back to start smoothly
      setTimeout(()=> moviesContainer.scrollTo({ left: 0, behavior: 'smooth' }), 600);
    }
  }, 3000);
}
function stopAutoScroll(){ if (autoScrollInterval) { clearInterval(autoScrollInterval); autoScrollInterval = null; } }

if (moviesContainer){
  moviesContainer.addEventListener('mouseenter', stopAutoScroll);
  moviesContainer.addEventListener('focusin', stopAutoScroll);
  moviesContainer.addEventListener('mouseleave', startAutoScroll);
  moviesContainer.addEventListener('focusout', startAutoScroll);
  startAutoScroll();
}

// -- Fade-in on scroll (reveal)
const revealElements = () => {
  const items = $$('.movie, .card, .faq-item, .section-title');
  const offset = window.innerHeight * 0.9;
  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= offset) el.classList.add('visible');
  });
};
window.addEventListener('load', revealElements);
window.addEventListener('scroll', revealElements);
window.addEventListener('resize', revealElements);

// -- FAQ accordion
const faqItems = $$('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close others (optional - comment out to allow multiple open)
    faqItems.forEach(i => {
      const b = i.querySelector('.faq-question');
      const a = i.querySelector('.faq-answer');
      if (b !== btn) {
        b.setAttribute('aria-expanded', 'false');
        a.hidden = true;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

// -- Forms (simple client-side validation + friendly message)
const showToast = (msg) => {
  // small ephemeral message (in-page)
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position = 'fixed';
  t.style.right = '18px';
  t.style.bottom = '92px';
  t.style.background = 'rgba(0,0,0,0.8)';
  t.style.color = '#fff';
  t.style.padding = '10px 14px';
  t.style.borderRadius = '8px';
  t.style.zIndex = 2000;
  t.style.boxShadow = '0 6px 18px rgba(0,0,0,0.6)';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 2600);
};

const handleEmailForm = (formSelector, successMsg) => {
  const form = document.querySelector(formSelector);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[name="email"]');
    const val = input && input.value.trim();
    if (!val) return showToast('Please enter an email.');
    // basic email check
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!valid) return showToast('Please enter a valid email address.');
    // Demo: show success, clear input
    showToast(successMsg || 'Thanks — we saved your email (demo).');
    input.value = '';
  });
};
handleEmailForm('#emailForm', 'Check your inbox — demo signup saved.');
handleEmailForm('#footerEmail', 'Thanks! (demo)');

// -- Scroll to top button
const scrollTopBtn = $('#scrollTopBtn');
window.addEventListener('scroll', () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) scrollTopBtn.classList.add('show');
  else scrollTopBtn.classList.remove('show');
});
if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// -- Accessibility: trap focus briefly on movie container when keyboard navigating
if (moviesContainer){
  moviesContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { moviesContainer.scrollBy({ left: 220, behavior: 'smooth' }); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { moviesContainer.scrollBy({ left: -220, behavior: 'smooth' }); e.preventDefault(); }
  });
}

// End of script
