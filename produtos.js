/* ═══════════════════════════════════════
   LA MIRROR — produtos.js
   Filtros, busca, paginação, modal
═══════════════════════════════════════ */

/* ── BASE DE PRODUTOS ─────────────────────
   Substitua img por seus arquivos reais
   em assets/images/
───────────────────────────────────────── */
const PRODUTOS = [
  {
    id: 1,
    nome: 'Espelho Roma Base Reta',
    desc: 'Espelho com base reta e iluminação LED integrada, ideal para banheiros e closets.',
    cat: 'led',
    catLabel: 'Com LED',
    img: 'assets/images/espelho-01 sem fundo.png',
    preco: 499.90,
    precoOriginal: null,
    tam: 'grande',
    acab: 'dourado',
    badges: ['novo'],
    specs: {
      marca: 'La Mirror',
      forma: 'Base Reta',
      comLuz: 'Sim',
      tempLuz: '',
      corMoldura: '',
      alimentacao: '',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: ''
    }
  },
  {
    id: 2,
    nome: 'Espelho Turim',
    desc: 'Espelho orgânico de alto padrão, perfeito para ambientes modernos e sofisticados.',
    cat: 'decorativo',
    catLabel: 'Decorativo',
    img: 'assets/images/espelho-02 sem fundo.png',
    preco: 499.00,
    precoOriginal: null,
    tam: 'grande',
    acab: 'sem',
    badges: ['destaque'],
    specs: {
      marca: 'La Mirror',
      forma: 'Orgânico',
      comLuz: 'Não',
      tempLuz: '',
      corMoldura: 'Sem moldura',
      alimentacao: '',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: 'Moderno'
    }
  },
  {
    id: 3,
    nome: 'Espelho Orgânico Atenas',
    desc: 'Espelho com formato orgânico ondulado, traz elegância e modernidade para qualquer ambiente.',
    cat: 'decorativo',
    catLabel: 'Decorativo',
    img: 'assets/images/espelho-03 sem fundo.png',
    preco: 599.90,
    precoOriginal: 949.00,
    tam: 'grande',
    acab: 'sem',
    badges: ['oferta'],
    specs: {
      marca: 'La Mirror',
      forma: 'Orgânico',
      comLuz: 'Não',
      tempLuz: '',
      corMoldura: 'Sem moldura',
      alimentacao: '',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: 'Moderno'
    }
  },
  {
    id: 4,
    nome: 'Espelho Roma',
    desc: 'Espelho oval com iluminação LED integrada. Acompanha fonte bivolt 110/220V e sistema de fixação. Ideal para banheiros, quartos, closets e camarins.',
    cat: 'led',
    catLabel: 'Com LED',
    img: 'assets/images/espelho roma sem fundo.png',
    preco: 399.00,
    precoOriginal: null,
    tam: 'medio',
    acab: 'dourado',
    badges: ['destaque'],
    specs: {
      marca: 'La Mirror',
      forma: 'Oval',
      comLuz: 'Sim',
      tempLuz: 'Frio e Quente',
      corMoldura: 'Dourado',
      alimentacao: 'Bivolt 110/220V',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: 'Moderno'
    }
  },
  {
    id: 5,
    nome: 'Espelho Verona',
    desc: 'Espelho redondo com iluminação LED de alta potência. Design clean e moderno para banheiros e quartos.',
    cat: 'led',
    catLabel: 'Com LED',
    img: 'assets/images/espelho-05 sem fundo.png',
    preco: 259.90,
    precoOriginal: 1890.00,
    tam: 'medio',
    acab: 'sem',
    badges: ['oferta', 'novo'],
    specs: {
      marca: 'La Mirror',
      forma: 'Redondo',
      comLuz: 'Sim',
      tempLuz: '',
      corMoldura: 'Sem moldura',
      alimentacao: '',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: 'Moderno'
    }
  },
  {
    id: 6,
    nome: 'Espelho Grécia',
    desc: 'Espelho com formato orgânico assimétrico, peça de destaque para salas e quartos sofisticados.',
    cat: 'decorativo',
    catLabel: 'Decorativo',
    img: 'assets/images/espelho-06 sem fundo.png',
    preco: 429.90,
    precoOriginal: null,
    tam: 'grande',
    acab: 'sem',
    badges: ['destaque'],
    specs: {
      marca: 'La Mirror',
      forma: 'Orgânico',
      comLuz: 'Não',
      tempLuz: '',
      corMoldura: 'Sem moldura',
      alimentacao: '',
      altura: '',
      largura: '',
      peso: '',
      diametro: '',
      espessura: '',
      estilo: 'Moderno'
    }
  }
];

/* ── ESTADO ─────────────────────────── */
let state = {
  filtros: { cat: [], preco: [], tam: [], acab: [] },
  busca: '',
  sort: 'relevancia',
  pagina: 1,
  porPagina: 9,
  view: 'grid'
};

const POR_PAGINA = 9;

/* ── INIT ────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lerURLParams();
  render();
  bindEvents();
});

function lerURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat && cat !== 'todos') {
    state.filtros.cat = [cat];
    // Marcar checkbox correspondente
    document.querySelectorAll('input[name="cat"]').forEach(cb => {
      if (cb.value === cat) cb.checked = true;
      if (cb.value === 'todos') cb.checked = false;
    });
    // Breadcrumb
    const labels = { led:'Espelhos com LED', bisotado:'Espelhos Bisotados', decorativo:'Espelhos Decorativos', oval:'Espelhos Ovais', oferta:'Ofertas' };
    const bc = document.getElementById('breadcrumbCat');
    if (bc && labels[cat]) bc.textContent = labels[cat];
  }
}

/* ── RENDER ──────────────────────────── */
function render() {
  let lista = filtrar();
  lista = ordenar(lista);

  const total = lista.length;
  const inicio = (state.pagina - 1) * POR_PAGINA;
  const pagina = lista.slice(inicio, inicio + POR_PAGINA);

  renderGrid(pagina, total);
  renderPaginacao(total);
  renderFiltrosTags();
  document.getElementById('resultCount').textContent = total + ' produto' + (total !== 1 ? 's' : '');
}

function filtrar() {
  return PRODUTOS.filter(p => {
    // Busca
    if (state.busca) {
      const q = state.busca.toLowerCase();
      if (!p.nome.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
    }
    // Categoria
    if (state.filtros.cat.length > 0) {
      if (!state.filtros.cat.includes(p.cat)) return false;
    }
    // Preço
    if (state.filtros.preco.length > 0) {
      const match = state.filtros.preco.some(faixa => {
        if (faixa === '0-500')    return p.preco <= 500;
        if (faixa === '500-1000') return p.preco > 500 && p.preco <= 1000;
        if (faixa === '1000-2000')return p.preco > 1000 && p.preco <= 2000;
        if (faixa === '2000+')    return p.preco > 2000;
        return false;
      });
      if (!match) return false;
    }
    // Tamanho
    if (state.filtros.tam.length > 0 && !state.filtros.tam.includes(p.tam)) return false;
    // Acabamento
    if (state.filtros.acab.length > 0 && !state.filtros.acab.includes(p.acab)) return false;
    return true;
  });
}

function ordenar(lista) {
  const copia = [...lista];
  if (state.sort === 'menor') copia.sort((a,b) => a.preco - b.preco);
  if (state.sort === 'maior') copia.sort((a,b) => b.preco - a.preco);
  if (state.sort === 'novos') copia.sort((a,b) => b.id - a.id);
  return copia;
}

function fmt(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function renderGrid(lista, total) {
  const grid = document.getElementById('prodGrid');
  grid.className = 'prod-grid-shop' + (state.view === 'list' ? ' list-mode' : '');

  if (lista.length === 0) {
    grid.innerHTML = '<div class="empty-state"><h3>Nenhum produto encontrado</h3><p>Tente ajustar os filtros ou a busca.</p></div>';
    return;
  }

  grid.innerHTML = lista.map(p => {
    const boleto   = (p.preco * 0.95).toLocaleString('pt-BR', {minimumFractionDigits:2});
    const parcela  = (p.preco / 12).toLocaleString('pt-BR', {minimumFractionDigits:2});
    const imgSrc   = (p.fotos && p.fotos[0]) || p.img;
    return `
    <div class="shop-card" onclick="window.location.href='produto.html?id=${p.id}'" style="cursor:pointer">
      <div class="shop-card-img">
        <div class="shop-card-img-inner" style="background-image:url('${imgSrc}')"></div>
        <div class="shop-card-badges">
          ${p.badges.map(b => `<span class="badge ${b}">${b==='oferta'?'Oferta':b==='novo'?'Novo':'Destaque'}</span>`).join('')}
        </div>
        <button class="shop-card-wish" onclick="toggleWish(event, this)" data-id="${p.id}" title="Favoritar">${getWishlist().includes(p.id)?'&#9829;':'&#9825;'}</button>
      </div>
      <div class="shop-card-body">
        <h3>${p.nome}</h3>
        <div class="shop-card-footer">
          <div class="price-wrap">
            ${p.precoOriginal ? `<span class="price-de">${fmt(p.precoOriginal)}</span>` : ''}
            <span class="price-por">${fmt(p.preco)}</span>
            <span class="price-boleto">R$${boleto} com Boleto</span>
            <span class="price-parcelas">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              12 x de R$${parcela} sem juros
            </span>
          </div>
          <button class="btn-card" onclick="event.stopPropagation(); window.location.href='produto.html?id=${p.id}'">Ver Mais</button>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderPaginacao(total) {
  const totalPag = Math.ceil(total / POR_PAGINA);
  const pag = document.getElementById('pagination');
  if (totalPag <= 1) { pag.innerHTML = ''; return; }

  let html = `<button class="page-btn" ${state.pagina === 1 ? 'disabled' : ''} onclick="irPagina(${state.pagina - 1})">&#8249;</button>`;
  for (let i = 1; i <= totalPag; i++) {
    html += `<button class="page-btn ${i === state.pagina ? 'active' : ''}" onclick="irPagina(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" ${state.pagina === totalPag ? 'disabled' : ''} onclick="irPagina(${state.pagina + 1})">&#8250;</button>`;
  pag.innerHTML = html;
}

function irPagina(n) {
  state.pagina = n;
  render();
  document.querySelector('.shop-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderFiltrosTags() {
  const wrap = document.getElementById('activeFilters');
  const labels = {
    cat:   { led:'LED', bisotado:'Bisotado', decorativo:'Decorativo', oval:'Oval' },
    preco: { '0-500':'Até R$500', '500-1000':'R$500-1000', '1000-2000':'R$1000-2000', '2000+':'Acima R$2000' },
    tam:   { pequeno:'Pequeno', medio:'Médio', grande:'Grande' },
    acab:  { preto:'Moldura Preta', prata:'Moldura Prata', dourado:'Dourado', sem:'Sem Moldura' }
  };
  let html = '';
  ['cat','preco','tam','acab'].forEach(grupo => {
    state.filtros[grupo].forEach(val => {
      const label = labels[grupo][val] || val;
      html += `<span class="filter-tag">${label} <button onclick="removerFiltro('${grupo}','${val}')">&#10005;</button></span>`;
    });
  });
  if (state.busca) {
    html += `<span class="filter-tag">Busca: "${state.busca}" <button onclick="limparBusca()">&#10005;</button></span>`;
  }
  wrap.innerHTML = html;
}

/* ── EVENTOS ─────────────────────────── */
function bindEvents() {
  // Category Pills
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      state.filtros.cat = cat ? [cat] : [];
      // sincronizar checkboxes
      document.querySelectorAll('input[name="cat"]').forEach(cb => {
        cb.checked = cat ? cb.value === cat : cb.value === 'todos';
      });
      state.pagina = 1;
      render();
    });
  });

  // Checkboxes
  document.querySelectorAll('.filter-check input').forEach(cb => {
    cb.addEventListener('change', () => {
      const grupo = cb.name;
      const val = cb.value;

      if (grupo === 'cat' && val === 'todos') {
        // limpar todos os outros de cat
        document.querySelectorAll('input[name="cat"]').forEach(c => { if (c.value !== 'todos') c.checked = false; });
        state.filtros.cat = [];
      } else if (grupo === 'cat') {
        document.querySelector('input[name="cat"][value="todos"]').checked = false;
        if (cb.checked) state.filtros.cat.push(val);
        else state.filtros.cat = state.filtros.cat.filter(v => v !== val);
      } else {
        if (cb.checked) state.filtros[grupo].push(val);
        else state.filtros[grupo] = state.filtros[grupo].filter(v => v !== val);
      }
      state.pagina = 1;
      render();
    });
  });

  // Ordenar
  document.getElementById('sortSelect').addEventListener('change', e => {
    state.sort = e.target.value;
    state.pagina = 1;
    render();
  });

  // View toggle
  document.getElementById('gridView').addEventListener('click', () => {
    state.view = 'grid';
    document.getElementById('gridView').classList.add('active');
    document.getElementById('listView').classList.remove('active');
    render();
  });
  document.getElementById('listView').addEventListener('click', () => {
    state.view = 'list';
    document.getElementById('listView').classList.add('active');
    document.getElementById('gridView').classList.remove('active');
    render();
  });

  // Limpar filtros
  document.getElementById('clearFilters').addEventListener('click', limparTodos);
  document.getElementById('applyFilters').addEventListener('click', () => {
    fecharSidebar();
    render();
  });

  // Mobile sidebar
  document.getElementById('filterToggle').addEventListener('click', abrirSidebar);

  // Criar overlay mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  overlay.addEventListener('click', fecharSidebar);
  document.body.appendChild(overlay);

  // Search
  document.getElementById('searchToggle').addEventListener('click', () => {
    document.getElementById('searchBar').classList.toggle('open');
    if (document.getElementById('searchBar').classList.contains('open')) {
      document.getElementById('searchInput').focus();
    }
  });
  document.getElementById('searchClose').addEventListener('click', () => {
    document.getElementById('searchBar').classList.remove('open');
    limparBusca();
  });
  var searchTimer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.busca = e.target.value.trim();
      state.pagina = 1;
      render();
    }, 300);
  });

  // Modal fechar
  document.getElementById('modalClose').addEventListener('click', fecharModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) fecharModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
}

function abrirSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function fecharSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function limparTodos() {
  state.filtros = { cat: [], preco: [], tam: [], acab: [] };
  document.querySelectorAll('.filter-check input').forEach(cb => {
    cb.checked = cb.value === 'todos';
  });
  state.pagina = 1;
  render();
}
function removerFiltro(grupo, val) {
  state.filtros[grupo] = state.filtros[grupo].filter(v => v !== val);
  document.querySelectorAll(`input[name="${grupo}"][value="${val}"]`).forEach(cb => cb.checked = false);
  state.pagina = 1;
  render();
}
function limparBusca() {
  state.busca = '';
  document.getElementById('searchInput').value = '';
  state.pagina = 1;
  render();
}

/* ── WISHLIST ────────────────────────── */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('lm_wishlist') || '[]'); } catch(e) { return []; }
}
function saveWishlist(list) {
  localStorage.setItem('lm_wishlist', JSON.stringify(list));
}
function toggleWish(e, btn) {
  e.stopPropagation();
  var id = parseInt(btn.dataset.id);
  var list = getWishlist();
  var idx = list.indexOf(id);
  if (idx === -1) { list.push(id); btn.classList.add('active'); btn.innerHTML = '&#9829;'; }
  else { list.splice(idx, 1); btn.classList.remove('active'); btn.innerHTML = '&#9825;'; }
  saveWishlist(list);
}

/* ── WHATSAPP ────────────────────────── */
function pedirWpp(e, id) {
  e.stopPropagation();
  const p = PRODUTOS.find(x => x.id === id);
  const msg = encodeURIComponent('Olá! Tenho interesse no produto: ' + p.nome + ' (' + fmt(p.preco) + '). Poderia me passar mais informações?');
  window.open('https://wa.me/5511999999999?text=' + msg, '_blank');
}

/* ── MODAL ───────────────────────────── */
function abrirModal(id) {
  const p = PRODUTOS.find(x => x.id === id);
  const msg = encodeURIComponent('Olá! Tenho interesse no produto: ' + p.nome + ' (' + fmt(p.preco) + '). Poderia me dar mais informações?');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img">
      <div class="modal-img-zoom" style="background-image:url('${p.img}')"></div>
    </div>
    <div class="modal-info">
      <span class="modal-cat">${p.catLabel}</span>
      <h2>${p.nome}</h2>
      <div class="modal-price-wrap">
        ${p.precoOriginal ? `<span class="modal-price-de">${fmt(p.precoOriginal)}</span>` : ''}
        <span class="modal-price">${fmt(p.preco)}</span>
      </div>
      <hr class="modal-divider"/>
      <p>${p.desc}</p>
      <ul class="modal-specs">
        ${p.specs.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="modal-actions">
        <a href="https://wa.me/5511999999999?text=${msg}" target="_blank" class="btn-wpp-modal">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Pedir pelo WhatsApp
        </a>
        <button class="btn-modal-sec" onclick="fecharModal()">&#10005; Fechar</button>
      </div>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
