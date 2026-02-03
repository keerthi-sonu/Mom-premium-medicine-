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


    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const upiDetails = document.getElementById('upi-details');
    const cardDetails = document.getElementById('card-details');

    function togglePaymentDetails() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

        if (upiDetails) upiDetails.style.display = 'none';
        if (cardDetails) cardDetails.style.display = 'none';

        if (selectedPayment === 'upi') {
            if (upiDetails) upiDetails.style.display = 'block';
        } else if (selectedPayment === 'card') {
            if (cardDetails) cardDetails.style.display = 'block';
        }
    }

    togglePaymentDetails();

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });

    if (proceedBtn) {
        proceedBtn.addEventListener('click', function () {
            const requiredInputs = document.querySelectorAll('#fullName, #mobile, #houseNo, #street, #city, #state, #pincode');
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

            const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

            if (selectedPayment === 'card') {
                const cardInputs = document.querySelectorAll('#cardNum, #cardExpiry, #cardCvv, #cardName');
                let isCardValid = true;
                cardInputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.style.borderColor = 'red';
                        isCardValid = false;
                    } else {
                        input.style.borderColor = '#c8d6d5';
                    }
                });

                if (!isCardValid) {
                    alert('Please enter valid card details.');
                    return;
                }
            }

            const proceedBtn = document.getElementById('proceedBtn');
            const originalText = proceedBtn.innerHTML;
            proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            proceedBtn.disabled = true;

            setTimeout(() => {
                localStorage.removeItem('cart');
                window.location.href = 'order-success.html';
            }, 2000);
        });
    }
});

const mobileInput=document.getElementById("mobile");
const mobileError=document.getElementById("mobileError");

mobileInput.addEventListener("input",function(){
  this.value=this.value.replace(/[^0-9]/g, "");

   if (this.value.length > 0 && !/^[6-9]/.test(this.value)) {
      this.value = this.value.slice(0, -1);
    }

    if(this.value.length===10){
      mobileError.textContent="";
    }else{
      mobileError.textContent="Mobile number must start with 6-9 and be 10 digits";
    }
})
