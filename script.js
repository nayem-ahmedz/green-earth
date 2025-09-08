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
        <div class="card-body p-3 lg:p-4">
            <div class="aspect-square">
                <img src="${plant.image}" alt="${plant.name}" class="aspect-square rounded-lg" />
            </div>
            <h2 class="card-title">${plant.name}</h2>
            <p class="opacity-80">${plant.description.slice(0,90)}...</p>
            <div class="flex justify-between items-center text-sm">
                <span class="text-[#15803D] bg-[#DCFCE7] py-2 px-3 rounded-2xl font-medium">${plant.category}</span>
                <span class="font-semibold">৳${plant.price}</span>
            </div>
            <button class="cart-btn">Add to Cart</button>
        </div>
        `;
        plantCardCont.appendChild(card);
    }
}