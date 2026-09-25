/* ==========================================================================
   ADISIL — script.js
   Organized into: Data, Mobile Navigation, Scroll Effects, Categories,
   Food Filtering, Reviews Carousel, Offer Code, Contact Validation,
   WhatsApp Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     DATA
     ------------------------------------------------------------------ */
  const categories = [
    { name: 'South Indian', icon: '🥥' },
    { name: 'Biryani', icon: '🍛' },
    { name: 'North Indian', icon: '🫓' },
    { name: 'Chinese', icon: '🥢' },
    { name: 'Snacks', icon: '🥟' },
    { name: 'Desserts', icon: '🍮' },
    { name: 'Beverages', icon: '🥤' },
  ];

  const foodItems = [
    {
      id: 'biryani',
      name: 'Chicken Biryani',
      category: 'Biryani',
      desc: 'Slow-cooked basmati rice layered with spiced chicken and fried onions.',
      rating: 4.9,
      price: '₹249',
      image: 'assets/images/biriyani.jpeg',
    },
    {
      id: 'dosa',
      name: 'Masala Dosa',
      category: 'South Indian',
      desc: 'Crisp fermented rice crepe filled with spiced potato masala.',
      rating: 4.8,
      price: '₹129',
      image: 'assets/images/dosa.jpg',
    },
    {
      id: 'paneer',
      name: 'Paneer Butter Masala',
      category: 'North Indian',
      desc: 'Soft paneer cubes simmered in a rich tomato and butter gravy.',
      rating: 4.7,
      price: '₹219',
      image: 'assets/images/paneer.jpg',
    },
    {
      id: 'chicken65',
      name: 'Chicken 65',
      category: 'Snacks',
      desc: 'Deep-fried curry-leaf chicken bites with a fiery, tangy finish.',
      rating: 4.8,
      price: '₹189',
      image: 'assets/images/chicken-65.jpg',
    },
    {
      id: 'noodles',
      name: 'Veg Noodles',
      category: 'Chinese',
      desc: 'Wok-tossed noodles with crunchy vegetables and soy-garlic sauce.',
      rating: 4.5,
      price: '₹159',
      image: 'assets/images/noodles.jpeg',
    },
    {
      id: 'burger',
      name: 'Classic Burger',
      category: 'Snacks',
      desc: 'Grilled patty, melted cheese and house sauce in a toasted bun.',
      rating: 4.4,
      price: '₹179',
      image: 'assets/images/burger.jpg',
    },
    {
      id: 'meals',
      name: 'South Indian Meals',
      category: 'South Indian',
      desc: 'A full thali with sambar, rasam, poriyal, curd and papad.',
      rating: 4.9,
      price: '₹199',
      image: 'assets/images/south-meal.jpg',
    },
    {
      id: 'gulabjamun',
      name: 'Gulab Jamun',
      category: 'Desserts',
      desc: 'Warm milk-solid dumplings soaked in cardamom-scented syrup.',
      rating: 4.9,
      price: '₹89',
      image: 'assets/images/dessert.jpg',
    },
    {
      id: 'filter-coffee',
      name: 'Madras Filter Coffee',
      category: 'Beverages',
      desc: 'Authentic South Indian chicory-infused coffee, frothed in a traditional brass davara.',
      rating: 4.9,
      price: '₹49',
      image: 'assets/images/filter-coffee.jpg',
    },
    {
      id: 'mango-lassi',
      name: 'Fresh Mango Lassi',
      category: 'Beverages',
      desc: 'Chilled creamy yogurt drink blended with fresh Alphonso mango pulp & saffron.',
      rating: 4.8,
      price: '₹79',
      image: 'assets/images/mango-lassi.jpg',
    },
  ];

  const reviews = [
    {
      name: 'Ananya Krishnan',
      role: 'Coimbatore',
      rating: 5,
      quote: 'Absolutely loved the biryani. The flavours were authentic and the presentation was beautiful.',
    },
    {
      name: 'Rahul Menon',
      role: 'Chennai',
      rating: 5,
      quote: 'The masala dosa tastes just like my grandmother used to make. Fast delivery too.',
    },
    {
      name: 'Priya Suresh',
      role: 'Bengaluru',
      rating: 4,
      quote: 'Great variety on the menu and everything arrived hot. The paneer butter masala is a favourite.',
    },
    {
      name: 'Karthik Iyer',
      role: 'Madurai',
      rating: 5,
      quote: 'ADISIL nails the balance between traditional taste and modern presentation. Highly recommend.',
    },
    {
      name: 'Divya Raghavan',
      role: 'Coimbatore',
      rating: 5,
      quote: 'Ordered for a family gathering and everyone asked where the food was from. Will order again.',
    },
  ];

  /* ------------------------------------------------------------------
     MOBILE NAVIGATION
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primaryMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleMenu);

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ------------------------------------------------------------------
     SCROLL EFFECTS (header shadow, active nav link, reveal animations)
     ------------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('active-link', link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  const revealTargets = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     FOOD CATEGORIES (renders cards, drives the menu filter)
     ------------------------------------------------------------------ */
  const categoryGrid = document.getElementById('categoryGrid');

  function renderCategories() {
    categoryGrid.innerHTML = categories
      .map(
        (cat) => `
        <button class="category-card" type="button" data-category="${cat.name}">
          <span class="category-icon" aria-hidden="true">${cat.icon}</span>
          <span class="category-name">${cat.name}</span>
          <span class="category-sub">Explore dishes</span>
        </button>`
      )
      .join('');
  }
  renderCategories();

  categoryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.category-card');
    if (!card) return;
    const category = card.dataset.category;
    setActiveFilter(category);
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------
     FOOD FILTERING
     ------------------------------------------------------------------ */
  const foodGrid = document.getElementById('foodGrid');
  const filterBar = document.getElementById('filterBar');
  const filterOptions = ['All', ...categories.map((c) => c.name)];
  let activeFilter = 'All';

  function renderFoodCards() {
    foodGrid.innerHTML = foodItems
      .map(
        (item) => `
        <article class="food-card" data-category="${item.category}">
          <div class="food-media">
            <img src="${item.image}" alt="${item.name} — ${item.desc}" loading="lazy" width="400" height="300" />
            <span class="food-tag">${item.category}</span>
          </div>
          <div class="food-body">
            <div class="food-top-row">
              <h3 class="food-name">${item.name}</h3>
              <span class="food-rating">★ ${item.rating.toFixed(1)}</span>
            </div>
            <p class="food-desc">${item.desc}</p>
            <div class="food-bottom-row">
              <span class="food-price">${item.price}</span>
              <button class="food-add-btn" type="button" data-food="${item.id}">Add to cart</button>
            </div>
          </div>
        </article>`
      )
      .join('');
  }

  function renderFilterBar() {
    filterBar.innerHTML = filterOptions
      .map(
        (name) => `
        <button class="filter-btn" type="button" data-filter="${name}" aria-pressed="${name === activeFilter}">
          ${name}
        </button>`
      )
      .join('');
  }

  function setActiveFilter(category) {
    activeFilter = category;
    renderFilterBar();
    applyFilter();
  }

  function applyFilter() {
    const cards = foodGrid.querySelectorAll('.food-card');
    cards.forEach((card) => {
      const matches = activeFilter === 'All' || card.dataset.category === activeFilter;
      card.classList.toggle('is-hidden', !matches);
    });
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    setActiveFilter(btn.dataset.filter);
  });

  foodGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.food-add-btn');
    if (!btn) return;
    btn.textContent = 'Added ✓';
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.textContent = 'Add to cart';
      btn.classList.remove('is-added');
    }, 1600);
  });

  renderFoodCards();
  renderFilterBar();
  applyFilter();

  // Footer "Categories" links jump to the menu and pre-filter it.
  document.querySelectorAll('[data-footer-filter]').forEach((link) => {
    link.addEventListener('click', () => {
      setActiveFilter(link.dataset.footerFilter);
    });
  });

  /* ------------------------------------------------------------------
     CUSTOMER REVIEWS CAROUSEL
     ------------------------------------------------------------------ */
  const reviewTrack = document.getElementById('reviewTrack');
  const reviewDots = document.getElementById('reviewDots');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  let currentReview = 0;
  let autoSlideTimer = null;

  function initials(name) {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function renderReviews() {
    reviewTrack.innerHTML = reviews
      .map(
        (r) => `
        <li class="review-slide">
          <div class="review-card">
            <p class="review-stars" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
            <p class="review-quote">&ldquo;${r.quote}&rdquo;</p>
            <div class="review-author">
              <span class="review-avatar" aria-hidden="true">${initials(r.name)}</span>
              <span>
                <span class="review-author-name">${r.name}</span>
                <span class="review-author-role">${r.role}</span>
              </span>
            </div>
          </div>
        </li>`
      )
      .join('');

    reviewDots.innerHTML = reviews
      .map(
        (_, i) => `<button class="carousel-dot" type="button" role="tab" aria-selected="${i === 0}" aria-label="Show review ${i + 1}" data-index="${i}"></button>`
      )
      .join('');
  }

  function goToReview(index) {
    currentReview = (index + reviews.length) % reviews.length;
    reviewTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    reviewDots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.setAttribute('aria-selected', String(i === currentReview));
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => goToReview(currentReview + 1), 6000);
  }
  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  renderReviews();
  goToReview(0);
  startAutoSlide();

  prevBtn.addEventListener('click', () => { goToReview(currentReview - 1); startAutoSlide(); });
  nextBtn.addEventListener('click', () => { goToReview(currentReview + 1); startAutoSlide(); });

  reviewDots.addEventListener('click', (e) => {
    const dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    goToReview(Number(dot.dataset.index));
    startAutoSlide();
  });

  const reviewSection = document.querySelector('.reviews');
  reviewSection.addEventListener('mouseenter', stopAutoSlide);
  reviewSection.addEventListener('mouseleave', startAutoSlide);

  /* ------------------------------------------------------------------
     OFFER CODE COPY
     ------------------------------------------------------------------ */
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const promoCode = document.getElementById('promoCode');
  const copyFeedback = document.getElementById('copyFeedback');

  copyCodeBtn.addEventListener('click', async () => {
    const code = promoCode.textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const temp = document.createElement('textarea');
        temp.value = code;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      copyFeedback.textContent = 'Copied!';
    } catch (err) {
      copyFeedback.textContent = 'Copy this manually: ' + code;
    }
    copyFeedback.classList.add('is-visible');
    setTimeout(() => copyFeedback.classList.remove('is-visible'), 2200);
  });

  /* ------------------------------------------------------------------
     CONTACT FORM VALIDATION + WHATSAPP INTEGRATION
     ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  const formNote = document.getElementById('formNote');
  const whatsappSubmit = document.getElementById('whatsappSubmit');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;

  function setFieldError(input, message) {
    const row = input.closest('.form-row');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (message) {
      row.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      row.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    let isValid = true;

    if (!fullNameInput.value.trim()) {
      setFieldError(fullNameInput, 'Please enter your name.');
      isValid = false;
    } else {
      setFieldError(fullNameInput, '');
    }

    if (!emailInput.value.trim()) {
      setFieldError(emailInput, 'Please enter your email.');
      isValid = false;
    } else if (!EMAIL_RE.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldError(emailInput, '');
    }

    if (phoneInput.value.trim() && !PHONE_RE.test(phoneInput.value.trim())) {
      setFieldError(phoneInput, 'Please enter a valid phone number.');
      isValid = false;
    } else {
      setFieldError(phoneInput, '');
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, 'Please enter a message.');
      isValid = false;
    } else {
      setFieldError(messageInput, '');
    }

    return isValid;
  }

  function buildMessageText() {
    const name = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim() || 'Not provided';
    const message = messageInput.value.trim();

    return `Hello ADISIL,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      formNote.textContent = 'Please fix the highlighted fields before sending.';
      return;
    }

    const subject = encodeURIComponent(`New message from ${fullNameInput.value.trim()}`);
    const body = encodeURIComponent(buildMessageText());
    window.location.href = `mailto:adisilfoodshop@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email app…';
  });

  whatsappSubmit.addEventListener('click', () => {
    if (!validateForm()) {
      formNote.textContent = 'Please fix the highlighted fields before sending.';
      return;
    }

    // Demo WhatsApp business number — replace with a real number in E.164 format.
    const whatsappNumber = '916380606707';
    const text = encodeURIComponent(buildMessageText());
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener');
    formNote.textContent = 'Opening WhatsApp…';
  });

  [fullNameInput, emailInput, phoneInput, messageInput].forEach((input) => {
    input.addEventListener('blur', validateForm);
  });

  /* ------------------------------------------------------------------
     MISC
     ------------------------------------------------------------------ */
  document.getElementById('currentYear').textContent = new Date().getFullYear();

});
