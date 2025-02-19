import "./style.css";
import { menuArray } from "./data";

const cart = []

document.addEventListener('click', function(e){
  if(e.target.dataset.add){
    addItems(e.target.dataset.add)
  }
})


function addItems(itemsId){
  const targetItemObj = menuArray.filter(function(item){
    return item.uuid === itemsId
  })[0]

  if(targetItemObj){
    cart.push(targetItemObj.name , targetItemObj.price)
  }
  
  
}
function renderMenu() {
  let feedHtml = "";

  menuArray.map(function (item) {
    feedHtml += `
    <div class="item-box">
            <span>${item.emoji}</span>
            <div class="items">
              <h2 class="item">${item.name}</h2>
              <p class="ingredients">${item.ingredients.join(", ")}</p>
              <h3 class="price">$${item.price}</h3>
            </div>
            <button class="add-btn" id="addBtn" data-add='${item.uuid}'><i class="fa-solid fa-plus fa-M "></i></button>
    </div>
          `;
  });
  return feedHtml;
}
function renderBottom() {

  const orderDetails = cart.forEach(function(item){
    let totalPrice =+ item.price
    `<div class="order hidden">
          <h2 class="title-order">Your Order Details</h2>
          <div class="order-items">
            <h2 class="item-order">${item.name}</h2>
            <span class="price-item">$${item.price}</span>
          </div>
          <div class="total-price">
            <h2>Total Price:</h2>
            <span class="price-item-order">$${totalPrice}</span>
          </div>
          <button>Complete Order</button>
        </div>`;
  })

  console.log(orderDetails)
}

function render() {
  return renderMenu() + renderBottom();
}

document.getElementById("container").innerHTML = render();
