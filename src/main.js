import "./style.css";
import { menuArray } from "./data";

// function addItem() {
//   const addBtn = document.getElementById("addBtn");
//   addBtn.addEventListener("click", function (e) {
//     console.log(e.target);
//   });
// }
function renderTop() {
  return `<div class="upper-bg">
          <h1>Raul's Diner</h1>
          <p>The best burgers and pizzas in town</p>
        </div>`;
}
function renderMenu() {
  return menuArray.map(function (item) {
    return `<div class="item-box">
            <span>${item.emoji}</span>
            <div class="items">
              <h2 class="item">${item.name}</h2>
              <p class="ingredients">${item.ingredients.join(", ")}</p>
              <h3 class="price">$${item.price}</h3>
            </div>
            <button id="addBtn"><i class="fa-solid fa-plus fa-M"></i></button>
          </div>`;
  });
}
function renderBottom() {
  return `<div class="order">
          <h2 class="title-order">Your Order</h2>
          <div class="order-items">
            <h2 class="item-order">Pizza</h2>
            <span class="price-item">$14</span>
          </div>
          <div class="total-price">
            <h2>Total Price:</h2>
            <span class="price-item-order">$14</span>
          </div>
          <button>Complete Order</button>
        </div>`;
}

function render() {
  return renderTop() + renderMenu().join("") + renderBottom();
}

document.getElementById("container").innerHTML = render();
