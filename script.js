// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== TOAST =====
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ===== ADD TO CART (PRODUCTS PAGE) =====
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product-card .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.target.closest('.product-card');
            if (!card) return;
            const name = card.dataset.name || card.querySelector('h3')?.textContent || 'Product';
            const price = card.dataset.price || card.querySelector('.price')?.textContent.replace('$', '') || '0';
            showToast(`🛒 ${name} added to cart! ($${price})`);
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 2000);
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showToast('Please enter a valid email address.', 2000);
                return;
            }
            showToast('Message sent! We’ll get back to you soon.', 3000);
            contactForm.reset();
        });
    }
});

// ===== PRODUCT DETAILS FUNCTIONS =====
function changeImage(element) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    const mainImg = document.getElementById('mainProductImg');
    if (mainImg) mainImg.src = element.src;
}

function selectColor(element, colorName) {
    document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    showToast(`Color selected: ${colorName}`, 1500);
}

function incrementQty() {
    const qty = document.getElementById('quantity');
    if (qty) qty.value = parseInt(qty.value) + 1;
}

function decrementQty() {
    const qty = document.getElementById('quantity');
    if (qty && parseInt(qty.value) > 1) qty.value = parseInt(qty.value) - 1;
}

function addToCartDetails() {
    const name = document.querySelector('.product-info h1')?.textContent || 'Product';
    const priceElem = document.querySelector('.price');
    const price = priceElem ? priceElem.textContent.split(' ')[0].replace('$', '') : '0';
    const qty = document.getElementById('quantity')?.value || 1;
    const color = document.querySelector('.color-circle.active')?.style.backgroundColor || 'selected';
    const total = (parseFloat(price) * parseInt(qty)).toFixed(2);
    showToast(`✅ Added ${qty} x ${name} (${color}) to cart. Total: $${total}`);
}

function buyNow() {
    const name = document.querySelector('.product-info h1')?.textContent || 'Product';
    const qty = document.getElementById('quantity')?.value || 1;
    showToast(`⚡ Proceeding to buy ${qty} x ${name}`, 2500);
}