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

// Función para abrir el modal
function afterCompleteBtn() {
    document.querySelector(".modal").classList.remove("hidden");
}

// Función para cerrar el modal
function closeModal() {
    document.querySelector(".modal").classList.add("hidden");
}

// Evento para cerrar el modal con el botón "Close"
document.addEventListener("click", function (e) {
    if (e.target.id === "closeModal") {
        closeModal();
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
            <div class="interaction-btn">
                <button class="minus-btn" data-minus="${item.uuid}">
                    <i class="fa-solid fa-minus" style="color: #d81313;"></i>
                </button>
                <button class="add-btn" data-add="${item.uuid}">
                    <i class="fa-solid fa-plus fa-M"></i>
                </button>
            </div>
        </div>
        `;
    });

    return feedHtml;
}

// Función para eliminar items del carrito
function deleteItems(itemsId) {
    const targetItemObj = menuArray.find((item) => item.uuid === itemsId);
    if (targetItemObj) {
        let existingItem = order.find((item) => item.uuid === itemsId);
        if (existingItem.quantity > 0) {
            existingItem.quantity--;
        }

        render();
    }
}

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
        <button id="completeOrder">Complete Order</button>
    </div>
    `;
}

// Función para calcular el total del carrito
function sumCart() {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Función principal de renderizado
function render() {
    let content = renderMenu();

    if (order.length > 0) {
        content += renderBodyBottom();
    }

    document.getElementById("container").innerHTML = content;

    // Se asigna el evento al botón "Complete Order" después de renderizar
    const completeOrderBtn = document.getElementById("completeOrder");
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener("click", afterCompleteBtn);
    }
}

// Ejecutar la primera renderización
render();
