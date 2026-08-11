/* ==========================================================================
   1993 A SALON COMPANY - INTERACTIVE JAVASCRIPT ENGINE
   Featuring: Card Deck Stacking, Canvas Particles, 3D Tilt, Magnetic CTAs,
   Gold Burst Physics, 2-Step Booking Modal, & Horizontal Service Slider.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------------
   * 0. LIGHT / DARK THEME SWITCHER TOGGLE
   * ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    localStorage.setItem('1993_theme', isLight ? 'light' : 'dark');

    // Update Desktop Toggle
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = isLight
        ? `<i class="fa-solid fa-moon"></i>`
        : `<i class="fa-solid fa-sun"></i>`;
    }

    // Update Mobile Toggle
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.innerHTML = isLight
        ? `<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>`
        : `<i class="fa-solid fa-sun"></i> <span>Light Mode</span>`;
    }
  }

  // Load Saved Preference
  if (localStorage.getItem('1993_theme') === 'light') {
    toggleTheme();
  }

  themeToggleBtn?.addEventListener('click', toggleTheme);
  mobileThemeToggleBtn?.addEventListener('click', toggleTheme);

  /* ------------------------------------------------------------------------
   * 1. CURSOR SPOTLIGHT & TOP SCROLL PROGRESS BAR
   * ------------------------------------------------------------------------ */
  const spotlight = document.getElementById('cursor-spotlight');
  const scrollProgress = document.getElementById('scroll-progress-overlay');

  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  });

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Header Blur & Shadow Shift on Scroll using CSS class
    const header = document.getElementById('siteHeader');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
  });



  /* ------------------------------------------------------------------------
   * 3. FLOATING LUMINOUS GOLD PARTICLE CANVAS ENGINE (Hero Section)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2.5 + 1;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity += Math.sin(Date.now() * this.pulse) * 0.01;

        if (this.y < -10 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 189, 115, ${Math.max(this.opacity, 0.1)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#F4BD73';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ------------------------------------------------------------------------
   * 4. 3D TILT HOVER MICRO-INTERACTIONS & MAGNETIC CTA BUTTONS
   * ------------------------------------------------------------------------ */
  const tiltElements = document.querySelectorAll('.tilt-element');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
      const rotateY = ((x - centerX) / centerX) * 10;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Magnetic Pull & Particle Burst on Buttons
  const magneticBtns = document.querySelectorAll('.magnetic-btn, .btn-gold');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });

    // 12-Particle Gold Click Explosion Effect
    btn.addEventListener('click', (e) => {
      const burstCount = 12;
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-particle');
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 / burstCount) * i;
        const velocity = Math.random() * 60 + 30;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;

        particle.style.left = `${clickX}px`;
        particle.style.top = `${clickY}px`;

        particle.animate([
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
        ], {
          duration: 600 + Math.random() * 200,
          easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        }).onfinish = () => particle.remove();
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 5. HERO CAROUSEL AUTO-PLAY & CONTROLS
   * ------------------------------------------------------------------------ */
  const heroSlides = document.querySelectorAll('.carousel-slide');
  const heroDotsContainer = document.getElementById('heroCarouselDots');
  let currentSlide = 0;
  let carouselInterval;

  if (heroSlides.length > 0) {
    // Generate Dots
    heroSlides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      if (heroDotsContainer) heroDotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
      heroSlides[currentSlide].classList.remove('active');
      const dots = heroDotsContainer ? heroDotsContainer.querySelectorAll('.dot') : [];
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

      currentSlide = (n + heroSlides.length) % heroSlides.length;

      heroSlides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    document.getElementById('heroPrevBtn')?.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    document.getElementById('heroNextBtn')?.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });

    function startAutoplay() {
      carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }
    function resetAutoplay() {
      clearInterval(carouselInterval);
      startAutoplay();
    }
    startAutoplay();
  }

  /* ------------------------------------------------------------------------
   * 6. STORY GALLERY SLIDESHOW
   * ------------------------------------------------------------------------ */
  const storySlides = document.querySelectorAll('.story-slide');
  const galCounter = document.getElementById('galCounter');
  let currentGal = 0;

  function updateGallery(n) {
    storySlides[currentGal].classList.remove('active');
    currentGal = (n + storySlides.length) % storySlides.length;
    storySlides[currentGal].classList.add('active');
    if (galCounter) galCounter.textContent = `${currentGal + 1} / ${storySlides.length}`;
  }

  document.getElementById('galPrevBtn')?.addEventListener('click', () => updateGallery(currentGal - 1));
  document.getElementById('galNextBtn')?.addEventListener('click', () => updateGallery(currentGal + 1));

  /* ------------------------------------------------------------------------
   * 7. BESPOKE SERVICES SNAP SLIDER & TAB FILTERING
   * ------------------------------------------------------------------------ */
  const servicesSlider = document.getElementById('servicesSlider');
  const tabBtns = document.querySelectorAll('.tab-btn');

  document.getElementById('sliderPrevBtn')?.addEventListener('click', () => {
    if (servicesSlider) servicesSlider.scrollBy({ left: -340, behavior: 'smooth' });
  });

  document.getElementById('sliderNextBtn')?.addEventListener('click', () => {
    if (servicesSlider) servicesSlider.scrollBy({ left: 340, behavior: 'smooth' });
  });

  tabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      const serviceCards = servicesSlider ? servicesSlider.querySelectorAll('.service-card') : [];

      serviceCards.forEach(card => {
        const catList = card.getAttribute('data-category') || '';
        if (category === 'all' || catList.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
   * 8. MODALS & 2-STEP ONLINE BOOKING ENGINE
   * ------------------------------------------------------------------------ */

  // Helper Functions
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  // Bind Openers
  document.querySelectorAll('#openBookingModalBtn, #heroBookBtn, #mobileBookingBtn').forEach(btn => {
    btn.addEventListener('click', () => openModal('bookingModal'));
  });

  document.querySelectorAll('.select-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = e.target.getAttribute('data-service');
      const serviceSelect = document.getElementById('bookService');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      openModal('bookingModal');
    });
  });

  document.querySelectorAll('.select-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgName = e.target.getAttribute('data-package');
      const serviceSelect = document.getElementById('bookService');
      if (serviceSelect && pkgName) {
        serviceSelect.value = pkgName;
      }
      openModal('bookingModal');
    });
  });

  document.querySelectorAll('#openEnquireModalBtn, #bannerEnquireBtn, #franchiseEnquireBtn').forEach(btn => {
    btn.addEventListener('click', () => openModal('enquireModal'));
  });

  document.querySelectorAll('#viewRateCardBtn, #heroRateCardBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      populateRateCard();
      openModal('rateCardModal');
    });
  });

  document.getElementById('openTermsBtn')?.addEventListener('click', () => openModal('termsModal'));
  document.getElementById('openPrivacyBtn')?.addEventListener('click', () => openModal('privacyModal'));

  // Bind Closers
  document.getElementById('closeBookingModal')?.addEventListener('click', () => closeModal('bookingModal'));
  document.getElementById('closeEnquireModal')?.addEventListener('click', () => closeModal('enquireModal'));
  document.getElementById('closeRateCardModal')?.addEventListener('click', () => closeModal('rateCardModal'));
  document.getElementById('closeTermsModal')?.addEventListener('click', () => closeModal('termsModal'));
  document.getElementById('closePrivacyModal')?.addEventListener('click', () => closeModal('privacyModal'));

  // Close Modal on Overlay Click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // 2-Step Booking Logic
  const step1 = document.getElementById('bookingStep1');
  const step2 = document.getElementById('bookingStep2');
  const ticketState = document.getElementById('bookingTicketState');
  const step1Circle = document.getElementById('step1Circle');
  const step2Circle = document.getElementById('step2Circle');
  const stepLine = document.getElementById('stepLine');

  document.getElementById('nextToStep2Btn')?.addEventListener('click', () => {
    step1.classList.remove('active');
    step2.classList.add('active');
    step2Circle.classList.add('active');
    stepLine.classList.add('active');
  });

  document.getElementById('backToStep1Btn')?.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
    step2Circle.classList.remove('active');
    stepLine.classList.remove('active');
  });

  document.getElementById('confirmBookingBtn')?.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const outlet = document.getElementById('bookOutlet').value;
    const service = document.getElementById('bookService').value;
    const date = document.getElementById('bookDate').value || 'Tomorrow';
    const time = document.getElementById('bookTime').value;

    if (!name || !phone) {
      alert('Please enter your Name and Mobile Number to generate the boarding ticket.');
      return;
    }

    // Populate Ticket
    document.getElementById('tClient').textContent = name;
    document.getElementById('tService').textContent = service;
    document.getElementById('tOutlet').textContent = outlet;
    document.getElementById('tDateTime').textContent = `${date} @ ${time}`;
    document.getElementById('ticketCode').textContent = `#1993-${Math.floor(10000 + Math.random() * 90000)}`;

    step2.classList.remove('active');
    ticketState.classList.add('active');
  });

  document.getElementById('closeTicketBtn')?.addEventListener('click', () => {
    closeModal('bookingModal');
    // Reset form states
    setTimeout(() => {
      ticketState.classList.remove('active');
      step1.classList.add('active');
      step2Circle.classList.remove('active');
      stepLine.classList.remove('active');
      document.getElementById('bookName').value = '';
      document.getElementById('bookPhone').value = '';
    }, 400);
  });

  /* ------------------------------------------------------------------------
   * 9. RATE CARD LIGHTBOX RENDERER
   * ------------------------------------------------------------------------ */
  function populateRateCard() {
    const rateContainer = document.getElementById('ratePageContent');
    if (!rateContainer) return;

    rateContainer.innerHTML = `
      <div style="padding: 10px;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); margin-bottom: 16px; font-size: 1.2rem;">Official Rate Card & Pricing Menu</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.9rem; color: var(--text-muted);">
          <div>
            <h5 style="color: var(--text-ivory); border-bottom: 1px solid var(--glass-border); padding-bottom: 4px; margin-bottom: 8px;">Women's Hair & Care</h5>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Style Director Cut</span> <strong>₹799</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Global Hair Color</span> <strong>₹2,499+</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Keratin Smoothening</span> <strong>₹4,999+</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Loreal Power Spa</span> <strong>₹1,499</strong></div>
          </div>
          <div>
            <h5 style="color: var(--text-ivory); border-bottom: 1px solid var(--glass-border); padding-bottom: 4px; margin-bottom: 8px;">Skin & Spa Services</h5>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>O3+ Whitening Facial</span> <strong>₹2,199</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Detox Charcoal Cleanup</span> <strong>₹1,199</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Aromatherapy Body Spa</span> <strong>₹2,499</strong></div>
            <div style="display:flex; justify-between; margin-bottom: 4px;"><span>Gel Extensions Set</span> <strong>₹1,799</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
   * 10. MOBILE NAVIGATION DRAWER TOGGLE
   * ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  mobileToggle?.addEventListener('click', () => drawer?.classList.add('open'));
  drawerClose?.addEventListener('click', () => drawer?.classList.remove('open'));
  drawerLinks.forEach(link => link.addEventListener('click', () => drawer?.classList.remove('open')));

});
