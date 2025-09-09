// fetch categories
function getCategories(){
    cateContainer.innerHTML = '<span class="loading loading-dots loading-xl"></span>';
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then(res => res.json())
        .then(json => displayCategories(json.categories));
}


// display categories
const cateContainer = document.getElementById('categories-buttons');
function displayCategories(categories){
    cateContainer.innerHTML = '<button class="cate-btn cate-btn-0" onclick="getPlants(0)">All Trees</button>';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('cate-btn', `cate-btn-${category.id}`);
        button.setAttribute('onclick', `getPlants(${category.id})`);
        button.innerText = category.category_name;
        cateContainer.appendChild(button);
    });
    getPlants(0);
}

// fetch categories once, on loads
getCategories();

// manage active status in category button
const removeCateActiveBtn = () => {
    const allCateButtons = document.getElementsByClassName('cate-btn');
    for(const button of allCateButtons){
        button.classList.remove('cate-active');
    }
}

// fetch plants
async function getPlants(categoryId){
    plantCardCont.innerHTML = '<span class="loading loading-spinner loading-xl col-span-full mx-auto my-20"></span>';
    removeCateActiveBtn();
    const selectedCate = document.querySelector(`.cate-btn-${categoryId}`);
    selectedCate.classList.add('cate-active');
    let url = '';
    if(categoryId === 0){
        url = 'https://openapi.programming-hero.com/api/plants';
    } else{
        url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
    }
    const response = await fetch(url);
    const json = await response.json();
    displayPlantCards(json.plants);
}

// display plants cards
const plantCardCont = document.getElementById('plant-cards');
function displayPlantCards(plants){
    plantCardCont.innerHTML = '';
    for(const plant of plants){
        const card = document.createElement('div');
        card.classList.add('card', 'bg-base-100');
        card.innerHTML = `
        <div class="card-body p-3 lg:p-4 plant-card-${plant.id}">
            <div class="aspect-square">
                <img src="${plant.image}" alt="${plant.name}" class="aspect-square rounded-lg" />
            </div>
            <h2 class="card-title cursor-pointer" onclick="fetchModal(${plant.id})">${plant.name}</h2>
            <p class="opacity-80">${plant.description.slice(0,90)}...</p>
            <div class="flex justify-between items-center text-sm">
                <span class="text-[#15803D] bg-[#DCFCE7] py-2 px-3 rounded-2xl font-medium">${plant.category}</span>
                <span class="font-semibold plant-price">৳${plant.price}</span>
            </div>
            <button class="cart-btn" onclick="addToCart(${plant.id})">Add to Cart</button>
        </div>
        `;
        plantCardCont.appendChild(card);
    }
}

// show modal
async function fetchModal(plantId){
    const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    const response = await fetch(url);
    const json = await response.json();
    displayModal(json.plants);
}

const displayModal = (plant) => {
    const modalCont = document.getElementById('modal-content');
    modalCont.innerHTML = `
    <h2 class="font-bold text-3xl">${plant.name}</h2>
    <div class="aspect-square">
        <img src="${plant.image}" alt="${plant.name}" class="aspect-square rounded-lg" />
    </div>
    <h3 class="font-bold"> Category : <span class="font-normal">${plant.category}</h3>
    <h3 class="font-bold"> Price : <span class="font-normal">${plant.price}</h3>
    <h3 class="font-bold"> Description : <span class="font-normal">${plant.description}</h3>
    `;
    document.querySelector('#my_modal_5').showModal();
}

// add to cart
function addToCart(item){
    const card = document.querySelector(`.plant-card-${item}`);
    const name = card.querySelector('.card-title').innerText;
    const price = parseInt(card.querySelector('.plant-price').innerText.slice(1));
    alert(name + ' has been added to the cart');
    updateCart(name, price);
}

// update my cart
const cartItemsCont = document.getElementById('cart-items');
function updateCart(name, price){
    const newItem = document.createElement('div');
    newItem.classList.add('flex', 'justify-between', 'items-center', 'bg-[#F0FDF4]', 'py-2', 'px-3', 'mb-2', 'rounded-lg');
    newItem.addEventListener('click', (e) => removeCartItem(e, price));
    newItem.innerHTML = `
    <div class="text-[rgba(31,41,55,1)]">
        <h4 class="text-sm font-semibold mb-1">${name}</h4>
        <p class="opacity-50">৳${price} x 1</p>
    </div>
    <i class="fa-solid fa-xmark text-2xl text-red-500 cursor-pointer opacity-70 hover:opacity-100"></i>
    `;
    cartItemsCont.appendChild(newItem);
    // update total price after adding product
    total += price;
    updateCartBalance();
}

// remove cart items
function removeCartItem(e, price){
    if(e.target.classList.contains('fa-xmark')){
        e.target.parentNode.remove();
        // update total price after removing product
        total -= price;
        updateCartBalance();
    }
}

// update total balance in cart
let total = 0;
const cartAmField = document.getElementById('cart-amount-field');
function updateCartBalance(){
    if(total === 0){
        cartAmField.style.display = 'none';
    } else{
        cartAmField.style.display = 'flex';
        document.querySelector('#cart-amount').innerHTML = `৳${total}`;
    }
}