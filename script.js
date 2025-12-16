/* ================= IMAGE DATA ================= */
const images = [
  { title: "Misty Mountains", category: "Nature", src: "img/mountain.jpg" },
  { title: "Forest Path", category: "Nature", src: "img/forest.jpg" },
  { title: "Golden Desert", category: "Nature", src: "img/desert.jpg" },

  { title: "Paris Streets", category: "Travel", src: "img/paris.jpg" },
  { title: "Tokyo Nights", category: "Travel", src: "img/tokyo.jpg" },
  { title: "City Life", category: "Travel", src: "img/city.jpg" },
  { title: "Beach Escape", category: "Travel", src: "img/beach.jpg" },

  { title: "Gourmet Burger", category: "Food", src: "img/burger.jpg" },
  { title: "Italian Pasta", category: "Food", src: "img/pasta.jpg" },
  { title: "Sweet Dessert", category: "Food", src: "img/dessert.jpg" },

  { title: "Street Portrait", category: "People", src: "img/portrait.jpg" },
  { title: "Creative Team", category: "People", src: "img/team.jpg" }
];

/* ================= DOM ================= */
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

const pills = document.querySelectorAll(".pill");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.querySelector(".close");

/* ================= STATE ================= */
let activeCategory = "All";
let searchText = "";

/* ================= RENDER ================= */
function renderGallery() {
  gallery.innerHTML = "";

  const filtered = images.filter(img => {
    const matchCategory =
      activeCategory === "All" || img.category === activeCategory;

    const matchSearch =
      img.title.toLowerCase().includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filtered.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.05}s`;
    card.tabIndex = 0; // keyboard focus

    card.innerHTML = `
      <img src="${img.src}" alt="${img.title}">
      <div class="overlay"></div>
      <div class="info">
        <h3>${img.title}</h3>
        <p class="desc">Click to view</p>
        <span class="badge">${img.category}</span>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(img));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter") openLightbox(img);
    });

    gallery.appendChild(card);
  });
}

/* ================= LIGHTBOX ================= */
function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.title;
  lightboxTitle.textContent = img.title;
  lightboxCategory.textContent = img.category;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

/* ================= SEARCH ================= */
searchInput.addEventListener("input", e => {
  searchText = e.target.value;
  renderGallery();
});

/* ================= FILTER PILLS ================= */
pills.forEach(pill => {
  pill.addEventListener("click", () => {
    pills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    activeCategory = pill.dataset.category;
    renderGallery();
  });
});

/* ================= INIT ================= */
renderGallery();
