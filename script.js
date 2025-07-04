function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');
}

// ✅ Auto-close menu after clicking nav link (mobile UX fix)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.remove('active');
  });
});
// 🔝 Show/hide scroll-to-top button on scroll
window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// 🔝 Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
// 🖼️ Lightbox image open
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

galleryImages.forEach(img => {
  img.addEventListener('click', function () {
    lightbox.style.display = 'block';
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
}
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
// ⏳ Hide loader with delay on page load
window.addEventListener("load", function () {
  setTimeout(() => {
    const loaderWrapper = document.getElementById("loader-wrapper");
    loaderWrapper.style.display = "none";
  }, 500); // 0.5 second ka delay
});
// 🌙 Dark Mode Toggle Logic
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // 👇 Button Text Toggle
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});

// ⭐ Star Rating Logic
let selectedRating = 0;
const stars = document.querySelectorAll(".star");

stars.forEach(star => {
  star.addEventListener("click", function () {
    selectedRating = parseInt(this.getAttribute("data-value"));
    stars.forEach(s => s.classList.remove("selected"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("selected");
    }
  });
});

// 📩 Submit Review
function submitReview(event) {
  event.preventDefault();
  const name = document.getElementById("reviewerName").value;
  const text = document.getElementById("reviewText").value;

  if (selectedRating === 0) {
    alert("Please select a star rating!");
    return;
  }

  const output = document.getElementById("reviewOutput");
  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = `<strong>${name}</strong> - ${"⭐".repeat(selectedRating)}<br>${text}`;
  output.prepend(card);

  // Reset form
  document.querySelector(".review-form").reset();
  selectedRating = 0;
  stars.forEach(s => s.classList.remove("selected"));
}

// 👁️ Visitor Counter Using LocalStorage
window.addEventListener("load", () => {
  let count = localStorage.getItem("visitCount");

  if (count) {
    count = parseInt(count) + 1;
  } else {
    count = 1;
  }

  localStorage.setItem("visitCount", count);
  document.getElementById("visitCount").textContent = count;
});

// 🔍 Menu Search Filter
function filterMenuItems() {
  const input = document.getElementById("menuSearch").value.toLowerCase();
  const menuItems = document.querySelectorAll(".menu-table li");

  menuItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(input) ? "flex" : "none";
  });
}

// 📸 Swiper Gallery Init
const swiper = new Swiper('.gallery-slider', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

// 🎁 Countdown Timer (10-minute offer)
let offerTime = 10 * 60; // 10 minutes in seconds

function startCountdown() {
  const timerDisplay = {
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const interval = setInterval(() => {
    const hrs = Math.floor(offerTime / 3600);
    const mins = Math.floor((offerTime % 3600) / 60);
    const secs = offerTime % 60;

    timerDisplay.hours.textContent = hrs.toString().padStart(2, '0');
    timerDisplay.minutes.textContent = mins.toString().padStart(2, '0');
    timerDisplay.seconds.textContent = secs.toString().padStart(2, '0');

    if (offerTime <= 0) {
      clearInterval(interval);
      document.getElementById("timer").textContent = "Offer Expired";
    } else {
      offerTime--;
    }
  }, 1000);
}

window.addEventListener("load", startCountdown);

// 🔐 Toggle Popup
function togglePopup() {
  const popup = document.getElementById("popupModal");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

// 📩 Handle Newsletter Submit
function submitNewsletter() {
  alert("Thank you for subscribing! 🎉");
  togglePopup();
}

let cart = [];

function addToCart(itemName, price) {
  const existing = cart.find(item => item.name === itemName);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name: itemName, price, qty: 1 });
  }
  updateCartUI();
}

function increaseQty(index) {
  cart[index].qty++;
  updateCartUI();
}

function decreaseQty(index) {
  cart[index].qty--;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const orderList = document.getElementById("orderItems");
  const totalPrice = document.getElementById("totalPrice");
  orderList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price} × ${item.qty}
      <div class="qty-buttons">
        <button onclick="decreaseQty(${index})">➖</button>
        <button onclick="increaseQty(${index})">➕</button>
      </div>
    `;
    orderList.appendChild(li);
  });

  totalPrice.textContent = total;
}



