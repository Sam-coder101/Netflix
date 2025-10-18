/* script.js - handles carousel, FAQ accordion, forms, reveals and scroll-to-top */

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


// -- Fade-in on scroll (reveal)
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


// -- FAQ accordion
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

// -- Forms (simple client-side validation + friendly message)
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


// -- Accessibility: trap focus briefly on movie container when keyboard navigating
document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies");
  if (moviesContainer) {
    // Your carousel code, keydown, auto-scroll, etc.
    moviesContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') moviesContainer.scrollBy({ left: 220, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') moviesContainer.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }
});


// script.js
const translations = {
  en: {
    // Page meta + title
    page_title: "Netflix Clone | Watch Movies & TV Shows",
    meta_description: "Watch unlimited movies, TV shows, and more on Netflix Clone.",

    // Navbar
    nav_home: "Home",
    nav_series: "Series",
    nav_movies: "Movies",
    nav_new: "New & Popular",
    nav_mylist: "My List",
    nav_browse: "Browse",
    nav_kids: "Kids",
    nav_signin: "Sign In",
    // Hero
    hero_title: "Unlimited movies, TV shows and more",
    hero_subtitle: "Starts at ₹149. Cancel anytime.",
    hero_cta: "Ready to watch? Enter your email to create or restart your membership.",
    email_label: "Email address",
    email_placeholder: "Enter your email",
    get_started_btn: "Get Started",
    watch_now_btn: "Watch Now",

    // Trending
    trending_now: "Trending Now",
    region_label: "Region",
    region_india: "India",
    region_usa: "USA",
    region_uk: "UK",
    region_canada: "Canada",
    region_australia: "Australia",
    region_global: "Global",
    type_label: "Type",
    type_tv: "TV Shows",
    type_web: "Web Series",
    type_movies: "Movies",

    // Reasons
    more_reasons: "More Reasons To Join",
    download_offline: "Download to watch offline",
    offline_desc: "Save your favourites and watch on the go.",
    watch_everywhere: "Watch everywhere",
    everywhere_desc: "Stream on phone, tablet, laptop and TV.",
    enjoy_tv: "Enjoy on your TV",
    tv_desc: "Smart TVs, PlayStation, Chromecast, Apple TV and more.",
    kids_profiles: "Create profiles for kids",
    kids_desc: "Individual spaces tailored for kids — free with membership.",

    // FAQ
    faq_title: "Frequently Asked Questions",
    faq_q1: "What is Netflix?",
    faq_a1: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more.",
    faq_q2: "How much does Netflix cost?",
    faq_a2: "Plans vary by region and may change. The demo here shows a sample starting price.",
    faq_q3: "Where can I watch?",
    faq_a3: "You can watch on any device with the Netflix app or modern browser and an internet connection.",
    faq_q4: "How do I cancel?",
    faq_a4: "Cancellations are typically handled from your account page; the demo doesn't process subscriptions.",

    // Footer
    footer_cta: "Ready to watch? Enter your email to create or restart your membership.",
    footer_email_label: "Footer email",
    footer_email_placeholder: "Enter your email",
    footer_get_started: "Get Started",
    footer_faq: "FAQ",
    footer_help: "Help Centre",
    footer_account: "Account",
    footer_media: "Media Centre",
    footer_jobs: "Jobs",
    footer_privacy: "Privacy",
    footer_contact: "Contact",
    lang_label: "Language"
  },

  hi: {
    // Page meta + title
    page_title: "Netflix क्लोन | फ़िल्में और टीवी शो देखें",
    meta_description: "Netflix क्लोन पर अनलिमिटेड फ़िल्में, टीवी शो और बहुत कुछ देखें।",

    // Navbar
    nav_home: "मुखपृष्ठ",
    nav_series: "सीरीज़",
    nav_movies: "फ़िल्में",
    nav_new: "नए और लोकप्रिय",
    nav_mylist: "मेरी सूची",
    nav_browse: "ब्राउज़ करें",
    nav_kids: "बच्चे",
    nav_signin: "साइन इन",
    // Hero
    hero_title: "अनलिमिटेड फ़िल्में, टीवी शो और बहुत कुछ",
    hero_subtitle: "₹149 से शुरू करें। कभी भी रद्द करें।",
    hero_cta: "देखने के लिए तैयार? अपना ईमेल दर्ज करें और सदस्यता शुरू करें या पुनः आरंभ करें।",
    email_label: "ईमेल पता",
    email_placeholder: "अपना ईमेल दर्ज करें",
    get_started_btn: "शुरू करें",
    watch_now_btn: "अभी देखें",

    // Trending
    trending_now: "अभी ट्रेंडिंग",
    region_label: "क्षेत्र",
    region_india: "भारत",
    region_usa: "यूएसए",
    region_uk: "यूके",
    region_canada: "कनाडा",
    region_australia: "ऑस्ट्रेलिया",
    region_global: "वैश्विक",
    type_label: "प्रकार",
    type_tv: "टीवी शो",
    type_web: "वेब सीरीज़",
    type_movies: "फ़िल्में",

    // Reasons
    more_reasons: "शामिल होने के और कारण",
    download_offline: "डाउनलोड करें और ऑफ़लाइन देखें",
    offline_desc: "अपनी पसंदीदा चीजें सहेजें और चलते-फिरते देखें।",
    watch_everywhere: "हर जगह देखें",
    everywhere_desc: "फ़ोन, टैबलेट, लैपटॉप और टीवी पर स्ट्रीम करें।",
    enjoy_tv: "अपने टीवी पर आनंद लें",
    tv_desc: "स्मार्ट टीवी, प्लेस्टेशन, क्रोमकास्ट, एप्पल टीवी और अधिक।",
    kids_profiles: "बच्चों के लिए प्रोफ़ाइल बनाएं",
    kids_desc: "बच्चों के लिए विशेष स्थान — सदस्यता के साथ मुफ्त।",

    // FAQ
    faq_title: "अक्सर पूछे जाने वाले प्रश्न",
    faq_q1: "Netflix क्या है?",
    faq_a1: "Netflix एक स्ट्रीमिंग सेवा है जो पुरस्कार विजेता टीवी शो, फ़िल्में, एनीमे, डॉक्यूमेंट्री और बहुत कुछ प्रदान करती है।",
    faq_q2: "Netflix की कीमत कितनी है?",
    faq_a2: "योजनाएँ क्षेत्र के अनुसार भिन्न होती हैं और बदल सकती हैं। यह डेमो एक नमूना प्रारंभिक मूल्य दिखाता है।",
    faq_q3: "मैं कहां देख सकता हूं?",
    faq_a3: "आप Netflix ऐप या आधुनिक ब्राउज़र और इंटरनेट कनेक्शन वाले किसी भी डिवाइस पर देख सकते हैं।",
    faq_q4: "मैं कैसे रद्द करूं?",
    faq_a4: "रद्दीकरण आमतौर पर आपके खाते के पेज से किया जा सकता है; यह डेमो सदस्यता को संसाधित नहीं करता।",

    // Footer
    footer_cta: "देखने के लिए तैयार हैं? अपना ईमेल दर्ज करें और सदस्यता शुरू करें या पुनः आरंभ करें।",
    footer_email_label: "फ़ुटर ईमेल",
    footer_email_placeholder: "अपना ईमेल दर्ज करें",
    footer_get_started: "शुरू करें",
    footer_faq: "FAQ",
    footer_help: "सहायता केंद्र",
    footer_account: "खाता",
    footer_media: "मीडिया केंद्र",
    footer_jobs: "नौकरियाँ",
    footer_privacy: "गोपनीयता",
    footer_contact: "संपर्क करें",
    lang_label: "भाषा"
  },
  bn: {
  // Page meta + title
  page_title: "নেটফ্লিক্স ক্লোন | সিনেমা ও টিভি শো দেখুন",
  meta_description: "নেটফ্লিক্স ক্লোনে সীমাহীন সিনেমা, টিভি শো এবং আরও অনেক কিছু দেখুন।",

  // Navbar
  nav_home: "হোম",
  nav_series: "সিরিজ",
  nav_movies: "সিনেমা",
  nav_new: "নতুন ও জনপ্রিয়",
  nav_mylist: "আমার তালিকা",
  nav_browse: "ব্রাউজ করুন",
  nav_kids: "শিশু",
  nav_signin: "সাইন ইন",

  // Hero
  hero_title: "সীমাহীন সিনেমা, টিভি শো এবং আরও অনেক কিছু",
  hero_subtitle: "₹১৪৯ থেকে শুরু। যেকোনো সময় বাতিল করুন।",
  hero_cta: "দেখার জন্য প্রস্তুত? আপনার ইমেইল দিন এবং সদস্যতা তৈরি বা পুনরায় শুরু করুন।",
  email_label: "ইমেইল ঠিকানা",
  email_placeholder: "আপনার ইমেইল লিখুন",
  get_started_btn: "শুরু করুন",
  watch_now_btn: "এখন দেখুন",

  // Trending
  trending_now: "এখন ট্রেন্ডিং",
  region_label: "অঞ্চল",
  region_india: "ভারত",
  region_usa: "যুক্তরাষ্ট্র",
  region_uk: "যুক্তরাজ্য",
  region_canada: "কানাডা",
  region_australia: "অস্ট্রেলিয়া",
  region_global: "গ্লোবাল",
  type_label: "ধরন",
  type_tv: "টিভি শো",
  type_web: "ওয়েব সিরিজ",
  type_movies: "সিনেমা",

  // Reasons
  more_reasons: "যোগদান করার আরও কারণ",
  download_offline: "ডাউনলোড করে অফলাইনে দেখুন",
  offline_desc: "আপনার প্রিয় জিনিসগুলো সংরক্ষণ করুন এবং যেকোনো সময় দেখুন।",
  watch_everywhere: "যেকোনো জায়গা থেকে দেখুন",
  everywhere_desc: "ফোন, ট্যাবলেট, ল্যাপটপ ও টিভিতে স্ট্রিম করুন।",
  enjoy_tv: "আপনার টিভিতে উপভোগ করুন",
  tv_desc: "স্মার্ট টিভি, প্লেস্টেশন, ক্রোমকাস্ট, অ্যাপল টিভি এবং আরও অনেক কিছু।",
  kids_profiles: "শিশুদের জন্য প্রোফাইল তৈরি করুন",
  kids_desc: "শিশুদের জন্য বিশেষ স্থান — সদস্যতার সাথে বিনামূল্যে।",

  // FAQ
  faq_title: "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",
  faq_q1: "নেটফ্লিক্স কী?",
  faq_a1: "নেটফ্লিক্স একটি স্ট্রিমিং সেবা যা বিভিন্ন পুরস্কারপ্রাপ্ত টিভি শো, সিনেমা, অ্যানিমে, ডকুমেন্টারি এবং আরও অনেক কিছু প্রদান করে।",
  faq_q2: "নেটফ্লিক্সের দাম কত?",
  faq_a2: "পরিকল্পনা অঞ্চল অনুযায়ী পরিবর্তিত হতে পারে। এই ডেমো একটি উদাহরণমূলক প্রারম্ভিক দাম দেখায়।",
  faq_q3: "আমি কোথায় দেখতে পারি?",
  faq_a3: "আপনি নেটফ্লিক্স অ্যাপ বা আধুনিক ব্রাউজারে ইন্টারনেট সংযোগ সহ যেকোনো ডিভাইসে দেখতে পারেন।",
  faq_q4: "আমি কীভাবে বাতিল করব?",
  faq_a4: "বাতিল সাধারণত আপনার অ্যাকাউন্ট পৃষ্ঠা থেকে করা যায়; এই ডেমোতে সাবস্ক্রিপশন প্রক্রিয়াকরণ হয় না।",

  // Footer
  footer_cta: "দেখতে প্রস্তুত? আপনার ইমেইল দিন এবং সদস্যতা তৈরি বা পুনরায় শুরু করুন।",
  footer_email_label: "ফুটার ইমেইল",
  footer_email_placeholder: "আপনার ইমেইল লিখুন",
  footer_get_started: "শুরু করুন",
  footer_faq: "FAQ",
  footer_help: "সহায়তা কেন্দ্র",
  footer_account: "অ্যাকাউন্ট",
  footer_media: "মিডিয়া সেন্টার",
  footer_jobs: "চাকরি",
  footer_privacy: "গোপনীয়তা",
  footer_contact: "যোগাযোগ",
  lang_label: "ভাষা"
}
};


const langSelect = document.getElementById("lang");

function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });


  const placeholders = document.querySelectorAll("[data-key-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-key-placeholder");
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

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
