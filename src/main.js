import "./style.css";
import { menuArray } from "./data";

const cart = []
let order = []

document.addEventListener('click', function(e){
  if(e.target.dataset.add){
    addItems(e.target.dataset.add)
  }
})





//Render the menu
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
//Every time an item is clicked, do something / identify the item clicked
function addItems(itemsId){
  
  const targetItemObj = menuArray.filter(function(item){
    return item.uuid === itemsId
  })[0]

  if(targetItemObj){
    cart.push(targetItemObj.price)
    order.push(renderItemsBottom(targetItemObj)) 
    render() 
    renderBodyBottom()
  }
  
  
}


//sum the cart in order to get the total of it
function sumCart(){
  let price = 0;
  let totalPrice = cart.reduce((accumulator, currentValue)=> accumulator + currentValue, price,)
  return totalPrice
}

//render the items in the cart in order to process the payment
function renderItemsBottom(items){
  let buttomRendered = '';
  if(cart.length > 0){
    buttomRendered =  `
    <div class="order-items">
      <h2 class="item-order">${items.name}</h2>
      <span class="price-item">$${items.price}</span>
    </div>
    `;
  }
    
return buttomRendered

}

//render the main body
function renderBodyBottom() {
  let buttomRendered = `<div class="order">
    <h2 class="title-order">Your Order Details</h2>
    <div class="list-of-items">
    ${order.join('')}
    </div>
    <div class="total-price">
      <h2>Total Price:</h2>
      <span class="price-item-order">$${sumCart()}</span>
    </div>
    <button>Complete Order</button>
  </div>`
  
    
  
return buttomRendered

  
}
//Render
function render() {

  document.getElementById("container").innerHTML =  renderMenu() + renderBodyBottom()
 
}


render()