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

  function fmt(n) {
    return 'R$\u00a0' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateDrawer() {
    if (!cartBody) return;
    var items   = getCart();
    var footer  = document.getElementById('cartFooter');
    var totalEl = document.getElementById('cartTotalValue');
    var countEl = document.getElementById('cartCount');

    if (items.length === 0) {
      cartBody.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;gap:.8rem;padding:3.5rem 1rem;text-align:center">'
        + '<span style="font-size:2.5rem;opacity:.3">🛍️</span>'
        + '<p style="font-size:.85rem;color:#999;line-height:1.6">Seu carrinho está vazio.<br>Explore nossa coleção de espelhos.</p>'
        + '</div>';
      if (footer) footer.style.display = 'none';
      if (countEl) countEl.textContent = '0 itens';
      return;
    }

    var total    = 0;
    var totalQty = 0;

    cartBody.innerHTML = items.map(function(item) {
      var qty      = item.qty || 1;
      var preco    = Number(item.preco) || 0;
      var subtotal = preco * qty;
      total    += subtotal;
      totalQty += qty;

      var imgHtml = item.img
        ? '<img src="' + item.img + '" alt="' + (item.nome || '') + '" loading="lazy" style="width:78px;min-width:78px;height:88px;object-fit:cover;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.1);background:#f5f5f5;flex-shrink:0"/>'
        : '<div style="width:78px;min-width:78px;height:88px;border-radius:10px;background:#f0f0f0;flex-shrink:0"></div>';

      var descHtml = item.descricao
        ? '<div style="font-size:.71rem;color:#aaa;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' + item.descricao + '</div>'
        : '';

      return (
        '<div style="display:flex;gap:1rem;align-items:flex-start;padding:1.1rem 0;border-bottom:1px solid #f0f0f0">'
        + imgHtml
        + '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:.28rem">'
        +   '<div style="font-size:.84rem;font-weight:700;color:#1a1a1a;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' + (item.nome || 'Produto') + '</div>'
        +   descHtml
        +   '<div style="font-size:.7rem;color:#bbb;margin-top:.1rem">Unit.: ' + fmt(preco) + '</div>'
        +   '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:.4rem">'
        +     '<span style="font-size:.7rem;font-weight:600;color:#666;background:#f5f5f5;border-radius:20px;padding:.2rem .7rem">Qtd: ' + qty + '</span>'
        +     '<span style="font-size:.9rem;font-weight:800;color:#C6A96B">' + fmt(subtotal) + '</span>'
        +   '</div>'
        + '</div>'
        + '</div>'
      );
    }).join('');

    if (footer) footer.style.display = 'block';
    if (totalEl) totalEl.textContent = fmt(total);
    if (countEl) countEl.textContent = totalQty + (totalQty === 1 ? ' item' : ' itens');
  }

  function openCart() {
    updateDrawer();
    cartDrawer.style.right = '0';
    if (cartOverlay) { cartOverlay.style.opacity = '1'; cartOverlay.style.visibility = 'visible'; }
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.style.right = '-480px';
    if (cartOverlay) { cartOverlay.style.opacity = '0'; cartOverlay.style.visibility = 'hidden'; }
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
