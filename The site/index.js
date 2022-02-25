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
  <div>${itemData.price}</div>
  <div>${itemData.description}</div>
  </div>
  <button onclick="goBack()">Back</button>
  `;
  if (itemData.availability != false) {
    target.innerHTML += `<button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>`;
  }

  var addCartButton = document.getElementsByClassName("btn-primary")[0];
  addCartButton.addEventListener("click", function (event) {
    let buttonClicked = event.target;

    addItemToCart(index);
    ///was just playing with the button and found a way how to delete element
  });
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

function showCart() {
  let target = document.getElementsByClassName("items")[0];
  window.localStorage.setItem("justCart", JSON.stringify(itemData));
  target.innerHTML = `<div>
  <div class="cart-header">
  <div class="cart-total">total amount of items in cart: ${cart[0].ItemAmount}</div>
  </div>
  <div class="cart-items"></div>
  <button onclick="goBack()">Back</button>
  `;
}
function addItemToCart(itemId) {
  cart[0].ItemAmount += 1;
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
  console.log(cart);
}
