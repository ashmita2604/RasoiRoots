import { dishes } from "./data.js";

const container = document.getElementById("dishContainer");
const searchInput = document.getElementById("searchInput");
const regionButtons = document.querySelectorAll(".region");
const dropdown = document.getElementById("regionFilter");
const readMoreBtn = document.getElementById("readMoreBtn");

let currentRegion = "all";
let currentDishes = [];
let showAll = false;

// Display dishes
function displayDishes(data) {
  container.innerHTML = "";

  currentDishes = data;

  if (data.length === 0) {
    container.innerHTML = "<p>No dishes found 😢</p>";
    readMoreBtn.style.display = "none";
    return;
  }

  const dishesToShow = showAll ? data : data.slice(0, 10);

  dishesToShow.forEach(dish => {
    container.innerHTML += `
      <div class="dish-card">
        <img src="${dish.img}" alt="${dish.name}">
        <h4 class="dish-name">${dish.name}</h4>
        <p class="dish-state">${dish.state}</p>
        <p class="dish-description">${dish.desc}</p>
      </div>
    `;
  });

  // 🔥 BUTTON LOGIC (UPDATED)
  if (data.length > 10) {
    readMoreBtn.style.display = "block";
    readMoreBtn.textContent = showAll ? "Read Less ⬆️" : "Read More 🍽️";
  } else {
    readMoreBtn.style.display = "none";
  }
}

// Show random dishes initially
function showRandomDishes() {
  const shuffled = [...dishes].sort(() => 0.5 - Math.random());
  showAll = false;
  displayDishes(shuffled);
}

// Filter logic
function filterDishes() {
  const search = searchInput.value.toLowerCase().trim();

  let filtered = dishes.filter(dish =>
    dish.state.toLowerCase().includes(search)
  );

  if (currentRegion !== "all") {
    filtered = filtered.filter(dish =>
      dish.region.toLowerCase() === currentRegion.toLowerCase()
    );
  }

  showAll = false; // RESET
  displayDishes(filtered);
}

// 🔁 TOGGLE Read More / Read Less
readMoreBtn.addEventListener("click", () => {
  showAll = !showAll; // toggle
  displayDishes(currentDishes);

  // optional smooth scroll when collapsing
  if (!showAll) {
    container.scrollIntoView({ behavior: "smooth" });
  }
});

// Region button click
regionButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentRegion = button.dataset.region;

    regionButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    filterDishes();
  });
});

// Dropdown change
dropdown.addEventListener("change", () => {
  currentRegion = dropdown.value;
  filterDishes();
});

// Search typing
searchInput.addEventListener("input", () => {

  if (searchInput.value.trim() !== "") {
    currentRegion = "all";
    regionButtons.forEach(btn => btn.classList.remove("active"));

    const allBtn = document.querySelector('[data-region="all"]');
    if (allBtn) allBtn.classList.add("active");
  }

  filterDishes();
});

// Initial load
showRandomDishes();