// Initializing Variables
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescInput = document.getElementById("productDesc");
const productImageInput = document.getElementById("productImage");
const productSearchInput = document.getElementById("productSearch");
const productsContainer = document.getElementById("productsContainer");
const searchField = document.getElementById("searchField");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
let productsArr = [];
// Local Storage
if (localStorage.getItem("productsArr")) {
    productsArr = JSON.parse(localStorage.getItem("products"));
    displayProduct(productsArr);
} else {
    displayNoProduct();
}
// Add Product Fun.
function addProduct() {
    if (validateForm(productNameInput) && validateForm(productPriceInput) && validateForm(productCategoryInput) && validateForm(productDescInput) && validateForm(productImageInput)){
        const products = {
        productName: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
        image: `./Images/${productImageInput.files[0]?.name}`,
        };
        productsArr.push(products);
        localStorage.setItem("products", JSON.stringify(productsArr));
        displayProduct(productsArr);
        clearForm();
    }
}
// Clear Form Fun.
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productImageInput.value = "";
}
// Display Product Fun.
function displayProduct(arr) {
    let productCard = "";
    for (let i = 0; i < arr.length; i++) {
        productCard += 
        `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 gx-3">
            <div class="card border-0 shadow-sm">
                <img src="${arr[i].image}" class="card-img-top" id="productImage" alt="Product Image">
                <div class="card-body py-4 position-relative">
                    <span class="category badge text-bg-info position-absolute">${arr[i].category}</span>
                    <div class="d-flex justify-content-between flex-wrap align-items-center mt-2 mb-2">
                        <h5 class="card-title mb-0">${arr[i].title ? arr[i].title : arr[i].productName}</h5>
                        <span class="price text-danger">${arr[i].price} EGP</span>
                    </div>
                    <p class="card-text">${arr[i].desc}</p>
                </div>
                <div class="card-footer border-0 d-flex justify-content-end">
                    <button class="btn btn-outline-secondary me-2" onclick="editProduct(${i})"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})"><i class="fa-regular fa-trash-can"></i> Delete</button>
                </div>
            </div>
        </div>
        `
    }
    productsContainer.innerHTML = productCard;
    searchField.classList.replace("d-none", "d-block");
}
// Display No Products Fun.
function displayNoProduct() {
    productsContainer.innerHTML = 
        `
        <div class="content text-danger text-center d-flex flex-column justify-content-center align-items-center">
            <i class="fa-solid fa-box-open fa-3x mb-3"></i>
            <p class="h3">There's no products yet</p>
        </div>
        `
}
// Delete Product Fun.
function deleteProduct(i) {
    productsArr.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productsArr));
    displayProduct(productsArr);
}
// Edit Product Fun.
let updatedIndex;
function editProduct(i) {
    updatedIndex = i;
    productNameInput.value = productsArr[i].productName;
    productPriceInput.value = productsArr[i].price;
    productCategoryInput.value = productsArr[i].category;
    productDescInput.value = productsArr[i].desc;
    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}
// Update Product Fun.
function updateProduct() {
    productsArr[updatedIndex].productName = productNameInput.value;
    productsArr[updatedIndex].price = productPriceInput.value;
    productsArr[updatedIndex].category = productCategoryInput.value;
    productsArr[updatedIndex].desc = productDescInput.value;
    productsArr[updatedIndex].image = `./Images/${productImageInput.files[0]?.name}`;
    displayProduct(productsArr);
    localStorage.setItem("products", JSON.stringify(productsArr));
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    clearForm();
}
// Search Product By Title Fun.
function searchProduct(keyword) {
    let matchedTerm = [];
    let searchMessage = "";
    for (let i = 0; i < productsArr.length; i++) {
        if (productsArr[i].productName.startsWith(productSearchInput.value)) {
            productsArr[i].title = productsArr[i].productName.replaceAll(keyword, `<span class="text-danger">${keyword}</span>`);
            matchedTerm.push(productsArr[i]);
            displayProduct(matchedTerm);
        } else {
            productsContainer.innerHTML = 
                `
                <div class="content text-danger text-center d-flex flex-column justify-content-center align-items-center">
                <i class="fa-regular fa-circle-xmark fa-3x mb-3"></i>
                <p class="h3">Sorry, product not found</p>
                </div>
                `
        }
    } 
}
// Validation Fun.
function validateForm(input) {
    const regex = {
        productName: /^[A-Z][A-Za-z0-9 ]{2,20}$/,
        productPrice: /^[6-9][0-9]{3,3}$|^[1-5][0-9]{4,4}$|^[6][0]{4,5}$/,
        productCategory: /^(Smart Phones|Smart Watches|Monitors|Airpods)$/,
        productDesc: /^.{0,250}$/,
        productImage: /[a-zA-Z0-9_\-]+\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/,
    }
    const isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.nextElementSibling.classList.replace("d-none", "d-block");
    }
    return isValid;
}