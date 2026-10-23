if (!window.location.hash) {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
}


function handleImageError(img) {
  img.classList.add('is-hidden');
  const fallback = img.parentElement?.querySelector('.avatar-fallback');
  if (fallback) fallback.style.display = 'flex';
}

document.querySelectorAll('.team-member-avatar img').forEach((img) => {
  img.addEventListener('error', () => handleImageError(img));
  if (img.complete && img.naturalWidth === 0) {
    handleImageError(img);
  }
});

document.querySelectorAll('.avatar-fallback').forEach((fallback) => {
  const img = fallback.parentElement?.querySelector('img');
  if (!img || img.classList.contains('is-hidden')) {
    fallback.style.display = 'flex';
  } else {
    fallback.style.display = 'none';
  }
});


const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');
const navMenuLinks = document.querySelectorAll('.nav a');
const submenuWrap = document.querySelector('.nav__item--has-submenu');
const serviciosLink = document.getElementById('servicios-link');
const MOBILE_NAV_QUERY = window.matchMedia('(max-width: 1024px)');

function closeMobileMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('is-open');
  document.documentElement.classList.remove('nav-open');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    if (navToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      return;
    }

    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    document.documentElement.classList.add('nav-open');
  });


    navMenuLinks.forEach((link) => {
      if (link.id === 'servicios-link') return;
      link.addEventListener('click', closeMobileMenu);
    });


  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });


  document.addEventListener('click', (event) => {
    if (!navMenu.classList.contains('is-open')) return;
    if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
    closeMobileMenu();
  });


  const onBreakpointChange = (event) => {
    if (!event.matches) {
      closeMobileMenu();
      if (submenuWrap) submenuWrap.classList.remove('submenu-open');
    }
  };

  if (typeof MOBILE_NAV_QUERY.addEventListener === 'function') {
    MOBILE_NAV_QUERY.addEventListener('change', onBreakpointChange);
  } else if (typeof MOBILE_NAV_QUERY.addListener === 'function') {
    MOBILE_NAV_QUERY.addListener(onBreakpointChange);
  }
}



if (serviciosLink && submenuWrap && navMenu) {
  serviciosLink.addEventListener('click', (event) => {
    const isMobile = MOBILE_NAV_QUERY.matches
      && navMenu.classList.contains('is-open');
    if (isMobile && !submenuWrap.classList.contains('submenu-open')) {
      event.preventDefault();
      submenuWrap.classList.add('submenu-open');
      return;
    }
    closeMobileMenu();
  });
}



const mapFrame = document.getElementById('contact-map');
const mapBtn = document.getElementById('map-load-btn');
const mapPlaceholder = document.getElementById('map-placeholder');
let mapLoaded = false;

function loadMap() {
  if (mapLoaded || !mapFrame) return;
  mapLoaded = true;
  mapFrame.src = mapFrame.getAttribute('data-src');
  mapFrame.hidden = false;
  if (mapPlaceholder) mapPlaceholder.style.display = 'none';
}

if (mapBtn) mapBtn.addEventListener('click', loadMap);

if (document.readyState === 'complete') {
  loadMap();
} else {
  window.addEventListener('load', loadMap);
}



const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav__link'));

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
} else {

  let isSpyScheduled = false;

  function updateActiveLink() {
    isSpyScheduled = false;

    const scrollY = window.pageYOffset;
    const triggerOffset = 180;
    const pageBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
    let activeSectionId = null;

    if (pageBottom && sections.length) {
      activeSectionId = sections[sections.length - 1].id;
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - triggerOffset;
        if (scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
          activeSectionId = section.id;
        }
      });
    }

    if (activeSectionId) setActiveLink(activeSectionId);
  }

  function scrollSpy() {
    if (isSpyScheduled) return;
    isSpyScheduled = true;
    window.requestAnimationFrame(updateActiveLink);
  }

  window.addEventListener('scroll', scrollSpy, { passive: true });
  window.addEventListener('resize', scrollSpy);
  window.addEventListener('load', updateActiveLink);
  updateActiveLink();
}


document.querySelectorAll('.service-card--toggleable').forEach((card) => {
  const toggleBtn = card.querySelector('.service-card__toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = card.classList.toggle('is-expanded');
    toggleBtn.textContent = isExpanded ? 'Ver menos' : 'Ver más';
  });
});


const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}


const bottombarEl = document.querySelector('.bottombar');
const bottombarInner = document.querySelector('.bottombar__inner');
const BASE_BOTTOMBAR_HEIGHT = parseFloat(
  window.getComputedStyle(document.documentElement).getPropertyValue('--bottombar-height')
) || 40;
let bottombarHeight = 0;

function syncBottombarHeight() {
  if (!bottombarEl || !bottombarInner) return;

  const styles = window.getComputedStyle(bottombarEl);
  const chrome = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
    .reduce((total, prop) => total + (parseFloat(styles[prop]) || 0), 0);




  const nextHeight = Math.max(
    BASE_BOTTOMBAR_HEIGHT,
    Math.ceil(bottombarInner.getBoundingClientRect().height + chrome)
  );

  if (nextHeight === bottombarHeight) return;
  bottombarHeight = nextHeight;
  document.documentElement.style.setProperty('--bottombar-height', `${nextHeight}px`);
}

if (bottombarEl && bottombarInner) {
  syncBottombarHeight();
  window.addEventListener('load', syncBottombarHeight);
  window.addEventListener('resize', syncBottombarHeight);

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(syncBottombarHeight).observe(bottombarInner);
  }
}


const calcMods = Array.from(document.querySelectorAll('input[name="mod"]'));
const calcPrice = document.getElementById('calc-price');
const calcModality = document.getElementById('calc-count');
const calcFeatures = document.getElementById('calc-features');
const calcCta = document.getElementById('calc-cta');

function fmt(n) {
  return `USD ${Math.round(n).toLocaleString('es-AR')}`;
}

function calcUpdate() {
  if (!calcPrice) return;

  let monthly = 250;
  let modLabel = 'Remoto';
  let modDesc = 'Atención a distancia, respuesta rápida';
  calcMods.forEach((r) => {
    if (r.checked) {
      monthly = parseFloat(r.getAttribute('data-price')) || 250;
      modLabel = r.getAttribute('data-label') || r.value;
      const box = r.closest('.calc-radio-option');
      const desc = box ? box.querySelector('.calc-radio-option__desc') : null;
      if (desc) modDesc = desc.textContent.trim();
    }
  });

  calcPrice.textContent = `${fmt(monthly)}/mes`;
  if (calcModality) calcModality.textContent = modLabel;
  if (calcFeatures) {
    calcFeatures.innerHTML =
      `<span class="calc-feature-bullet"><span class="calc-bullet-icon">✓</span> ${modDesc}</span>`;
  }
  if (calcCta) {
    calcCta.setAttribute(
      'data-msg',
      `Hola Hexacore, me interesa el plan ${modLabel} (${fmt(monthly)}/mes)`
    );
  }
}

calcMods.forEach((r) => r.addEventListener('change', calcUpdate));
calcUpdate();

if (calcCta) {
  calcCta.addEventListener('click', () => {
    const msg = calcCta.getAttribute('data-msg');
    const msgField = document.getElementById('f-msg');
    if (msg && msgField && !msgField.value) msgField.value = msg;
  });
}



if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('svg.hero-svg').forEach((svg) => {
    if (typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
  });
}




(function marquee() {
  const track = document.querySelector('.clients-track');
  if (!track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  track.style.animation = 'none';

  const LOOP_SECONDS = 20;
  let half = 0;
  let x = 0;
  let last = 0;
  let visible = true;

  const measure = () => {
    half = track.scrollWidth / 2;
  };
  measure();
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    ).observe(track);
  }

  function frame(t) {
    if (last && visible && half > 0) {
      const dt = Math.min((t - last) / 1000, 0.1);
      x = (x + (half / LOOP_SECONDS) * dt) % half;
      track.style.transform = `translate3d(${-Math.round(x)}px, 0, 0)`;
    }
    last = t;
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
})();



(function glitchAC() {
  const layers = Array.from(document.querySelectorAll('.hero-svg .glitch-layer'));
  if (!layers.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function retime() {
    layers.forEach((layer) => {
      layer.style.animationDuration = `${(0.9 + Math.random() * 3).toFixed(2)}s`;
      layer.style.animationDelay = `${(-Math.random() * 4).toFixed(2)}s`;
    });
    setTimeout(retime, 1500 + Math.random() * 2500);
  }

  retime();
})();




(function contactQuiz() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.form-step'));
  const dots = Array.from(form.querySelectorAll('[data-step-dot]'));
  const stepLabel = document.getElementById('quiz-step-label');
  const errEl = document.getElementById('form-error');
  const submitBtn = document.getElementById('form-submit');
  let current = 1;

  const val = (id) => document.getElementById(id).value.trim();
  const choice = (name) => {
    const checked = form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  };

  function showError(msg) {
    if (!errEl) return;
    if (msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
    } else {
      errEl.hidden = true;
    }
  }

  function goTo(step) {
    current = Math.min(Math.max(step, 1), steps.length);
    steps.forEach((panel) => {
      const active = Number(panel.dataset.step) === current;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    dots.forEach((dot) => {
      const n = Number(dot.dataset.stepDot);
      dot.classList.toggle('is-current', n === current);
      dot.classList.toggle('is-done', n < current);
    });
    if (stepLabel) stepLabel.textContent = current > 3 ? '¡Listo!' : 'Paso ' + current + ' de 3';
    showError('');
  }


  form.querySelectorAll('.quiz-options input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });


  form.querySelectorAll('.quiz-options input[type="radio"]').forEach((radio) => {
    radio.addEventListener('click', () => {
      const panel = radio.closest('.form-step');
      const step = Number(panel.dataset.step);
      setTimeout(() => goTo(step + 1), 220);
    });
  });

  form.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => goTo(current - 1));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const tel = val('f-tel');
    const email = val('f-email');
    if (!tel && !email) {
      showError('Completá tu WhatsApp o tu email para que te contactemos.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Ese email no parece válido.');
      return;
    }
    showError('');

    const svc = choice('servicio') || 'General';
    const tam = choice('tamano') || '-';
    const full = 'Servicio: ' + svc + '\nTamaño: ' + tam + ' equipos' +
      (tel ? '\nWhatsApp: ' + tel : '') +
      (email ? '\nEmail: ' + email : '');

    const waBtn = document.getElementById('send-whatsapp');
    const emailBtn = document.getElementById('send-email');
    if (waBtn) {
      waBtn.href = 'https://api.whatsapp.com/send?phone=5491123923138&text=' + encodeURIComponent('Hola Hexacore\n\n' + full);
    }
    if (emailBtn) {
      emailBtn.href = 'mailto:soporte@hexacore.com.ar?subject=' + encodeURIComponent('Consulta web — ' + svc) + '&body=' + encodeURIComponent(full);
    }

    const feedback = document.getElementById('form-feedback');
    const sendOptions = document.getElementById('form-send-options');
    const feedbackText = document.getElementById('form-feedback-text');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    fetch('https://formsubmit.co/ajax/soporte@hexacore.com.ar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'Consulta web — ' + svc,
        _template: 'table',
        _captcha: 'false',
        servicio: svc,
        tamano_equipos: tam,
        whatsapp: tel || '-',
        email: email || '-',
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('send failed');
        goTo(4);
      })
      .catch(() => {
        if (feedbackText) {
          feedbackText.textContent = 'No pudimos enviarla automáticamente: usá WhatsApp o Email acá abajo.';
        }
        if (feedback) feedback.classList.remove('hide');
        if (sendOptions) {
          sendOptions.classList.remove('hide');
          sendOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
      });
  });

  goTo(1);
})();



(function breatheFlicker() {
  const hero = document.querySelector('.hero-svg');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rnd = (min, max) => min + Math.random() * (max - min);

  function burst() {
    const total = (2 + Math.floor(Math.random() * 3)) * 2;
    let i = 0;


    hero.style.animation = 'none';

    (function step() {
      if (i++ >= total) {
        hero.style.filter = '';
        hero.style.animation = '';
        schedule();
        return;
      }
      hero.style.filter = i % 2 === 0
        ? `drop-shadow(0 0 ${rnd(55, 80).toFixed(0)}px rgba(188, 193, 205, ${rnd(0.45, 0.6).toFixed(2)}))`
        : `drop-shadow(0 0 ${rnd(20, 35).toFixed(0)}px rgba(188, 193, 205, ${rnd(0.12, 0.25).toFixed(2)}))`;
      setTimeout(step, rnd(60, 140));
    })();
  }

  function schedule() {
    setTimeout(burst, rnd(2200, 6000));
  }

  schedule();
})();
