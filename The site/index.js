for (let i = 0; i < items.length; i++) {
  addItem(i);
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

  console.log(newElement);
  document.getElementsByClassName("items")[0].appendChild(newElement);
}
