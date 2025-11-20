// Carrito de compras
(function () {
  // Datos de productos
  const PRODUCTS = [
    {
      id: 'p1',
      title: 'Sudadera con capucha Homelander',
      price: 39900,
      img: 'assets/img/Merch_Principal/sudaderaHomelander.jpg',
      desc: 'The Boys Sudadera con capucha Homelander con diseño de ojos goteadores, Negro, S'
    },
    {
      id: 'p2',
      title: 'Camiseta Graffiti The Boys',
      price: 16999,
      img: 'assets/img/Merch_Principal/camisetaGraffiti.jpg',
      desc: 'The Boys Camiseta con foto de grupo Graffiti, Negro, M',
      oferta: true
    },
    {
      id: 'p3',
      title: 'Camiseta Butcher',
      price: 32000,
      img: 'assets/img/Merch_Principal/camisetaButcher.jpg',
      desc: 'The Boys Camiseta Butcher Don\'t Be A.., Negro, L'
    },
    {
      id: 'p4',
      title: 'Sudadera con capucha The Boys',
      price: 25999,
      img: 'assets/img/Merch_Principal/sudaderaTheBoys.jpg',
      desc: 'The Boys Show Logo Sudadera con capucha, Negro, S',
      oferta: true
    }
  ];

  // Para navegación entre productos en el modal
  let currentQuickIndex = 0;

  // Para obtener el producto que se selecciona desde el html
  const KEY = 'tb_cart_v1';
  let cart = JSON.parse(localStorage.getItem(KEY) || '[]');

  // util - formato en pesos colombianos
  function formatPrice(v) {
    try {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(v);
    } catch (e) {
      return 'COP ' + v.toLocaleString();
    }
  }

  // render productos grid
  function renderProducts(filtered = PRODUCTS) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      ${p.oferta ? '<span class="badge badge-warning" style="position:absolute;top:12px;left:12px;font-size:.95em;">Oferta</span>' : ''}
      <h5 style="color:var(--gold-main); margin:8px 0 4px;">${p.title}</h5>
      <p style="color:#ddd; font-size:.9rem; margin:0 0 8px;">${p.desc}</p>
      <div class="product-actions">
        <strong style="color:#fff; margin-right:auto;">${formatPrice(p.price)}</strong>
        <button class="btn btn-danger btn-sm add-to-cart" data-id="${p.id}" aria-label="Agregar ${p.title} al carrito">Agregar</button>
        <button class="btn btn-outline-light btn-sm quick-view" data-id="${p.id}" aria-label="Vista rápida de ${p.title}">👁️</button>
      </div>
    `;
      grid.appendChild(card);
    });
  }

  // Añadir al carrito
  function addToCart(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ id: prod.id, title: prod.title, price: prod.price, img: prod.img, qty: 1 });
    saveCart();
    renderCartCount();
  }

  // Guardar
  function saveCart() {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }

  // Render contador
  function renderCartCount() {
    const countEl = document.getElementById('cartCount');
    const qty = cart.reduce((s, i) => s + i.qty, 0);
    if (countEl) countEl.textContent = qty;
  }

  // Render carrito en modal
  function renderCart() {
    const body = document.getElementById('cartBody');
    body.innerHTML = '';
    if (cart.length === 0) {
      body.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
      const totalEl = document.getElementById('cartTotal');
      if (totalEl) totalEl.textContent = formatPrice(0);
      return;
    }
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div style="flex:1">
          <div style="color:var(--gold-main); font-weight:600;">${item.title}</div>
          <div style="color:#ccc; font-size:.9rem;">${formatPrice(item.price)} x ${item.qty}</div>
        </div>
        <div style="display:flex; gap:.5rem; align-items:center;">
          <button class="btn btn-sm btn-outline-light decrease" data-id="${item.id}">-</button>
          <button class="btn btn-sm btn-outline-light increase" data-id="${item.id}">+</button>
          <button class="btn btn-sm btn-danger remove" data-id="${item.id}" title="Eliminar">✕</button>
        </div>
      `;
      body.appendChild(row);
    });
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  // Eventos del modal (delegación)
  function cartDelegation(e) {
    const t = e.target;
    if (t.matches('.add-to-cart')) addToCart(t.dataset.id);
    if (t.matches('.increase')) {
      const id = t.dataset.id; const it = cart.find(i => i.id === id); if (!it) return;
      it.qty++; saveCart(); renderCart(); renderCartCount();
    }
    if (t.matches('.decrease')) {
      const id = t.dataset.id; const it = cart.find(i => i.id === id); if (!it) return;
      it.qty = Math.max(1, it.qty - 1); saveCart(); renderCart(); renderCartCount();
    }
    if (t.matches('.remove')) {
      const id = t.dataset.id; cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); renderCartCount();
    }
  }

  // Checkout demo
  function checkout() {
    if (cart.length === 0) { alert('Tu carrito está vacío.'); return; }
    alert('Checkout demo — Gracias por la compra (simulada).');
    cart = []; saveCart(); renderCart(); renderCartCount();
    $('#cartModal').modal('hide');
  }
  
  function guardarTotalYPagar() {
    let total = document.getElementById("cartTotal").textContent;
    localStorage.setItem("totalCarrito", total);
    window.location.href = "pagos.html";
  }

  function showToast(msg) {
    const toast = document.getElementById('shopToast');
    const toastMsg = document.getElementById('shopToastMsg');
    toastMsg.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1800);
  }

  // Filtro y búsqueda
  function filterProducts() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('filterType').value;
    let filtered = PRODUCTS.filter(p => {
      let match = p.title.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
      if (type === 'camiseta') match = match && p.title.toLowerCase().includes('camiseta');
      if (type === 'sudadera') match = match && p.title.toLowerCase().includes('sudadera');
      if (type === 'oferta') match = match && p.oferta;
      return match;
    });
    renderProducts(filtered);
  }

  function openQuickViewByIndex(idx) {
    if (idx < 0) idx = PRODUCTS.length - 1;
    if (idx >= PRODUCTS.length) idx = 0;
    currentQuickIndex = idx;
    const prod = PRODUCTS[idx];
    if (!prod) return;
    document.getElementById('quickViewTitle').textContent = prod.title;
    document.getElementById('quickViewImg').src = prod.img;
    document.getElementById('quickViewImg').alt = prod.title;
    document.getElementById('quickViewDesc').textContent = prod.desc;
    document.getElementById('quickViewCantidad').value = 1;
    document.getElementById('quickViewPrice').textContent = formatPrice(prod.price);
    document.getElementById('quickViewColor').textContent = prod.color || 'Negro';
    document.getElementById('quickViewImpuestos').style.display = 'inline';
    $('#quickViewModal').modal('show');
    document.getElementById('quickViewAddBtn').onclick = function () {
      let qty = parseInt(document.getElementById('quickViewCantidad').value, 10);
      let talla = document.getElementById('quickViewTalla').value;
      for (let i = 0; i < qty; i++) addToCart(prod.id);
      showToast(`Agregado ${qty} x ${prod.title} (${talla})`);
      $('#quickViewModal').modal('hide');
      const badge = document.getElementById('cartCount');
      badge.classList.add('animated');
      setTimeout(() => badge.classList.remove('animated'), 500);
    };
    // Navegación
    document.getElementById('prevProductBtn').onclick = function () {
      openQuickViewByIndex(currentQuickIndex - 1);
    };
    document.getElementById('nextProductBtn').onclick = function () {
      openQuickViewByIndex(currentQuickIndex + 1);
    };
    // Guía de tallas
    document.getElementById('guiaTallaBtn').onclick = function () {
      $('#guiaTallaModal').modal('show');
    };
  }

  // Modifica openQuickView para usar el índice
  function openQuickView(id) {
    const idx = PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) openQuickViewByIndex(idx);
  }

  // init
  // Listeners
  function init() {
    renderProducts();
    renderCartCount();
    document.body.addEventListener('click', function (e) {
      if (e.target.matches('.add-to-cart')) {
        addToCart(e.target.dataset.id);
        showToast('Producto agregado al carrito');
        const badge = document.getElementById('cartCount');
        badge.classList.add('animated');
        setTimeout(() => badge.classList.remove('animated'), 500);
      }
      if (e.target.matches('.quick-view')) openQuickView(e.target.dataset.id);
    });
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('filterType').addEventListener('change', filterProducts);
    // ...resto igual...
    const cartBodyEl = document.getElementById('cartBody');
    if (cartBodyEl) cartBodyEl.addEventListener('click', cartDelegation);
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    const guardarTotalYPagarBtn = document.getElementById('guardarTotalYPagar');
    if (guardarTotalYPagarBtn) guardarTotalYPagarBtn.addEventListener('click', guardarTotalYPagar);
    // when modal opens, render cart content
    $('#cartModal').on('show.bs.modal', function () { renderCart(); });
  }

  // ejecutar
  document.addEventListener('DOMContentLoaded', init);
})();