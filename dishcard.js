import { dishes } from "./data.js";

const container = document.getElementById("dishContainer");
const searchInput = document.getElementById("searchInput");
const regionButtons = document.querySelectorAll(".region");

let currentRegion = "all";

// 🍛 Display dishes
function displayDishes(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No dishes found 😢</p>";
    return;
  }

  data.forEach(dish => {
    container.innerHTML += `
      <div class="dish-card">
        <img src="${dish.img}" alt="${dish.name}">
        <h4>${dish.name}</h4>
        <p>${dish.state}</p>
      </div>
    `;
  });
}

// 🎲 Show 8 random dishes initially
function showRandomDishes() {
  const shuffled = [...dishes].sort(() => 0.5 - Math.random());
  displayDishes(shuffled.slice(0, 8));
}

// 🔍 Filter logic
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

  displayDishes(filtered);
}

// 🔘 Region button click
regionButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentRegion = button.dataset.region;

    // Optional active style
    regionButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    filterDishes();
  });
});

// 🔍 Search typing
searchInput.addEventListener("input", filterDishes);

// 🚀 Initial load
showRandomDishes();