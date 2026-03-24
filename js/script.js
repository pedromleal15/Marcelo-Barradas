/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== MOBILE NAV TOGGLE =====
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== HERO ENTRANCE ANIMATIONS =====
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    setTimeout(() => heroVideo.classList.add('animate'), 100);
  }
  const heroAnims = document.querySelectorAll('.hero-anim');
  setTimeout(() => {
    heroAnims.forEach(el => el.classList.add('visible'));
  }, 300);

  // ===== INTERSECTION OBSERVER - FADE IN =====
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // Check for elements already in viewport on load
  requestAnimationFrame(() => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
        fadeObserver.unobserve(el);
      }
    });
  });

  // ===== COUNTUP ANIMATION =====
  const countups = document.querySelectorAll('.countup');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCount(el, target);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countups.forEach(el => countObserver.observe(el));

  function animateCount(el, target) {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ===== TESTIMONIAL CAROUSEL =====
  const testimonials = [
    {
      quote: 'Com o acompanhamento do Dr. Marcelo, consegui equilibrar meus hormônios e recuperar a energia que havia perdido. O protocolo foi totalmente personalizado e os resultados apareceram já nos primeiros meses.',
      name: 'Renata Oliveira',
      role: 'Empresária'
    },
    {
      quote: 'Depois de anos tentando melhorar minha performance sem resultados, o Dr. Marcelo criou um protocolo que transformou completamente meu desempenho físico e mental.',
      name: 'Carlos Mendes',
      role: 'Atleta'
    },
    {
      quote: 'Como médica, sou criteriosa na escolha de profissionais de saúde. O Dr. Marcelo se destaca pela abordagem científica e personalizada. Os resultados falam por si.',
      name: 'Juliana Costa',
      role: 'Médica'
    },
    {
      quote: 'O Dr. Marcelo mudou minha visão sobre saúde masculina. Seu protocolo integrado trouxe resultados que eu não conseguia com outros profissionais.',
      name: 'André Silva',
      role: 'Engenheiro'
    }
  ];

  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const avatars = document.querySelectorAll('.testimonial-avatar');

  avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
      const idx = parseInt(avatar.dataset.index);
      avatars.forEach(a => a.classList.remove('active'));
      avatar.classList.add('active');
      // Fade out quote and author
      quoteEl.style.opacity = '0';
      authorEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = testimonials[idx].quote;
        authorEl.textContent = testimonials[idx].name + ', ' + testimonials[idx].role;
        quoteEl.style.opacity = '1';
        authorEl.style.opacity = '1';
      }, 300);
    });
  });

  // ===== ABOUT SECTION - SCROLL-BASED IMAGE TRANSITIONS =====
  const aboutBlocks = document.querySelectorAll('.about-block');
  const imgA = document.querySelector('.about-images .img-a');
  const imgB = document.querySelector('.about-images .img-b');
  const imgC = document.querySelector('.about-images .img-c');

  if (aboutBlocks.length && imgA && imgB && imgC) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgType = entry.target.dataset.img;
          // Reset all hidden
          imgA.classList.add('hidden');
          imgB.classList.add('hidden');
          imgC.classList.add('hidden');
          // Show active
          if (imgType === 'a') imgA.classList.remove('hidden');
          else if (imgType === 'b') imgB.classList.remove('hidden');
          else if (imgType === 'c') imgC.classList.remove('hidden');
        }
      });
    }, { threshold: 0.4 });

    aboutBlocks.forEach(block => aboutObserver.observe(block));
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="/#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href').replace('/', '');
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
