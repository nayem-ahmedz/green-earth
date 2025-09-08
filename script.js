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
    cateContainer.innerHTML = '<button class="cate-btn cate-active">All Trees</button>';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('cate-btn');
        button.innerText = category.category_name;
        cateContainer.appendChild(button);
    });
}

// fetch categories once, on loads
getCategories();