let cart = JSON.parse(localStorage.getItem('cart')) || [];

const medicineDetails = {
  1: {
    id: "1",
    name: "Zolgensma (gene therapy)",
    image: "https://www.clinicaltrialsarena.com/wp-content/uploads/sites/22/2019/08/2l-Image-Zolgensma.jpg",
    size: "5.5ml",
    price: "1701050000",
    overview: "Zolgensma is a one-time gene therapy. Used to treat Spinal Muscular Atrophy (SMA). Fixes the genetic root cause, not just symptoms.",
    uses: "Treatment of SMA in children below 2 years. Helps improve muscle strength and survival.",
    sideEffects: "Increased liver enzymes. Vomiting, fever. Low platelet count (rare but serious).",
    howToUse: "Given as a single IV infusion. Administered only in a hospital setting. Steroids are given before and after treatment.",
    drugInteractions: "Live vaccines should be avoided around treatment time. Medicines affecting the liver need careful monitoring."
  },
  2: {
    id: "2",
    name: "Alecensa Capsule (alectinib)",
    image: "https://assets.roche.com/f/176343/2000x1125/bebeb103f9/alecensa.png",
    size: "150mg",
    price: "470592",
    overview: "Alecensa (alectinib) is a kinase inhibitor used to treat specific forms of ALK-positive non-small cell lung cancer (NSCLC).",
    uses: "Treatment of patients with ALK-positive metastatic or early-stage non-small cell lung cancer after surgery.",
    sideEffects: "Fatigue, constipation, swelling in hands or feet, muscle pain, and slow heart rate.",
    howToUse: "Taken orally as capsules, typically 600 mg twice daily with food.",
    drugInteractions: "May interact with drugs that slow heart rate, P-gp substrates, and BCRP substrates."
  },
  3: {
    id: "3",
    name: "Keytruda Injection (pembrolizumab)",
    image: "https://www.pharmaceutical-technology.com/wp-content/uploads/sites/24/2021/10/KEYTRUDA2.jpg",
    size: "100mg/4ml",
    price: "195250",
    overview: "Keytruda (pembrolizumab) is an immunotherapy that works by helping your immune system fight cancer.",
    uses: "Used for various cancers including melanoma, NSCLC, head and neck cancer, and lymphoma.",
    sideEffects: "Fatigue, musculoskeletal pain, rash, diarrhea, and potential immune-related organ inflammation.",
    howToUse: "Administered as an intravenous (IV) infusion every 3 to 6 weeks.",
    drugInteractions: "Inform doctor about all medications; immunosuppressants may interfere with its action."
  },
  4: {
    id: "4",
    name: "GT Capsule (Ayurveda)",
    image: "https://www.bbassets.com/media/uploads/p/l/40206162_2-kerala-ayurveda-gt-capsules.jpg",
    size: "10 caps",
    price: "76599",
    overview: "GT Capsule is an Ayurvedic formulation used for bone and joint health, and chronic skin conditions.",
    uses: "Effective for osteoarthritis, osteoporosis, eczema, psoriasis, and joint stiffness.",
    sideEffects: "Generally safe; may cause mild gastric irritation if taken in excess.",
    howToUse: "Typically 1-2 capsules twice daily after meals with warm water.",
    drugInteractions: "May interact with antacids and anticoagulant therapy. Discuss with a practitioner."
  },
  5: {
    id: "5",
    name: "Atezolizumab (Cancer effective)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769764432/atez_npnwhp.webp",
    size: "60mg/1ml",
    price: "198000",
    overview: "Atezolizumab is a PD-L1 inhibitor immunotherapy that helps the immune system attack cancer cells.",
    uses: "Used for non-small cell lung cancer, small cell lung cancer, and certain liver cancers.",
    sideEffects: "Fatigue, rash, nausea, and potential immune-mediated inflammation of various organs.",
    howToUse: "Given as an intravenous (IV) infusion every 2, 3, or 4 weeks.",
    drugInteractions: "May interact with other cancer treatments and immunosuppressants."
  },
  6: {
    id: "6",
    name: "Ramucirumab (Cyramza)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769765228/ramu_jga1jc.webp",
    size: "10mg/1ml",
    price: "180000",
    overview: "Ramucirumab (Cyramza) is a monoclonal antibody that inhibits tumor blood vessel growth (VEGF inhibitor).",
    uses: "Treatment for advanced stomach cancer, colorectal cancer, lung cancer, and liver cancer.",
    sideEffects: "Fatigue, high blood pressure, diarrhea, and low blood cell counts.",
    howToUse: "Administered as an intravenous (IV) infusion every 2 to 3 weeks.",
    drugInteractions: "Inform doctor about all medications. Live vaccines should be avoided during treatment."
  }
};

function viewMedicineDetails(medicineId) {
  if (medicineDetails[medicineId]) {
    localStorage.setItem('selectedMedicine', JSON.stringify(medicineDetails[medicineId]));
    window.location.href = 'medicine-details.html';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      addToCart(this);
    });
  });

  updateCartCount();

  if (document.getElementById('cart-items')) {
    loadCartItems();
  }
});

function addToCart(button) {
  const id = button.getAttribute('data-id');
  const name = button.getAttribute('data-name');
  const price = parseFloat(button.getAttribute('data-price'));
  const image = button.getAttribute('data-image');

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

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();

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
