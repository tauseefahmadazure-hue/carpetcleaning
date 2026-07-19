/* =========================================================
   PILE & CO. — site interactions (vanilla JS, no dependencies)
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setFooterYear();
    initScrollReveal();
    initBeforeAfterSlider();
    initLightbox();
    initHeroQuoteForm();
    initContactForm();
    initSmoothAnchors();
  }

  /* ---------- Footer year ---------- */
  function setFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll(
      '.why-card, .service-card, .review-card, .price-card, .process-step, .gallery-card'
    );
    targets.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Before / After slider ---------- */
  function initBeforeAfterSlider() {
    var wrap = document.querySelector('[data-ba-slider]');
    if (!wrap) return;
    var beforeWrap = wrap.querySelector('.ba-before-wrap');
    var handle = wrap.querySelector('.ba-handle');
    var range = wrap.querySelector('.ba-range');

    function update(value) {
      beforeWrap.style.width = value + '%';
      handle.style.left = value + '%';
    }
    update(range.value);
    range.addEventListener('input', function () { update(range.value); });
  }

  /* ---------- Lightbox gallery ---------- */
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = document.getElementById('lightboxClose');
    if (!lightbox) return;

    document.querySelectorAll('[data-lightbox] img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ---------- Hero quote form (lead capture) ---------- */
  function initHeroQuoteForm() {
    var form = document.getElementById('heroQuoteForm');
    var status = document.getElementById('heroFormStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Placeholder submit handler — wire up to your CRM / email endpoint.
      // Example: fetch('/api/lead', { method:'POST', body: new FormData(form) });

      // Analytics event placeholder
      // if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_id: 'hero_quote' });
      // if (typeof fbq === 'function') fbq('track', 'Lead');

      status.textContent = "Thanks! We'll call you back within 15 minutes.";
      form.reset();
    });
  }

  /* ---------- Main contact / quote form ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('contactFormStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Placeholder submit handler — wire up to your CRM / email endpoint.
      // Example: fetch('/api/quote-request', { method:'POST', body: new FormData(form) });

      // if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_id: 'contact_form' });
      // if (typeof fbq === 'function') fbq('track', 'Lead');

      status.textContent = "Thank you! Your quote request has been received — we'll be in touch shortly.";
      form.reset();
    });
  }

  /* ---------- Smooth anchor scroll offset for sticky header ---------- */
  function initSmoothAnchors() {
    var header = document.querySelector('.site-header');
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = (header ? header.offsetHeight : 0) + 10;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });

        var navCollapse = document.getElementById('mainNav');
        if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

})();
