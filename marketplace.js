// Marketplace functionality
let cart = [];
let cartTotal = 0;
const productDatabase = {
    "peace-Lily": {
      id: 1,
      name: "Classic Peace Lily",
      price: 29.99,
      originalPrice: 39.99,  
      image: "./rose9.jpeg",
      seller: "Green Paradise",
      rating: "4.8",
      reviews: 127,
      shipping: "Free shipping",
      description: "A classic peace lily for your home.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
    "Premium-peace-lily": {
      id: 2,
      name: "Premium peace lily",
      price: 45.99,
      originalPrice: 50.99,  
      image: "./rose11.jpeg",
      seller: "plant masters",
      rating: "4.8",
      reviews: 127,
      shipping: "Free shipping",
      description: "A Premium peace lily for your home.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
    "Tropical-Foliage": {
      id: 3,
      name: "Tropical Foliage",
      price: 29.99,
      originalPrice: 39.99,  
      image: "./rose1.jpeg",
      seller: "Urban Jungle",
      rating: "4.5",
      reviews: 127,
      shipping: "Free shipping",
      description: "A Sensitive Tropical Foliage.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
    "Succulents-Garden": {
      id: 4,
      name: "Delicate Succulents Garden",
      price: 29.99,
      originalPrice: 39.99,  
      image: "./rose 4.jpeg",
      seller: "Sold by: Desert Bloom",
      rating: "4.8",
      reviews: 127,
      shipping: "Free shipping",
      description: "A classic Delicated Succulents Garden for your home.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
    "designer-lily": {
      id: 5,
      name: "Designer Lily ",
      price: 29.99,
      originalPrice: 39.99,  
      image: "./rose11.jpeg",
      seller: "Sold by: Luxury Plant Co.",
      rating: "4.8",
      reviews: 127,
      shipping: "Free shipping",
      description: "A Designer Lily for you and your home family love.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
    "luxury vase plant": {
      id: 6,
      name: "Luxury Vase Plant",
      price: 29.99,
      originalPrice: 39.99,  
      image: "./rose1.jpeg",
      seller: "Sold by: Elite Gardens",
      rating: "4.8",
      reviews: 127,
      shipping: "Free shipping",
      description: "A Modal Luxury Vase Plant.",
      features: ["Air purifying", "Low maintenance"],
      care: ["Water weekly", "Indirect sunlight"],
    },
  };

document.addEventListener("DOMContentLoaded", function () {});
  initializeEventListeners();
    UpdateCartDisplay();

function initializeEventListeners() {
  document.getElementById("cart-toggle")?.addEventListener("click", toggleCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("search-btn")?.addEventListener("click", performSearch);
  document.getElementById("search-input")?.addEventListener("keypress", function(e) {
    if (e.key === "Enter") performSearch();
  });
  document.querySelector(".hero-btn")?.addEventListener("click", function() {
    document.getElementById("Categories")?.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      filterProducts(filter);
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      filterProducts(category);
      document.getElementById("Featured")?.scrollIntoView({ behavior: "smooth" });
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      const filterBtn = document.querySelector(`[data-filter="${category}"]`);
      if (filterBtn) filterBtn.classList.add("active");
    });
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      const name = e.target.getAttribute("data-name");
      const price = parseFloat(e.target.getAttribute("data-price"));
      addToCart(id, name, price);
      e.target.textContent = "Added!";
      e.target.style.background = "#27ae60";
      setTimeout(() => {
        e.target.textContent = "Add to cart";
        e.target.style.background = "#2d5a27";
      }, 1000);
    }
    if (e.target.classList.contains("quick-view")) {
      const productId = e.target.getAttribute("data-id");
      showQuickView(productId);
    }
    if (e.target.classList.contains("deal-btn")) {
      document.getElementById("Featured").scrollIntoView({ behavior: "smooth" });
    }
  });

  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.getElementById("quick-view-modal").addEventListener("click", function(e) {
    if (e.target === this) closeModal();
  });
  document.getElementById("overlay").addEventListener("click", function () {
    closeCart();
    closeModal();
  });
  document.querySelector(".checkout-btn").addEventListener("click", checkout);
}

function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = Object.values(productDatabase).find((p) => p.id === id);
    cart.push({
      id:id,
     name:name,
      price:price,
      quantity: 1,
      image: product ? product.image : "./rose1.jpeg",
    });
  }
  cartTotal += price;
    UpdateCartDisplay();
  const cartSidebar = document.getElementById("cart-sidebar");
  cartSidebar?.classList.add("open");
  document.getElementById("overlay")?.classList.add("active");
  setTimeout(() => {
    if (!cartSidebar.matches(":hover")) {
      closeCart();
    }
  }, 2000);
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    const item = cart[itemIndex];
    cartTotal -= item.price * item.quantity;
    cart.splice(itemIndex, 1);
     UpdateCartDisplay();
  }
}

function  UpdateCartDisplay() {
  const cartCount = document.querySelector(".cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");


  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;

  // Update cart total
  if (cartTotalElement) cartTotalElement.textContent = cartTotal.toFixed(2);

  // Update cart items
  if (!cartItems) return;
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem">Your cart is empty</p>';
    return;
  }
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-items";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
       <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
        <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color:white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 0.5rem;">remove</button>
      </div>`;
    cartItems.appendChild(cartItem);
  });
}

function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");
  cartSidebar?.classList.toggle("open");
  overlay?.classList.toggle("active");
}

function closeCart() {
  document.getElementById("cart-sidebar")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("active");
}

function filterProducts(category) {
  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    const productCategory = product.getAttribute("data-category");
    product.style.display = (category === "all" || productCategory === category) ? "block" : "none";
  });
}

function performSearch() {
  const searchTerm = document.getElementById("search-input")?.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    const productName = product.querySelector("h3")?.textContent.toLowerCase() || "";
    const productSeller = product.querySelector(".seller")?.textContent.toLowerCase() || "";
    product.style.display = (productName.includes(searchTerm) || productSeller.includes(searchTerm)) ? "block" : "none";
  });
  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
}

function showQuickView(productId) {
  const product = productDatabase[productId];
  if (!product) return;
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div class="product-detail">
      <div><img src="${product.image}" alt="${product.name}"></div>
      <div>
        <h1>${product.name}</h1>
        <div class="seller">Sold by: ${product.seller}</div>
        <div class="rating">
          <span class="stars">${product.rating}</span>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        <div class="price-section">
          <span class="current-price">$${product.price}</span>
          ${product.orginalPrice ? `<span class="original-price">$${product.orginalPrice}</span>` : ""}
        </div>
        <div class="shipping">${product.shipping}</div>
        <p>${product.description}</p>
        <div class="product-specs">
          <h4>Key Features:</h4>
          <ul>${product.features.map((f) => `<li>${f}</li>`).join("")}</ul>
          <h4>Care Instructions:</h4>
          <ul>${product.care.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to cart - $${product.price}</button>
      </div>
    </div>`;
  document.getElementById("quick-view-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("quick-view-modal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const orderSummary = cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join("\n");
  alert(`Order Summary:\n\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nThank you for your order! This is a Planthub marketplace.`);
  cart = [];
  cartTotal = 0;
    UpdateCartDisplay();
  closeCart();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
