/* script.js - handles carousel, genre filter, FAQ accordion, forms, reveals and scroll-to-top */

// DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Set current year in footer
const yearSpan = $('#year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Movie data
const movies = [
  {
    title: "Money Heist",
    description: "A criminal mastermind plans the biggest heist in history.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_.jpg",
    year: "2017",
    rating: "⭐⭐⭐⭐⭐",
    duration: "3h 10m",
    quality: "HD",
    genres: ["Action", "Crime", "Thriller"],
    cast: "Úrsula Corberó, Álvaro Morte",
    director: "Álex Pina"
  },
  {
    title: "Stranger Things 4",
    description: "The gang faces terrifying new threats in Hawkins.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjE2N2MyMzEtNmU5NS00OTI0LTlkNTMtMWM1YWYyNmU4NmY0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    year: "2022",
    rating: "⭐⭐⭐⭐",
    duration: "1h 20m",
    quality: "HD",
    genres: ["Drama", "Horror", "Mystery"],
    cast: "Millie Bobby Brown, Finn Wolfhard",
    director: "The Duffer Brothers"
  },
  {
    title: "Lucifer",
    description: "The devil becomes a consultant for the LAPD.",
    poster: "https://resizing.flixster.com/PYMILH2RwjmJ3uCZyBAEDihOIG4=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjI3OTYxMS53ZWJw",
    year: "2016",
    rating: "⭐⭐⭐⭐",
    duration: "42m per episode",
    quality: "HD",
    genres: ["Crime", "Drama", "Fantasy"],
    cast: "Tom Ellis, Lauren German",
    director: "Tom Kapinos"
  },
  {
    title: "Despicable Me 3",
    description: "Gru meets his long-lost twin brother Dru.",
    poster: "https://m.media-amazon.com/images/M/MV5BNjUyNzQ2MTg3Ml5BMl5BanBnXkFtZTgwNzE4NDM3MTI@._V1_FMjpg_UX1000_.jpg",
    year: "2017",
    rating: "⭐⭐⭐",
    duration: "1h 30m",
    quality: "HD",
    genres: ["Animation", "Comedy", "Family"],
    cast: "Steve Carell, Kristen Wiig",
    director: "Pierre Coffin"
  },
  {
    title: "Fast X",
    description: "Dominic Toretto and his family face their toughest challenge yet.",
    poster: "https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg",
    year: "2023",
    rating: "⭐⭐⭐⭐",
    duration: "2h 45m",
    quality: "HD",
    genres: ["Action", "Adventure", "Thriller"],
    cast: "Vin Diesel, Michelle Rodriguez",
    director: "Louis Leterrier"
  }
];

// Render movies function
const moviesContainer = $('#movies');
const renderMovies = (movieList) => {
  if (!moviesContainer) return;
  moviesContainer.innerHTML = '';
  movieList.forEach((movie, index) => {
    const div = document.createElement('div');
    div.className = 'movie';
    div.setAttribute('tabindex', '0');
    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>${movie.title}</h3>
      <p>${movie.rating} | ${movie.year}</p>
    `;
    div.addEventListener('click', () => openModal(index));
    moviesContainer.appendChild(div);
  });
};
renderMovies(movies);

// Genre filter
const genreButtons = $$('#genre-filters button');
genreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    genreButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const genre = btn.dataset.genre;
    const filtered = genre === 'All' ? movies : movies.filter(m => m.genres.includes(genre));
    renderMovies(filtered);
  });
});

// Movie Modal
const modal = $('#movieModal');
const closeModalBtn = modal?.querySelector('.close-modal');

function openModal(index) {
  const movie = movies[index];
  if (!movie || !modal) return;

  $('#modalTitle').textContent = movie.title;
  $('#modalDescription').textContent = movie.description;
  $('#modalPoster').src = movie.poster;
  $('#modalYear').textContent = movie.year;
  $('#modalRating').textContent = movie.rating;
  $('#modalDuration').textContent = movie.duration;
  $('#modalQuality').textContent = movie.quality;
  $('#modalCast').textContent = movie.cast;
  $('#modalDirector').textContent = movie.director;

  const genresContainer = $('#modalGenres');
  genresContainer.innerHTML = '';
  movie.genres.forEach((g, i) => {
    const span = document.createElement('span');
    span.className = 'genre-tag';
    span.textContent = g;
    if (i !== movie.genres.length - 1) span.style.marginRight = '6px';
    genresContainer.appendChild(span);
  });

  modal.classList.add('active');
}

closeModalBtn?.addEventListener('click', () => modal.classList.remove('active'));
modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

// Carousel
try {
  const leftBtn = $('.scroll-btn.left');
  const rightBtn = $('.scroll-btn.right');
  if (leftBtn && rightBtn && moviesContainer) {
    leftBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: -300, behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => moviesContainer.scrollBy({ left: 300, behavior: 'smooth' }));

    let autoScrollInterval;
    const startAutoScroll = () => {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        const maxScroll = moviesContainer.scrollWidth - moviesContainer.clientWidth;
        moviesContainer.scrollBy({ left: 280, behavior: 'smooth' });
        if (moviesContainer.scrollLeft >= maxScroll - 10) {
          setTimeout(() => moviesContainer.scrollTo({ left: 0, behavior: 'smooth' }), 600);
        }
      }, 3000);
    };
    const stopAutoScroll = () => clearInterval(autoScrollInterval);

    moviesContainer.addEventListener('mouseenter', stopAutoScroll);
    moviesContainer.addEventListener('mouseleave', startAutoScroll);
    startAutoScroll();
  }
} catch (err) { console.warn('Carousel error:', err.message); }

// FAQ accordion
$$('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    $$('.faq-item').forEach(i => {
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-answer').hidden = true;
    });
    btn.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

// Form validation + toast
const showToast = msg => {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; right: 18px; bottom: 92px;
    background: rgba(0,0,0,0.8); color: #fff;
    padding: 10px 14px; border-radius: 8px;
    z-index: 2000; box-shadow: 0 6px 18px rgba(0,0,0,0.6);
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
};

['#emailForm','#footerEmail'].forEach(sel => {
  const form = $(sel);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[name="email"]');
    if (!input) return showToast('Email input missing.');
    const val = input.value.trim();
    if (!val) return showToast('Please enter an email.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return showToast('Please enter a valid email.');
    showToast('Thanks — demo saved.');
    input.value = '';
  });
});

// Scroll to top button
const scrollTopBtn = $('#scrollTopBtn');
window.addEventListener('scroll', () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.classList.toggle('show', window.scrollY > 300);
});
scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Fade-in reveal
const revealElements = () => {
  $$('.movie, .card, .faq-item, .section-title').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) el.classList.add('visible');
  });
};
['load','scroll','resize'].forEach(ev => window.addEventListener(ev, revealElements));

// Language translations
const langSelect = $('#lang');
const translations = { /* translation object here */ };
const applyTranslations = lang => {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.dataset.keyPlaceholder;
    if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
  });
};
if (langSelect) {
  langSelect.addEventListener('change', e => {
    const lang = e.target.value;
    applyTranslations(lang);
    localStorage.setItem('lang', lang);
  });
  window.addEventListener('load', () => {
    const saved = localStorage.getItem('lang') || 'en';
    langSelect.value = saved;
    applyTranslations(saved);
  });
}
