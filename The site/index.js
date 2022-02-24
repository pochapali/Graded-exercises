function addItems() {
  for (let i = 0; i < items.length; i++) {
    addItem(i);
  }
}
function addItem(index) {
  let newElement = document.createElement("div");
  if (items[index].availability == true) {
    newElement.innerHTML = `
  <div class="image">
    <img src=${items[index].image}>
  </div>
  <div class="name">${items[index].name}</div>
  <div class="price">${items[index].price}€</div>
  <button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>
`;
  } else {
    newElement.innerHTML = `
  <div class="image">
    <img src=${items[index].image}>
  </div>
  <div class="name">${items[index].name}</div>
  <div class="price">Not available</div>
`;
  }
  newElement.className = "item";
  newElement.id = index;
  newElement.onclick = () => showDetailView(items[index], index);
  document.getElementsByClassName("items")[0].appendChild(newElement);
}
var addCartButtons = document.getElementsByClassName("btn-primary");

for (let i = 0; i < addCartButtons.length; i++) {
  let button = addCartButtons[i];
  button.addEventListener("click", function (i) {
    let buttonClicked = event.target;
    upgradeCartTotal();
    ///was just playing with the button and found a way how to delete element
  });
}
function showDetailView(itemData, index) {
  let target = document.getElementsByClassName("items")[0];
  window.localStorage.setItem("activeItemId", JSON.stringify(itemData));
  target.innerHTML = `<div>
  <div class="detailed-image"><img src="${itemData.image}"></div>
  <div >${itemData.name}</div>
  <div>${itemData.price}</div>
  <div>${itemData.description}</div>
  </div>
  <button onclick="goBack()">Back</button>
  `;
  if (itemData.availability != false) {
    target.innerHTML += `<button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>`;
  }
}
function goBack() {
  window.localStorage.removeItem("activeItemId");
  let target = document.getElementsByClassName("items")[0];
  target.innerHTML = "";
  addItems();
}
function upgradeCartTotal() {
  let cartItemNumber = document.getElementsByClassName("cart-total-price")[0];
  console.log(cartItemNumber);
}
