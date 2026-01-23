// Cart management functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all Add buttons
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart button listeners on home page
  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', function() {
      addToCart(this);
    });
  });

  // Update cart count
  updateCartCount();

  // Load cart items if on cart page
  if (document.getElementById('cart-items')) {
    loadCartItems();
  }
});

function addToCart(button) {
  const id = button.getAttribute('data-id');
  const name = button.getAttribute('data-name');
  const price = parseFloat(button.getAttribute('data-price'));
  const image = button.getAttribute('data-image');

  // Check if item already exists in cart
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Show feedback
  button.textContent = 'Added!';
  setTimeout(() => {
    button.textContent = 'Add';
  }, 1500);
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart');

  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    emptyCartMessage.style.display = 'block';
    document.querySelector('.cart-summary').style.opacity = '0.5';
    document.querySelector('.checkout-btn').disabled = true;
  } else {
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    document.querySelector('.cart-summary').style.opacity = '1';
    document.querySelector('.checkout-btn').disabled = false;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-price">₹${item.price.toLocaleString('en-IN')}</p>
        </div>
        <div class="item-quantity">
          <button class="qty-btn" onclick="decreaseQuantity('${item.id}')">−</button>
          <input type="number" class="qty-input" value="${item.quantity}" readonly>
          <button class="qty-btn" onclick="increaseQuantity('${item.id}')">+</button>
        </div>
        <div class="item-total">
          <p>₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  updateSummary();
}

function increaseQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

function decreaseQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(itemId);
      return;
    }
    updateCart();
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCart();
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartItems();
}

function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('tax').textContent = '₹' + tax.toLocaleString('en-IN');
  document.getElementById('total').textContent = '₹' + total.toLocaleString('en-IN');
}
