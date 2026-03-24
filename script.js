/* ════════════════════════════════
   LA MIRROR — script.js
════════════════════════════════ */

/* ── Mobile menu ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 68 + 36; // nav + announce
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Formulário ── */
const form    = document.getElementById('contatoForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    formMsg.textContent = '✓ Mensagem enviada! Entraremos em contato em breve.';
    form.reset();
    btn.textContent = 'Enviar Mensagem';
    btn.disabled = false;
    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  }, 1200);
});

/* ── Fade in ao scroll (Intersection Observer) ── */
const fadeEls = document.querySelectorAll(
  '.prod-card, .diff-item, .split-text, .split-img, .oferta-card, .sec-header, .contato-form, .contato-info'
);

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(18px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  obs.observe(el);
});


/* ════════════════════════════════════════
   LA MIRROR — Features JS
════════════════════════════════════════ */

/* ── LOADER ───────────────────────────── */
(function() {
  var loader   = document.getElementById('siteLoader');
  var progress = document.getElementById('loaderProgress');
  if (!loader) return;

  function hide(instant) {
    if (progress) progress.style.width = '100%';
    if (instant) {
      loader.classList.add('hidden');
    } else {
      setTimeout(function() { loader.classList.add('hidden'); }, 350);
    }
  }

  // Anima barra
  var w = 0;
  var iv = setInterval(function() {
    w += Math.random() * 20 + 8;
    if (w > 90) w = 90;
    if (progress) progress.style.width = w + '%';
  }, 100);

  // Se a página já carregou quando o script rodou, esconde imediatamente
  if (document.readyState === 'complete') {
    clearInterval(iv);
    hide(true);
  } else {
    window.addEventListener('load', function() {
      clearInterval(iv);
      hide();
    });
    // Fallback: esconde em 800ms no máximo
    setTimeout(function() {
      clearInterval(iv);
      hide();
    }, 800);
  }
})();

/* ── POPUP OFERTA (abre após 4s) ────── */
(function() {
  var overlay  = document.getElementById('popupOferta');
  var closeBtn = document.getElementById('popupClose');
  var skipBtn  = document.getElementById('popupSkip');
  var ctaBtn   = document.getElementById('popupCta');
  var minEl    = document.getElementById('ptMin');
  var secEl    = document.getElementById('ptSec');
  if (!overlay) return;

  // Só mostra se não foi dispensado hoje
  if (localStorage.getItem('popupDismissed')) return;

  // Abre após 4s
  setTimeout(function() { overlay.classList.add('open'); }, 4000);

  // Timer 10:00 countdown
  var total = 10 * 60;
  var iv = setInterval(function() {
    total--;
    if (total <= 0) { clearInterval(iv); overlay.classList.remove('open'); return; }
    var m = Math.floor(total / 60);
    var s = total % 60;
    if (minEl) minEl.textContent = String(m).padStart(2,'0');
    if (secEl) secEl.textContent = String(s).padStart(2,'0');
  }, 1000);

  function dismiss() {
    overlay.classList.remove('open');
    localStorage.setItem('popupDismissed', '1');
    clearInterval(iv);
  }
  if (closeBtn) closeBtn.addEventListener('click', dismiss);
  if (skipBtn)  skipBtn.addEventListener('click', dismiss);
  if (ctaBtn)   ctaBtn.addEventListener('click', dismiss);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) dismiss(); });
})();

/* ── BOTÃO VOLTAR AO TOPO ────────────── */
(function() {
  var btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── SCROLL REVEAL ───────────────────── */
(function() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (!entry.isIntersecting) return;
      // Stagger delay baseado na posição
      var delay = (entry.target.dataset.delay || 0);
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  // Adiciona delay progressivo em grupos
  document.querySelectorAll('.como-item, .diff-new-item, .fb-card, .faq-item').forEach(function(el, i) {
    el.dataset.delay = (i % 4) * 100;
  });
  els.forEach(function(el) { obs.observe(el); });
})();

/* ── FAQ ACCORDION ───────────────────── */
(function() {
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
      // Abre o clicado se estava fechado
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── CONTADOR BENTO ──────────────────── */
(function() {
  var el = document.getElementById('counterVendas');
  if (!el) return;
  var done = false;
  window.addEventListener('scroll', function() {
    if (done) return;
    var rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;
    done = true;
    var start = 0, target = 500, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1800, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + '+';
    }
    requestAnimationFrame(step);
  }, { passive: true });
})();

/* ── CARRINHO — badge (todas as páginas) ── */
(function() {
  function getCart() {
    try { return JSON.parse(localStorage.getItem('lm_cart') || '[]'); } catch(e) { return []; }
  }
  function updateBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var count = getCart().reduce(function(s, i) { return s + (i.qty || 1); }, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  updateBadge();
  window.addEventListener('storage', updateBadge);
})();

/* ── CARRINHO — drawer (só index.html) ── */
(function() {
  var cartBtn     = document.getElementById('cartBtn');
  var cartClose   = document.getElementById('cartClose');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartDrawer  = document.getElementById('cartDrawer');
  var cartBody    = document.getElementById('cartBody');
  if (!cartDrawer) return;

  function getCart() {
    try { return JSON.parse(localStorage.getItem('lm_cart') || '[]'); } catch(e) { return []; }
  }

  function updateDrawer() {
    if (!cartBody) return;
    var items = getCart();
    if (items.length === 0) {
      cartBody.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
    } else {
      cartBody.innerHTML = items.map(function(item) {
        var img = item.img ? '<img src="' + item.img + '" style="width:54px;height:60px;object-fit:cover;border-radius:6px;flex-shrink:0"/>' : '';
        var nome = item.nome || 'Produto';
        var preco = item.preco || '';
        var qty = item.qty || 1;
        return '<div class="cart-item" style="display:flex;align-items:center;gap:.8rem;padding:.8rem 0;border-bottom:1px solid #f0f0f0">'
          + img
          + '<div style="flex:1;min-width:0">'
          + '<div style="font-size:.8rem;font-weight:600;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + nome + '</div>'
          + '<div style="font-size:.72rem;color:#888;margin-top:.2rem">Qtd: ' + qty + '</div>'
          + '</div>'
          + '<div style="font-size:.82rem;font-weight:700;color:#C6A96B;white-space:nowrap">' + preco + '</div>'
          + '</div>';
      }).join('');
    }
  }

  function openCart() {
    updateDrawer();
    cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  window.addEventListener('storage', updateDrawer);
})();

/* ── PARALLAX ────────────────────────── */
(function() {
  var lastY = -1;

  function loop() {
    var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    if (scrollY !== lastY) {
      lastY = scrollY;

      // Hero background
      var hero = document.getElementById('parallaxHero');
      if (hero) {
        hero.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
      }

      // Elementos com data-parallax
      document.querySelectorAll('[data-parallax]').forEach(function(el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var rect  = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = 'translateY(' + (center * speed) + 'px)';
      });
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
