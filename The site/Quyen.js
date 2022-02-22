let carts = document.querySelectorAll(".add-cart-button");

let products = [
  {
    name: "Red Hat",
    tag: "redhat",
    price: 12,
    inCart: 0,
  },
  {
    name: "White Hat",
    tag: "whitehat",
    price: 15,
    inCart: 0,
  },
];

for (i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart-basket span").textContent = productNumbers;
  }
}

function cartNumbers() {
  console.log("the product is", products);
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  console.log(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart-basket span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-basket span").textContent = 1;
  }
}
onLoadCartNumbers();
