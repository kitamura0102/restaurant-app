import "./style.css";
import { menuArray } from "./data";

let order = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItems(e.target.dataset.add);
  } else if (e.target.dataset.minus) {
    deleteItems(e.target.dataset.minus);
  }
});

// Función para agregar items al carrito
function addItems(itemsId) {
  const targetItemObj = menuArray.find((item) => item.uuid === itemsId);
  if (targetItemObj) {
    let existingItem = order.find((item) => item.uuid === itemsId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      order.push({ ...targetItemObj, quantity: 1 });
    }
    render();
  }
}

// Función para eliminar items del carrito
function deleteItems(itemsId) {
  let existingItem = order.find((item) => item.uuid === itemsId);
  if (existingItem && existingItem.quantity > 0) {
    existingItem.quantity--;
    if (existingItem.quantity === 0) {
      order = order.filter((item) => item.uuid !== itemsId);
    }
    render();
  }
}

// Función para renderizar el menú
function renderMenu() {
  return menuArray
    .map(
      (item) => `
        <div class="item-box">
            <span>${item.emoji}</span>
            <div class="items">
                <h2 class="item">${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(", ")}</p>
                <h3 class="price">$${item.price}</h3>
            </div>
            <div class="interaction-btn">
                <button class="minus-btn" data-minus="${item.uuid}">
                    <i class="fa-solid fa-minus" style="color: #d81313;"></i>
                </button>
                <button class="add-btn" data-add="${item.uuid}">
                    <i class="fa-solid fa-plus fa-M"></i>
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Renderizar los items en el carrito
function renderItemsBottom() {
  return order
    .map(
      (item) => `
        <div class="order-items" id="order-items">
            <h2 class="item-order">${item.name}</h2>
            <span class="quantity">x ${item.quantity}</span>
            <span class="price-item">$${item.price * item.quantity}</span>
        </div>
    `
    )
    .join("");
}

// Función para calcular el total del carrito
function sumCart() {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Renderizar el resumen del pedido
function renderBodyBottom() {
  return `
    <div class="order" id="order-summary">
        <h2 class="title-order">Your Order Details</h2>
        <div class="list-of-items">${renderItemsBottom()}</div>
        <div class="total-price">
            <h2>Total Price:</h2>
            <span class="price-item-order">$${sumCart()}</span>
        </div>
        <button id="completeOrder">Complete Order</button>
    </div>`;
}

// Función después de finalizar la orden
function afterOrderFinished() {
  let name = document.getElementById("name").value;
  return `<div class="order-finished">
                <h4>Thanks ${name}! Your order is on its way!</h4>
            </div>`;
}

// Función principal de renderizado
function render() {
  let content = renderMenu();
  if (order.length > 0) {
    content += renderBodyBottom();
  }
  document.getElementById("container").innerHTML = content;

  // Evento para abrir el modal
  const completeOrderBtn = document.getElementById("completeOrder");
  if (completeOrderBtn) {
    completeOrderBtn.addEventListener("click", function () {
      document.querySelector(".modal").classList.remove("hidden");
    });
  }
}

// Evento para procesar el pago (se mantiene fuera de render())
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita la recarga del formulario
  
  if (document.getElementById("name").value && 
      document.getElementById("card-Number").value &&
      document.getElementById("cvv").value) {
    
    document.getElementById("order-summary").innerHTML = afterOrderFinished();
    document.querySelector(".modal").classList.add("hidden");
  }
});

// Ejecutar la primera renderización
render();
