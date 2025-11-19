(function () {
  const PRODUCTS = [
    { id: 'p1', title: 'Camisa Homelander', price: 49900, img: 'assets/img/product1.jpg', desc: 'Camisa oficial, algodón 100%.' },
    { id: 'p2', title: 'Buso Homelander', price: 79900, img: 'assets/img/product2.jpg', desc: 'Buso (sudadera) con capucha, edición limitada.' },
    { id: 'p3', title: 'Camisa Vought', price: 45900, img: 'assets/img/product3.jpg', desc: 'Camisa clásica con logo Vought.' },
    { id: 'p4', title: 'Buso The Boys - Negro', price: 89900, img: 'assets/img/product4.jpg', desc: 'Buso oscuro con estampado frontal.' },
    { id: 'p5', title: 'Camisa "The Boys" - Diseño', price: 42900, img: 'assets/img/product5.jpg', desc: 'Camisa con arte exclusivo.' },
    { id: 'p6', title: 'Buso Edición Coleccionista', price: 109900, img: 'assets/img/product6.jpg', desc: 'Buso premium, edición coleccionista.' }
  ];

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
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    PRODUCTS.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" />
        <h5 style="color:var(--gold-main); margin:8px 0 4px;">${p.title}</h5>
        <p style="color:#ddd; font-size:.9rem; margin:0 0 8px;">${p.desc}</p>
        <div class="product-actions">
          <strong style="color:#fff; margin-right:auto;">${formatPrice(p.price)}</strong>
          <button class="btn btn-danger btn-sm add-to-cart" data-id="${p.id}">Agregar</button>
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
    const qty = cart.reduce((s,i)=>s+i.qty,0);
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
      const id = t.dataset.id; const it = cart.find(i=>i.id===id); if (!it) return;
      it.qty++; saveCart(); renderCart(); renderCartCount();
    }
    if (t.matches('.decrease')) {
      const id = t.dataset.id; const it = cart.find(i=>i.id===id); if (!it) return;
      it.qty = Math.max(1, it.qty - 1); saveCart(); renderCart(); renderCartCount();
    }
    if (t.matches('.remove')) {
      const id = t.dataset.id; cart = cart.filter(i=>i.id!==id); saveCart(); renderCart(); renderCartCount();
    }
  }

  // Checkout demo
  function checkout() {
    if (cart.length === 0) { alert('Tu carrito está vacío.'); return; }
    alert('Checkout demo — Gracias por la compra (simulada).');
    cart = []; saveCart(); renderCart(); renderCartCount();
    $('#cartModal').modal('hide');
  }

  // init
  function init() {
    renderProducts();
    renderCartCount();
    // listeners
    document.body.addEventListener('click', function (e) {
      if (e.target.matches('.add-to-cart')) addToCart(e.target.dataset.id);
    });
    // delegation inside cart modal
    const cartBodyEl = document.getElementById('cartBody');
    if (cartBodyEl) cartBodyEl.addEventListener('click', cartDelegation);
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    // when modal opens, render cart content
    $('#cartModal').on('show.bs.modal', function () { renderCart(); });
  }

  // ejecutar
  document.addEventListener('DOMContentLoaded', init);
})();