document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const totalAmountEl = document.getElementById('total-amount');
    const cartCountEl = document.querySelector('.cart-count');
    const proceedBtn = document.getElementById('proceedBtn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateOrderSummary() {
        if (cart.length === 0) {
            checkoutItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
            subtotalEl.textContent = '₹0';
            totalAmountEl.textContent = '₹0';
            if (proceedBtn) proceedBtn.disabled = true;
            return;
        }

        checkoutItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkout-item-mini';
            itemDiv.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">x ${item.quantity}</span>
                </div>
                <span class="item-total">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
            `;
            checkoutItemsContainer.appendChild(itemDiv);
        });

        const deliveryFee = 40;
        const total = subtotal + deliveryFee;

        subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
        totalAmountEl.textContent = '₹' + total.toLocaleString('en-IN');

        if (cartCountEl) {
            cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    updateOrderSummary();

    if (proceedBtn) {
        proceedBtn.addEventListener('click', function () {
            // Basic validation
            const requiredInputs = document.querySelectorAll('input[required]');
            let isValid = true;
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#c8d6d5';
                }
            });

            if (!isValid) {
                alert('Please fill in all required delivery details.');
                return;
            }

            // Simple confirmation and clear cart
            alert('Redirecting to secure payment gateway...');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }
});
