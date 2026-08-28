/* ==========================================================================
   JUGUERÍA ELBIA - INTERACTIVIDAD & SISTEMA DE PEDIDOS WHATSAPP
   ========================================================================== */

// 1. CONFIGURACIÓN DEL NÚMERO DE WHATSAPP (Reemplaza con tu número real)
const NUMERO_WHATSAPP = "51900000000"; 

// 2. BASE DE DATOS LOCAL DE PRODUCTOS CON IMÁGENES ESTABLES
const productos = [
    // --- JUGOS NATURALES ---
    {
        id: 1,
        nombre: "Jugo de Papaya",
        descripcion: "Jugo natural recién licuado, nutritivo y digestivo.",
        precio: 8.00,
        categoria: "jugos",
        imagen: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },
    {
        id: 2,
        nombre: "Jugo de Fresa",
        descripcion: "Fresas seleccionadas al instante con un toque natural.",
        precio: 9.00,
        categoria: "jugos",
        imagen: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: false
    },
    {
        id: 3,
        nombre: "Jugo de Mango",
        descripcion: "Intenso sabor tropical, cremoso y lleno de energía.",
        precio: 9.50,
        categoria: "jugos",
        imagen: "https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },
    {
        id: 4,
        nombre: "Jugo Surtido Elbia",
        descripcion: "Mezcla tradicional de papaya, piña, plátano y manzana.",
        precio: 10.00,
        categoria: "jugos",
        imagen: "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },
    {
        id: 5,
        nombre: "Jugo Especial de la Casa",
        descripcion: "Frutas surtidas + algarrobina + huevo + miel + leche.",
        precio: 13.00,
        categoria: "jugos",
        imagen: "https://images.pexels.com/photos/8004565/pexels-photo-8004565.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },

    // --- SÁNDWICHES ---
    {
        id: 6,
        nombre: "Sándwich de Pollo Deshilachado",
        descripcion: "Pechuga deshilachada con mayonesa artesanal de la casa.",
        precio: 7.50,
        categoria: "sandwiches",
        imagen: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: false
    },
    {
        id: 7,
        nombre: "Sándwich de Pollo con Palta",
        descripcion: "Pollo artesanal acompañado de láminas de palta fresca.",
        precio: 9.00,
        categoria: "sandwiches",
        imagen: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },
    {
        id: 8,
        nombre: "Sándwich Mixto (Jamón y Queso)",
        descripcion: "Queso derretido y jamón de primera en pan caliente tostado.",
        precio: 7.00,
        categoria: "sandwiches",
        imagen: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: false
    },
    {
        id: 9,
        nombre: "Sándwich Especial Elbia",
        descripcion: "Pollo, huevo duro, tocino crocante, queso y palta.",
        precio: 12.00,
        categoria: "sandwiches",
        imagen: "https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    },

    // --- EXTRAS Y COMPLEMENTOS ---
    {
        id: 10,
        nombre: "Ensalada de Frutas Clásica",
        descripcion: "Frutas variadas de estación con miel de abeja y algarrobina.",
        precio: 11.00,
        categoria: "extras",
        imagen: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: false
    },
    {
        id: 11,
        nombre: "Ensalada de Frutas con Yogurt & Cereal",
        descripcion: "Mix de frutas, yogurt natural artesanal, granola y miel.",
        precio: 13.50,
        categoria: "extras",
        imagen: "https://images.pexels.com/photos/128865/pexels-photo-128865.jpeg?auto=compress&cs=tinysrgb&w=500",
        destacado: true
    }
];

// 3. ESTADO DEL CARRITO
let carrito = [];

// 4. FUNCION DE INICIALIZACIÓN FUERZA LA CARGA DE LA CARTA
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

// Renderizar Productos en la Carta
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
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Agregar al Carrito
function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    const itemInCart = carrito.find(item => item.id === productId);

    if (itemInCart) {
        itemInCart.cantidad++;
    } else {
        carrito.push({ ...product, cantidad: 1 });
    }

    updateCartUI();
    openCartModal();
}

// Actualizar Cantidad
function updateCartQuantity(productId, change) {
    const itemInCart = carrito.find(item => item.id === productId);
    if (itemInCart) {
        itemInCart.cantidad += change;
        if (itemInCart.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== productId);
        }
    }
    updateCartUI();
}

// Actualizar Interfaz del Carrito
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

// Enviar Pedido por WhatsApp
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

// Modal del Carrito
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

// Menú Móvil
function initMenuMobile() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Filtros de Categorías
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            if (category === 'all') {
                renderProducts(productos);
            } else {
                const filtered = productos.filter(p => p.categoria === category);
                renderProducts(filtered);
            }
        });
    });
}

// Scroll en el Header
function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Ejecutar al cargar el documento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
/* =====================================================
   CHATBOT ASISTENTE DE JUGOS - ELBIA (versión mejorada)
   ===================================================== */

const GEMINI_API_KEY = ""; // ← pega tu key aquí
const MODEL = "gemini-3.6-flash";

const SYSTEM_INSTRUCTION = `Eres el asistente oficial de Juguería Elbia, una juguería peruana de jugos naturales, sándwiches y ensaladas de frutas.

Responde SIEMPRE en español, de forma amable, cercana y entusiasta (máximo 3-8 oraciones).

Productos reales de la carta:
- Jugos: Papaya (S/8), Fresa (S/9), Mango (S/9.50), Surtido Elbia (S/10), Especial de la Casa (S/13)
- Sándwiches: Pollo deshilachado (S/7.50), Pollo con palta (S/9), Mixto jamón y queso (S/7), Especial Elbia (S/12)
- Extras: Ensalada de frutas clásica (S/11), Ensalada con yogurt y cereal (S/13.50)

Reglas:
1. Recomienda según lo que el cliente pide (energía, digestivo, dulce, etc.).
2. Menciona beneficios de forma natural.
3. Si tiene alergias o restricciones, respétalas.
4. Si pregunta por pedido, dile que puede usar el carrito de la página o el botón de WhatsApp.
5. Nunca inventes precios ni digas que tú tomas el pedido.`;

let conversationHistory = [];

const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

if (chatToggle && chatContainer) {
  chatToggle.addEventListener("click", () => {
    chatContainer.classList.toggle("chat-hidden");
    if (!chatContainer.classList.contains("chat-hidden")) {
      chatInput.focus();
      if (chatMessages.children.length === 0) {
        addMessage("bot", "¡Hola! 👋 Soy el Asistente de Jugos de Elbia. ¿Qué te apetece hoy? ¿Algo energizante, dulce, digestivo o un sándwich?");
      }
    }
  });

  chatClose.addEventListener("click", () => {
    chatContainer.classList.add("chat-hidden");
  });
}

async function sendMessage() {
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Gemini:", data);
      throw new Error(data.error?.message || `Error ${response.status}`);
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error("La IA no devolvió respuesta");
    }

    conversationHistory.push({
      role: "model",
      parts: [{ text: botReply }]
    });

    document.getElementById(loadingId).remove();
    addMessage("bot", botReply);

  } catch (error) {
    document.getElementById(loadingId)?.remove();
    console.error("Error completo:", error);
    addMessage("bot", `Error: ${error.message}`);
  } finally {
    chatSend.disabled = false;
    chatInput.focus();
  }
}

function addMessage(role, text, isLoading = false) {
  const div = document.createElement("div");
  const id = "msg-" + Date.now() + Math.random().toString(36).slice(2);
  div.id = id;
  div.className = `message ${role}${isLoading ? " loading" : ""}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return id;
}

if (chatSend) chatSend.addEventListener("click", sendMessage);
if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}