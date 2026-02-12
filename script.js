
const products = [
    {
        id: 1,
        name: "Кольцо-цветок",
        price: 1800,
        description: "Доступно в розовом цвете",
        category: "Кольца",
        image: "images/ring1.png"
    },
    {
        id: 2,
        name: "Плетеные четки с крестом",
        price: 3000,
        description: "В серебряном цвете",
        category: "Ожерелья",
        image: "images/nec1.png"
    },
    {
        id: 3,
        name: "Плетеные четки с крестом",
        price: 3000,
        description: "В черном цвете",
        category: "Ожерелья",
        image: "images/nec2.png"
    },
    {
        id: 4,
        name: "Плетеные четки с крестом",
        price: 3000,
        description: "В белом цвете",
        category: "Ожерелья",
        image: "images/nec4.png"
    },
    {
        id: 5,
        name: "Брелок 'Сакура'",
        price: 2500,
        description: "Белый цветок + дерево",
        category: "Брелоки",
        image: "images/thing.png"
    },
    {
        id: 6,
        name: "Чокер с цветами",
        price: 3500,
        description: "Доступен в розовом цвете",
        category: "Ожерелья",
        image: "images/nec3.png"
    },
    {
        id: 7,
        name: "Кольцо 'Sparkle'",
        price: 2000,
        description: "В белом цвете",
        category: "Кольца",
        image: "images/ring2.png"
    },
    
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
    
    
    document.querySelector('.cart-icon').addEventListener('click', toggleCart);
    document.querySelector('.close-cart').addEventListener('click', toggleCart);
    document.getElementById('checkout-btn').addEventListener('click', openOrderModal);
    document.querySelector('.close-modal').addEventListener('click', closeOrderModal);
    document.getElementById('cancel-order').addEventListener('click', closeOrderModal);
    document.getElementById('order-form').addEventListener('submit', submitOrder);
    
    
    document.getElementById('order-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeOrderModal();
        }
    });
});


function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Украшение'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <p class="product-description">${product.description}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Добавить в корзину
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}


function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    renderCart();
    updateCartCount();
    showCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
