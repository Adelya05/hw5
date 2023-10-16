// npm install -g json- server 
// json-server --watch db.json


const products = document.querySelector(".products");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const desc = document.querySelector("#desc");
const category = document.querySelector("#category");
const add_btn = document.querySelector("#add_btn");

function getProduct() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
      json?.forEach((item, i) => {
        products.innerHTML += `
                    <div class="product" data-id="${item.id}">
                        <img src="${item.image}"/>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <p class="price">Price: $${item.price}</p>
                        <button class="edit-btn" onclick="editProduct('${item.id}')">Edit</button>
                        <button class="del-btn" onclick="delProduct('${item.title}')">Delete</button>
                    `;
      });
    });
}



getProduct();
//Edit 
function editProduct(productId) {
  const productDiv = document.querySelector(`.product[data-id="${productId}`);
  const productTitle = productDiv.querySelector("h3");
  const productDescription = productDiv.querySelector("p");
  const productPrice = productDiv.querySelector(".price");


  const inputTitle = document.createElement("input");
  inputTitle.value = productTitle.textContent;
  const inputDescription = document.createElement("input");
  inputDescription.value = productDescription.textContent;
  const inputPrice = document.createElement("input");
  inputPrice.value = productPrice.textContent.replace("Price: $", "");


  productTitle.replaceWith(inputTitle);
  productDescription.replaceWith(inputDescription);
  productPrice.replaceWith(inputPrice);

  // кнопка
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => saveEditedProduct(productId, inputTitle, inputDescription, inputPrice));


  const editButton = productDiv.querySelector(".edit-btn");
  editButton.replaceWith(saveButton);
}

function saveEditedProduct(productId, inputTitle, inputDescription, inputPrice) {
  const updatedTitle = inputTitle.value;
  const updatedDescription = inputDescription.value;
  const updatedPrice = inputPrice.value;

  // 
  fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: updatedTitle,
      description: updatedDescription,
      price: parseFloat(updatedPrice),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((updatedProduct) => {

      inputTitle.replaceWith(updatedProduct.title);
      inputDescription.replaceWith(updatedProduct.description);
      inputPrice.replaceWith(`Price: $${updatedProduct.price}`);

      const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
      const saveButton = productDiv.querySelector("button");
      saveButton.textContent = "Edit";
      saveButton.addEventListener("click", () => editProduct(productId));
    });
}
