/* script.js - handles carousel, FAQ accordion, forms, reveals, scroll-to-top, and search */

// DOM helper
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Set current year in footer
try {
  const yearSpan = $('#year');
  if (!yearSpan) throw new Error('#year element not found');
  yearSpan.textContent = new Date().getFullYear();
} catch (err) {
  console.warn('Year setup error:', err.message);
}

// Carousel
try {
  const moviesContainer = $('#movies');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  if (!moviesContainer) throw new Error('#movies container not found');
  if (!leftBtn) throw new Error('Left scroll button not found');
  if (!rightBtn) throw new Error('Right scroll button not found');

  leftBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: -300, behavior: 'smooth' }));
  rightBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: 300, behavior: 'smooth' }));

  let autoScrollInterval = null;
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
      const maxScroll = moviesContainer.scrollWidth - moviesContainer.clientWidth;
      moviesContainer.scrollBy({ left: 280, behavior: 'smooth' });
      if (moviesContainer.scrollLeft >= maxScroll - 10) {
        setTimeout(() => moviesContainer.scrollTo({ left: 0, behavior: 'smooth' }), 600);
      }
    }, 3000);
  }
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }
  moviesContainer.addEventListener('mouseenter', stopAutoScroll);
  moviesContainer.addEventListener('focusin', stopAutoScroll);
  moviesContainer.addEventListener('mouseleave', startAutoScroll);
  moviesContainer.addEventListener('focusout', startAutoScroll);
  startAutoScroll();

  // Keyboard navigation
  moviesContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { moviesContainer.scrollBy({ left: 220, behavior: 'smooth' }); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { moviesContainer.scrollBy({ left: -220, behavior: 'smooth' }); e.preventDefault(); }
  });
} catch (err) {
  console.warn('Carousel setup error:', err.message);
}

// Fade-in on scroll
try {
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
} catch (err) {
  console.warn('Reveal setup error:', err.message);
}

// FAQ accordion
try {
  const faqItems = $$('.faq-item');
  if (!faqItems.length) throw new Error('No FAQ items found');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) throw new Error('FAQ question or answer element missing');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

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
} catch (err) {
  console.warn('FAQ setup error:', err.message);
}

// Forms
try {
  const showToast = (msg) => {
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
    setTimeout(() => t.remove(), 2600);
  };

  const handleEmailForm = (formSelector, successMsg) => {
    const form = document.querySelector(formSelector);
    if (!form) throw new Error(`${formSelector} element not found`);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      if (!input) {
        showToast('Email input missing.');
        return;
      }
      const val = input.value.trim();
      if (!val) return showToast('Please enter an email.');
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!valid) return showToast('Please enter a valid email address.');
      showToast(successMsg || 'Thanks — we saved your email (demo).');
      input.value = '';
    });
  }

  handleEmailForm('#emailForm', 'Check your inbox — demo signup saved.');
  handleEmailForm('#footerEmail', 'Thanks! (demo)');
} catch (err) {
  console.warn('Form setup error:', err.message);
}

// Accessibility
document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies");
  if (moviesContainer) {
    moviesContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') moviesContainer.scrollBy({ left: 220, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') moviesContainer.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }
});

// Translations
const translations = { /* ... your translations object ... */ };
const langSelect = document.getElementById("lang");
function applyTranslations(lang) { /* ... your translation function ... */ }
if (langSelect) {
  langSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    applyTranslations(selectedLang);
    localStorage.setItem("lang", selectedLang);
  });
}
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  if (langSelect) langSelect.value = savedLang;
  applyTranslations(savedLang);
});

// Movie modal
const movies = [
  /* ... your movies array ... */
];

try {
  const modal = document.getElementById('movieModal');
  const closeModal = document.querySelector('.close-modal');

  if (!modal) throw new Error('#movieModal element missing');
  if (!closeModal) throw new Error('.close-modal element missing');

  closeModal.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  const movieElements = document.querySelectorAll('#movies .movie');
  movieElements.forEach((el, index) => {
    el.addEventListener('click', () => {
      const movie = movies[index];
      if (!movie) return console.warn('Movie data missing for index', index);

      try {
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalDescription').textContent = movie.description;
        document.getElementById('modalPoster').src = movie.poster;
        document.getElementById('modalYear').textContent = movie.year;
        document.getElementById('modalRating').textContent = movie.rating;
        document.getElementById('modalDuration').textContent = movie.duration;
        document.getElementById('modalQuality').textContent = movie.quality;
        document.getElementById('modalCast').textContent = movie.cast;
        document.getElementById('modalDirector').textContent = movie.director;

        const genresContainer = document.getElementById('modalGenres');
        genresContainer.innerHTML = "";
        movie.genres.forEach((g, i) => {
          const span = document.createElement('span');
          span.className = 'genre-tag';
          span.textContent = g;
          if (i !== movie.genres.length - 1) span.style.marginRight = '6px';
          genresContainer.appendChild(span);
        });

        modal.classList.add('active');
      } catch (modalErr) {
        console.warn('Error populating modal:', modalErr.message);
      }
    });
  });
} catch (err) {
  console.warn('Modal setup error:', err.message);
}

// Back to top
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// --- Search Bar Feature ---
try {
  const searchInput = document.getElementById('movieSearch');
  const moviesContainer = document.getElementById('movies');

  if (searchInput && moviesContainer) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const movieElements = moviesContainer.querySelectorAll('.movie');

      movieElements.forEach((el, idx) => {
        const title = movies[idx].title.toLowerCase();
        if (title.includes(query)) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    });
  }
} catch (err) {
  console.warn('Search setup error:', err.message);
}

(
  function() {
  const THEME_KEY = 'theme';
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');

    // keep any toggles in sync
    document.querySelectorAll('input[type="checkbox"]#themeToggle, input[type="checkbox"].theme-toggle-checkbox').forEach(cb => {
      try { cb.checked = (theme === 'light'); } catch (e) { /* ignore */ }
    });
  }

  function setTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage may be unavailable */ }
    applyTheme(theme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Determine saved or preferred theme
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    if (!saved) saved = prefersLight ? 'light' : 'dark';
    applyTheme(saved);

    // Wire up existing toggles (some pages have <input id="themeToggle">)
    const toggles = Array.from(document.querySelectorAll('input[type="checkbox"]#themeToggle, input[type="checkbox"].theme-toggle-checkbox'));
    toggles.forEach(cb => {
      // normalize: ensure a consistent class
      cb.classList.add('theme-toggle-checkbox');
      cb.addEventListener('change', () => {
        setTheme(cb.checked ? 'light' : 'dark');
      });
    });

    // If no toggle exists, inject a floating one so theme is accessible on every page
    if (toggles.length === 0) {
      const wrapper = document.createElement('div');
      wrapper.className = 'theme-toggle';
      wrapper.setAttribute('aria-hidden', 'false');
      wrapper.innerHTML = '<label class="theme-switch" title="Toggle theme"><input type="checkbox" class="theme-toggle-checkbox" aria-label="Toggle theme"><span class="slider round"></span></label>';
      // append as last child so CSS positioning works
      document.body.appendChild(wrapper);
      const injected = wrapper.querySelector('input.theme-toggle-checkbox');
      injected.checked = (saved === 'light');
      injected.addEventListener('change', () => setTheme(injected.checked ? 'light' : 'dark'));
    }
  });

}
)();
