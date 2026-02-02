let cart = JSON.parse(localStorage.getItem('cart')) || [];

const medicineDetails = {
  1: {
    id: "1",
    name: "Zolgensma (gene therapy)",
    image: "https://www.clinicaltrialsarena.com/wp-content/uploads/sites/22/2019/08/2l-Image-Zolgensma.jpg",
    size: "5.5ml",
    price: "17010500",
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
    overview: "Alecensa (alectinib) is a prescription medication primarily used to treat specific forms of non-small cell lung cancer (NSCLC) in adults. It functions as an anaplastic lymphoma kinase (ALK) inhibitor.",
    uses: "First-line treatment of adult patients with ALK-positive advanced NSCLC. Adjuvant treatment following complete tumor resection for adult patients with ALK-positive NSCLC who are at high risk of recurrence.",
    sideEffects: "Constipation, tiredness, muscle aches, swelling, anemia, rash, nausea, and headache. Serious side effects may include liver, lung, or kidney problems.",
    howToUse: "Take orally as capsules with food, typically twice daily. Determine ALK-positivity before starting. Do not open or crush capsules.",
    drugInteractions: "Avoid taking with strong CYP3A inhibitors or inducers. Be cautious with drugs that slow heart rate."
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
  },
  7: {
    id: "7",
    name: "Jardiance 25mg (Empagliflozin)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1770008841/jard1_ayarkc.avif",
    size: "10 Tablets",
    price: "1200",
    overview: "Jardiance is used with diet and exercise to lower blood sugar in adults with type 2 diabetes.",
    uses: "Management of type 2 diabetes and reduction of cardiovascular death risk.",
    sideEffects: "Urinary tract infections, yeast infections, and increased urination.",
    howToUse: "Take once daily in the morning, with or without food.",
    drugInteractions: "May interact with diuretics and insulin secretagogues."
  },
  8: {
    id: "8",
    name: "Rybelsus 7mg (Semaglutide)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1770008887/ryb_dphhsx.avif",
    size: "10 Tablets",
    price: "12000",
    overview: "Rybelsus is the first and only pill that works like a natural hormone to lower blood sugar.",
    uses: "Improvement of glycemic control in adults with type 2 diabetes mellitus.",
    sideEffects: "Nausea, stomach pain, diarrhea, and decreased appetite.",
    howToUse: "Take once daily on an empty stomach with a sip of plain water.",
    drugInteractions: "May delay absorption of other oral medications."
  },
  9: {
    id: "9",
    name: "Januvia 100mg (Sitagliptin)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1770008925/janu_mgubod.avif",
    size: "10 Tablets",
    price: "1500",
    overview: "Januvia is a prescription medicine used along with diet and exercise to lower blood sugar.",
    uses: "Treatment of type 2 diabetes as monotherapy or combination therapy.",
    sideEffects: "Upper respiratory tract infection, stuffy or runny nose, and headache.",
    howToUse: "Take once daily with or without food.",
    drugInteractions: "Low risk of interactions; monitor with digoxin."
  },
  10: {
    id: "10",
    name: "Entresto 200mg (Sacubitril/Valsartan)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1770008990/enstro_xqlmpt.jpg",
    size: "10 Tablets",
    price: "3500",
    overview: "Entresto is a breakthrough treatment for patients with chronic heart failure and high BP.",
    uses: "Reduction of cardiovascular death and hospitalization risk in heart failure.",
    sideEffects: "Low blood pressure, high potassium levels, and kidney problems.",
    howToUse: "Take twice daily as prescribed by your doctor.",
    drugInteractions: "Do not take with ACE inhibitors or other ARBs."
  },
  11: {
    id: "11",
    name: "Telma 40mg (Telmisartan)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1770009113/tel_yh49eo.webp",
    size: "15 Tablets",
    price: "800",
    overview: "Telma 40 contains Telmisartan, an ARB used to treat high blood pressure.",
    uses: "Treatment of hypertension and reduction of cardiovascular risk.",
    sideEffects: "Dizziness, upper respiratory tract infection, and back pain.",
    howToUse: "Take once daily with or without food.",
    drugInteractions: "Monitor with potassium-sparing diuretics and lithium."
  },
  12: {
    id: "12",
    name: "Herceptin (Trastuzumab)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769405980/herceptin_pg47dw.jpg",
    size: "1 Vial",
    price: "150000",
    overview: "Herceptin is a targeted therapy used to treat HER2-positive breast and stomach cancers.",
    uses: "Adjuvant treatment of HER2-overexpressing node-positive or node-negative breast cancer.",
    sideEffects: "Fever, nausea, vomiting, infusion reactions, and heart problems.",
    howToUse: "Administered as an intravenous (IV) infusion by a healthcare provider.",
    drugInteractions: "Inform doctor about all medications, especially those affecting the heart."
  },
  13: {
    id: "13",
    name: "Avastin (Bevacizumab)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769406346/Avastin_zzsw61.png",
    size: "1 Vial",
    price: "85000",
    overview: "Avastin is a tumor-starving (anti-angiogenic) therapy that blocks VEGF to slow tumor growth.",
    uses: "Used for colorectal, lung, glioblastoma, kidney, cervical, and ovarian cancers.",
    sideEffects: "High blood pressure, tiredness, headache, and nosebleeds.",
    howToUse: "Administered as an intravenous (IV) infusion every 2 or 3 weeks.",
    drugInteractions: "Monitor with other cancer drugs; may increase risk of bleeding."
  },
  14: {
    id: "14",
    name: "Perjeta (Pertuzumab)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769406628/002c9844a0ce4e2ca61503dfe4de04a7-perjeta-vial_26_b5aexr.jpg",
    size: "1 Vial",
    price: "120000",
    overview: "Perjeta is a targeted therapy used in combination with Herceptin for HER2-positive breast cancer.",
    uses: "Treatment of HER2-positive metastatic breast cancer and early breast cancer.",
    sideEffects: "Diarrhea, hair loss, low white blood cell count, and nausea.",
    howToUse: "Administered as an intravenous (IV) infusion by a healthcare professional.",
    drugInteractions: "Inform healthcare providers about all your medical conditions."
  },
  15: {
    id: "15",
    name: "Tagrisso (Osimertinib)",
    image: "https://res.cloudinary.com/dp8wy3ooi/image/upload/v1769406963/tag_uzbqqx.webp",
    size: "30 Tablets",
    price: "180000",
    overview: "Tagrisso is a targeted kinase inhibitor used for certain types of non-small cell lung cancer.",
    uses: "First-line treatment of patients with metastatic NSCLC whose tumors have EGFR mutations.",
    sideEffects: "Diarrhea, rash, dry skin, and nail changes (e.g., redness, soreness).",
    howToUse: "Take one tablet once daily, with or without food.",
    drugInteractions: "Avoid strong CYP3A4 inducers like rifampin and St. John's Wort."
  }
};

function viewMedicineDetails(medicineId) {
  if (medicineDetails[medicineId]) {
    const medicine = { ...medicineDetails[medicineId], id: medicineId.toString() };
    localStorage.setItem('selectedMedicine', JSON.stringify(medicine));
    console.log('Navigating to medicine details for ID:', medicineId);
    window.location.href = './medicine-details.html';
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

  // Initialize product buttons from cart
  initProductButtons();

  // Slider Scroll Logic
  const slider = document.getElementById('productSlider');
  const scrollLeft = document.getElementById('scrollLeft');
  const scrollRight = document.getElementById('scrollRight');

  if (slider && scrollLeft && scrollRight) {
    scrollLeft.addEventListener('click', () => {
      slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRight.addEventListener('click', () => {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
});

function initProductButtons() {
  const allAddBtns = document.querySelectorAll('.add-btn, .add-to-cart-btn');
  allAddBtns.forEach(btn => {
    const id = btn.getAttribute('data-id');
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      updateButtonToQuantity(btn, cartItem.quantity);
    }
  });
}

function updateButtonToQuantity(btn, quantity) {
  const parent = btn.parentElement;
  if (!parent) return;

  const id = btn.getAttribute('data-id');
  const name = btn.getAttribute('data-name');
  const price = btn.getAttribute('data-price');
  const image = btn.getAttribute('data-image');

  // Create quantity selector
  const qtyDiv = document.createElement('div');
  qtyDiv.className = 'quantity-controls';
  qtyDiv.setAttribute('data-id', id);
  qtyDiv.innerHTML = `
        <button onclick="handleQuantityChange(event, '${id}', -1)">−</button>
        <span>${quantity}</span>
        <button onclick="handleQuantityChange(event, '${id}', 1)">+</button>
    `;

  // Preserve data attributes for restoration if needed
  qtyDiv.setAttribute('data-name', name);
  qtyDiv.setAttribute('data-price', price);
  qtyDiv.setAttribute('data-image', image);
  qtyDiv.setAttribute('data-class', btn.className);

  btn.replaceWith(qtyDiv);
}

function handleQuantityChange(event, id, delta) {
  event.stopPropagation();
  const cartItem = cart.find(item => item.id === id);

  if (cartItem) {
    cartItem.quantity += delta;
    if (cartItem.quantity <= 0) {
      cart = cart.filter(item => item.id !== id);
      restoreAddButton(id);
    } else {
      updateQtyDisplay(id, cartItem.quantity);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if (document.getElementById('cart-items')) loadCartItems();
}

function updateQtyDisplay(id, quantity) {
  const qtyControls = document.querySelectorAll(`.quantity-controls[data-id="${id}"]`);
  qtyControls.forEach(ctrl => {
    const span = ctrl.querySelector('span');
    if (span) span.textContent = quantity;
  });
}

function restoreAddButton(id) {
  const qtyControls = document.querySelectorAll(`.quantity-controls[data-id="${id}"]`);
  qtyControls.forEach(ctrl => {
    const name = ctrl.getAttribute('data-name');
    const price = ctrl.getAttribute('data-price');
    const image = ctrl.getAttribute('data-image');
    const className = ctrl.getAttribute('data-class');

    const btn = document.createElement('button');
    btn.className = className;
    btn.setAttribute('data-id', id);
    btn.setAttribute('data-name', name);
    btn.setAttribute('data-price', price);
    btn.setAttribute('data-image', image);
    btn.textContent = className.includes('to-cart') ? 'Add to Cart' : 'Add';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      addToCart(this);
    });

    ctrl.replaceWith(btn);
  });
}

function addToCart(button) {
  const id = button.getAttribute('data-id');
  const name = button.getAttribute('data-name');
  const price = parseFloat(button.getAttribute('data-price'));
  const image = button.getAttribute('data-image');

  cart.push({
    id: id,
    name: name,
    price: price,
    image: image,
    quantity: 1
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateButtonToQuantity(button, 1);

  if (document.getElementById('cart-items')) loadCartItems();
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
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    const summary = document.querySelector('.cart-summary');
    if (summary) summary.style.opacity = '0.5';
    const checkout = document.querySelector('.checkout-btn');
    if (checkout) checkout.disabled = true;
  } else {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      cartItemsContainer.style.display = 'block';
    }
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    const summary = document.querySelector('.cart-summary');
    if (summary) summary.style.opacity = '1';
    const checkout = document.querySelector('.checkout-btn');
    if (checkout) checkout.disabled = false;

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
      if (cartItemsContainer) cartItemsContainer.appendChild(cartItem);
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

  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');

  if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
  if (taxEl) taxEl.textContent = '₹' + tax.toLocaleString('en-IN');
  if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
}
