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

function showDetailView(itemData, index) {
  let target = document.getElementsByClassName("items")[0];
  window.localStorage.setItem("activeItemId", JSON.stringify(itemData));
  target.innerHTML = `<div>
  <div class="detailed-image"><img src="${itemData.image}"></div>
  <div >${itemData.name}</div>
  <div>${itemData.price}€</div>
  <div>${itemData.description}</div>
  </div>
  <button onclick="goBack()">Back</button>
  `;
  if (itemData.availability != false) {
    target.innerHTML += `<button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>`;
    var addCartButton = document.getElementsByClassName("btn-primary")[0];
    addCartButton.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      addItemToCartObj(index, false);
    });
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
/////cart stuff
function updateItemsNumber() {
  let numberPlace = document.getElementsByClassName("cart-total-amount")[0];
  console.log;
  numberPlace.innerHTML = cart[0].itemAmount;
}
function showCart() {
  let sum = 0;
  for (let i = 0; i < cart[1].length; i++) {
    sum += cart[1][i].price * cart[1][i].quantity;
  }
  let target = document.getElementsByClassName("items")[0];
  window.localStorage.setItem("justCart", JSON.stringify());
  target.innerHTML = `<div>
  <div class="cart-header">
  <div class="cart-total">Total amount of items in cart: ${cart[0].itemAmount} With price: ${sum}€</div>
  </div>
  <div class="cart-items"></div>
  <button onclick="goBack()">Back</button>
  `;
  for (let i = 0; i < cart[1].length; i++) {
    addItemToCart(cart[1][i], target);
  }
}
function addItemToCart(item, target) {
  ///adds items to cart when it is opening

  console.log(target);
  target.getElementsByClassName("cart-items")[0].innerHTML += `
    <div class="image"><img src="${item.image}"></div>
  <div >${item.name}</div>
  <div>${item.price}€</div>
  <div>quantity: ${item.quantity}</div>
  </div>
    `;
}
function addItemToCartObj(itemId, isVisible) {
  ///adds items to cart list in cart.js
  cart[0].itemAmount += 1;
  if (cart[1].length != 0) {
    let inCart = false;
    for (let i = 0; i < cart[1].length; i++) {
      if (cart[1][i].id == itemId) {
        cart[1][i].quantity += 1;
        inCart = true;
      }
    }
    if (inCart == false) {
      cart[1].push(
        new cartItem(
          itemId,
          items[itemId].name,
          1,
          items[itemId].price,
          items[itemId].image
        )
      );
    }
  } else {
    cart[1].push(
      new cartItem(
        itemId,
        items[itemId].name,
        1,
        items[itemId].price,
        items[itemId].image
      )
    );
  }
  if (isVisible == true) {
    target.getElementsByClassName[0].innerHTML += `
    <div class="detailed-image"><img src="${items[itemId].image}"></div>
  <div >${items[itemId].name}</div>
  <div>${items[itemId].price}€</div>
  <div>${items[itemId].description}</div>
  </div>
    `;
  }
  console.log(cart);
  updateItemsNumber();
}
