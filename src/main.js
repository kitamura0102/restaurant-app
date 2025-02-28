import "./style.css";
import { menuArray } from "./data";

const order = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItems(e.target.dataset.add);
  }
});

// Función para renderizar el menú
function renderMenu() {
  let feedHtml = "";

  menuArray.forEach(function (item) {
    feedHtml += `
    <div class="item-box">
            <span>${item.emoji}</span>
            <div class="items">
              <h2 class="item">${item.name}</h2>
              <p class="ingredients">${item.ingredients.join(", ")}</p>
              <h3 class="price">$${item.price}</h3>
            </div>
            <button class="add-btn" data-add="${item.uuid}">
              <i class="fa-solid fa-plus fa-M"></i>
            </button>
    </div>
          `;
  });
  return feedHtml;
}

// Función para agregar items al carrito
function addItems(itemsId) {
  // Buscar el objeto en menuArray
  const targetItemObj = menuArray.find((item) => item.uuid === itemsId);

  if (targetItemObj) {
    // Buscar si el item ya está en order
    let existingItem = order.find((item) => item.uuid === itemsId);

    if (existingItem) {
      // Si ya existe, incrementar su cantidad
      existingItem.quantity++;
    } else {
      // Si no existe, agregarlo con quantity: 1
      order.push({ ...targetItemObj, quantity: 1 });
    }

    // Renderizar nuevamente
    render();
  }
}

// Renderizar los items en el carrito
function renderItemsBottom() {
  return order
    .map(
      (item) => `
    <div class="order-items">
      <h2 class="item-order">${item.name}</h2>
      <span class="quantity">x ${item.quantity}</span>
      <span class="price-item">$${item.price * item.quantity}</span>
    </div>
  `
    )
    .join("");
}

// Renderizar el resumen del pedido
function renderBodyBottom() {
  return `
    <div class="order">
      <h2 class="title-order">Your Order Details</h2>
      <div class="list-of-items">
        ${renderItemsBottom()}
      </div>
      <div class="total-price">
        <h2>Total Price:</h2>
        <span class="price-item-order">$${sumCart()}</span>
      </div>
      <button>Complete Order</button>
    </div>
  `;
}

// Función para calcular el total del carrito
function sumCart() {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Función principal de renderizado
function render() {
  document.getElementById("container").innerHTML =
    renderMenu() + (order.length > 0 ? renderBodyBottom() : "");
}

// Ejecutar la primera renderización
render();