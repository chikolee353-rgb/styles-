// Cart Management
let cart = [];
const whatsappNumber = '263712537788';
const whatsappNumber2 = '0781656747';

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartDisplay();
});

// Add item to cart
function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price,
        id: Date.now()
    };
    
    cart.push(product);
    saveCart();
    updateCartDisplay();
    
    // Show success message
    showNotification(`${productName} added to cart!`);
    
    // Scroll to cart section if visible
    const cartSection = document.getElementById('cartSection');
    if (cartSection) {
        setTimeout(() => {
            cartSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartSection = document.getElementById('cartSection');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartSection) return; // If we're not on pricing page, skip
    
    if (cart.length === 0) {
        cartSection.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }
    
    cartSection.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update totals
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('styles_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('styles_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Continue shopping
function continueShopping() {
    const cartSection = document.getElementById('cartSection');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Checkout - redirect to WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Build order message
    let orderMessage = 'Hello! 👋 I would like to place an order from STYLES TV:\n\n';
    orderMessage += '═══════════════════\n';
    
    let total = 0;
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name}\n`;
        orderMessage += `   Price: $${item.price.toFixed(2)}\n\n`;
        total += item.price;
    });
    
    orderMessage += '═══════════════════\n';
    orderMessage += `TOTAL: $${total.toFixed(2)}\n\n`;
    orderMessage += 'Please proceed with this order.';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
    
    // Clear cart after checkout
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartDisplay();
        showNotification('Order sent! Thank you for your purchase 🎉');
    }, 500);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066ff, #1e88ff);
        color: white;
        padding: 1rem 2rem;
        border-radius: 6px;
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.head.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add ripple effect on button click
function addRippleEffect() {
    const buttons = document.querySelectorAll('.add-to-cart-btn, .cta-button, .checkout-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            // Add ripple animation if not already in head
            if (!document.head.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize ripple effects when DOM is ready
document.addEventListener('DOMContentLoaded', addRippleEffect);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to clear cart (on pricing page)
    if (e.key === 'Escape' && document.getElementById('cartSection')) {
        if (cart.length > 0) {
            if (confirm('Clear your cart?')) {
                cart = [];
                saveCart();
                updateCartDisplay();
            }
        }
    }
});

// Mobile menu toggle (if you add mobile menu functionality)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.pricing-card, .reason-card, .guarantee-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Log cart status
console.log('STYLES TV - Website Builder');
console.log('Cart system loaded and ready');
