const images = [
  { id: 1, title: "Misty Mountains", category: "Nature", imageUrl: "img/mountain.jpg" },
  { id: 2, title: "Forest Path", category: "Nature", imageUrl: "img/forest.jpg" },
  { id: 3, title: "Desert Dunes", category: "Nature", imageUrl: "img/desert.jpg" },

  { id: 4, title: "Paris Streets", category: "Travel", imageUrl: "img/paris.jpg" },
  { id: 5, title: "Beach Escape", category: "Travel", imageUrl: "img/beach.jpg" },
  { id: 6, title: "Tokyo Nights", category: "Travel", imageUrl: "img/tokyo.jpg" },

  { id: 7, title: "Gourmet Burger", category: "Food", imageUrl: "img/burger.jpg" },
  { id: 8, title: "Italian Pasta", category: "Food", imageUrl: "img/pasta.jpg" },
  { id: 9, title: "Dessert Plate", category: "Food", imageUrl: "img/dessert.jpg" },

  { id: 10, title: "Street Portrait", category: "People", imageUrl: "img/portrait.jpg" },
  { id: 11, title: "Team Work", category: "People", imageUrl: "img/team.jpg" },
  { id: 12, title: "Creative Mind", category: "People", imageUrl: "img/creative.jpg" }
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const emptyState = document.getElementById("emptyState");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.querySelector(".close");

let selectedCategory = "All";
let searchText = "";

function renderImages() {
  gallery.innerHTML = "";

  const filtered = images
    .filter(img => selectedCategory === "All" || img.category === selectedCategory)
    .filter(img => img.title.toLowerCase().includes(searchText.toLowerCase()));

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filtered.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <img src="${img.imageUrl}" alt="${img.title}">
      <div class="overlay"></div>
      <div class="info">
        <h3>${img.title}</h3>
        <span class="badge" data-category="${img.category}">
          ${img.category}
        </span>
      </div>
    `;

    card.addEventListener("click", () => {
      lightboxImg.src = img.imageUrl;
      lightboxTitle.textContent = img.title;
      lightboxCategory.textContent = img.category;
      lightbox.classList.add("active");
    });

    gallery.appendChild(card);
  });
}

searchInput.addEventListener("input", e => {
  searchText = e.target.value;
  renderImages();
});

categorySelect.addEventListener("change", e => {
  selectedCategory = e.target.value;
  renderImages();
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

renderImages();
