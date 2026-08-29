/* ==========================================================================
   JUGUERÍA ELBIA - INTERACTIVIDAD & SISTEMA DE PEDIDOS WHATSAPP
   ========================================================================== */

const NUMERO_WHATSAPP = "51900000000"; 

const productos = [
    { id: 1, nombre: "Jugo de Papaya", descripcion: "Jugo natural recién licuado, nutritivo y digestivo.", precio: 8.00, categoria: "jugos", imagen: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 2, nombre: "Jugo de Fresa", descripcion: "Fresas seleccionadas al instante con un toque natural.", precio: 9.00, categoria: "jugos", imagen: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: false },
    { id: 3, nombre: "Jugo de Mango", descripcion: "Intenso sabor tropical, cremoso y lleno de energía.", precio: 9.50, categoria: "jugos", imagen: "https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 4, nombre: "Jugo Surtido Elbia", descripcion: "Mezcla tradicional de papaya, piña, plátano y manzana.", precio: 10.00, categoria: "jugos", imagen: "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 5, nombre: "Jugo Especial de la Casa", descripcion: "Frutas surtidas + algarrobina + huevo + miel + leche.", precio: 13.00, categoria: "jugos", imagen: "https://images.pexels.com/photos/8004565/pexels-photo-8004565.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 6, nombre: "Sándwich de Pollo Deshilachado", descripcion: "Pechuga deshilachada con mayonesa artesanal de la casa.", precio: 7.50, categoria: "sandwiches", imagen: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: false },
    { id: 7, nombre: "Sándwich de Pollo con Palta", descripcion: "Pollo artesanal acompañado de láminas de palta fresca.", precio: 9.00, categoria: "sandwiches", imagen: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 8, nombre: "Sándwich Mixto (Jamón y Queso)", descripcion: "Queso derretido y jamón de primera en pan caliente tostado.", precio: 7.00, categoria: "sandwiches", imagen: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: false },
    { id: 9, nombre: "Sándwich Especial Elbia", descripcion: "Pollo, huevo duro, tocino crocante, queso y palta.", precio: 12.00, categoria: "sandwiches", imagen: "https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true },
    { id: 10, nombre: "Ensalada de Frutas Clásica", descripcion: "Frutas variadas de estación con miel de abeja y algarrobina.", precio: 11.00, categoria: "extras", imagen: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: false },
    { id: 11, nombre: "Ensalada de Frutas con Yogurt & Cereal", descripcion: "Mix de frutas, yogurt natural artesanal, granola y miel.", precio: 13.50, categoria: "extras", imagen: "https://images.pexels.com/photos/128865/pexels-photo-128865.jpeg?auto=compress&cs=tinysrgb&w=500", destacado: true }
];

let carrito = [];

function initApp() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        renderProducts(productos);
    }
    initMenuMobile();
    initFilters();
    initCartModal();
    initScrollHeader();
}

function renderProducts(items) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.imagen}" alt="${product.nombre}" class="product-img" loading="lazy">
                ${product.destacado ? '<span class="product-badge">Popular</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.nombre}</h3>
                <p class="product-desc">${product.descripcion}</p>
                <div class="product-footer">
                    <span class="product-price">S/ ${product.precio.toFixed(2)}</span>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})"><i class="fa-solid fa-plus"></i> Agregar</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    const itemInCart = carrito.find(item => item.id === productId);
    if (itemInCart) { itemInCart.cantidad++; } else { carrito.push({ ...product, cantidad: 1 }); }
    updateCartUI();
    openCartModal();
}

function updateCartQuantity(productId, change) {
    const itemInCart = carrito.find(item => item.id === productId);
    if (itemInCart) {
        itemInCart.cantidad += change;
        if (itemInCart.cantidad <= 0) { carrito = carrito.filter(item => item.id !== productId); }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');

    const totalCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (cartCount) cartCount.textContent = totalCount;
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center" style="color: var(--text-muted); padding: 20px 0;">Tu pedido está vacío 🥤</p>';
        if (cartTotalPrice) cartTotalPrice.textContent = 'S/ 0.00';
        return;
    }

    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <small style="color: var(--accent-color); font-weight: bold;">S/ ${item.precio.toFixed(2)} c/u</small>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span><strong>${item.cantidad}</strong></span>
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });
    if (cartTotalPrice) cartTotalPrice.textContent = `S/ ${total.toFixed(2)}`;
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'send-whatsapp-order-btn') {
        if (carrito.length === 0) {
            alert('Por favor, agrega al menos un producto a tu pedido antes de continuar.');
            return;
        }
        let mensaje = "Hola, Juguería Elbia. Quiero realizar el siguiente pedido:\n\n";
        let total = 0;
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            mensaje += `🥤 *${item.nombre}* x${item.cantidad} — S/ ${subtotal.toFixed(2)}\n`;
        });
        mensaje += `\n*Total a pagar: S/ ${total.toFixed(2)}*\n\n¿Podrían confirmarme mi pedido y tiempo estimado de entrega?`;
        const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
    }
});

function initCartModal() {
    const cartModal = document.getElementById('cart-modal');
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartModal);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartModal);
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) closeCartModal();
        });
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) cartModal.classList.add('active');
}

function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) cartModal.classList.remove('active');
}

function initMenuMobile() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => { navMenu.classList.toggle('active'); });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => { navMenu.classList.remove('active'); });
        });
    }
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            if (category === 'all') { renderProducts(productos); } else {
                const filtered = productos.filter(p => p.categoria === category);
                renderProducts(filtered);
            }
        });
    });
}

function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); }
    });
}

/* =====================================================
   CHATBOT ASISTENTE DE JUGOS - ELBIA (versión Vercel)
   ===================================================== */
let conversationHistory = [];

function initChatbot() {
  const chatToggle = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");
  const chatClose = document.getElementById("chat-close");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatMessages = document.getElementById("chat-messages");

  if (!chatToggle || !chatContainer) return;

  chatToggle.addEventListener("click", function (e) {
    e.preventDefault();
    chatContainer.classList.toggle("chat-hidden");

    if (!chatContainer.classList.contains("chat-hidden")) {
      if (chatMessages && chatMessages.children.length === 0) {
        addMessage("bot", "¡Hola! 👋 Soy el Asistente de Jugos de Elbia. ¿Qué te apetece hoy? ¿Algo energizante, dulce, digestivo o un sándwich?");
      }
      setTimeout(() => {
        if (chatInput) chatInput.focus();
      }, 150);
    }
  });

  if (chatClose) {
    chatClose.addEventListener("click", function (e) {
      e.preventDefault();
      chatContainer.classList.add("chat-hidden");
    });
  }

  if (chatSend) {
    chatSend.addEventListener("click", function (e) {
      e.preventDefault();
      sendMessage();
    });
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

async function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  chatInput.value = "";
  chatSend.disabled = true;

  const loadingId = addMessage("bot", "Pensando...", true);

  try {
    conversationHistory.push({
      role: "user",
      parts: [{ text: text }]
    });

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: conversationHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}`);
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error("La IA no devolvió respuesta");
    }

    conversationHistory.push({
      role: "model",
      parts: [{ text: botReply }]
    });

    const loadingElem = document.getElementById(loadingId);
    if (loadingElem) loadingElem.remove();
    addMessage("bot", botReply);

  } catch (error) {
    const loadingElem = document.getElementById(loadingId);
    if (loadingElem) loadingElem.remove();
    console.error("Error en chatbot:", error);
    addMessage("bot", `Error: ${error.message}`);
  } finally {
    chatSend.disabled = false;
    if (chatInput) chatInput.focus();
  }
}

function addMessage(role, text, isLoading = false) {
  const chatMessages = document.getElementById("chat-messages");
  if (!chatMessages) return "";

  const div = document.createElement("div");
  const id = "msg-" + Date.now() + Math.random().toString(36).slice(2);
  div.id = id;
  div.className = `message ${role}${isLoading ? " loading" : ""}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return id;
}

// Inicio seguro
document.addEventListener("DOMContentLoaded", () => {
  try { initApp(); } catch (e) { console.error("Error en app:", e); }
  try { initChatbot(); } catch (e) { console.error("Error en bot:", e); }
});