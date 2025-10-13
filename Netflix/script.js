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

// script.js
// 1. Translations object
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
    // Hero
    hero_title: "Unlimited movies, TV shows and more",
    hero_subtitle: "Starts at ₹149. Cancel anytime.",
    email_label: "Email address",
    email_placeholder: "Enter your email",
    get_started_btn: "Get Started",
    watch_now_btn: "Watch Now",

    // Trending
    trending_now: "Trending Now",
    region_label: "Region",
    region_india: "India",
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
    // Hero
    hero_title: "अनलिमिटेड फ़िल्में, टीवी शो और बहुत कुछ",
    hero_subtitle: "₹149 से शुरू करें। कभी भी रद्द करें।",
    email_label: "ईमेल पता",
    email_placeholder: "अपना ईमेल दर्ज करें",
    get_started_btn: "शुरू करें",
    watch_now_btn: "अभी देखें",

    // Trending
    trending_now: "अभी ट्रेंडिंग",
    region_label: "क्षेत्र",
    region_india: "भारत",
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

  // Hero
  hero_title: "সীমাহীন সিনেমা, টিভি শো এবং আরও অনেক কিছু",
  hero_subtitle: "₹১৪৯ থেকে শুরু। যেকোনো সময় বাতিল করুন।",
  email_label: "ইমেইল ঠিকানা",
  email_placeholder: "আপনার ইমেইল লিখুন",
  get_started_btn: "শুরু করুন",
  watch_now_btn: "এখন দেখুন",

  // Trending
  trending_now: "এখন ট্রেন্ডিং",
  region_label: "অঞ্চল",
  region_india: "ভারত",
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

// Language dropdown
const langSelect = document.getElementById("lang");

// Apply translations
function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Handle placeholders
  const placeholders = document.querySelectorAll("[data-key-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-key-placeholder");
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

// Event listener for language change
if (langSelect) {
  langSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    applyTranslations(selectedLang);
    localStorage.setItem("lang", selectedLang);
  });
}

// Load saved language on page load
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  if (langSelect) langSelect.value = savedLang;
  applyTranslations(savedLang);
});

// End of script
