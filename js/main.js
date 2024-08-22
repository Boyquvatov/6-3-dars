import { findElement } from "./helpers.js";
// import { products } from "./html.js";
const elWrapperProducts = findElement(".arzon__big-div");
const elProductTemplate = findElement("#template");
const elLoader = findElement("#loader")
const elCategories = findElement("#categories")
const elToTop = findElement("#to-top");
const elPagination = findElement("#pagination")

elPagination.addEventListener("click" , () => {

    limit += 10

    getProduct()
    if (limit === 20) {
        elPagination.style.display = "none"
        
    }
})

let limit = 10;
let products = [];

function getProduct() {
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
    .then((res) => res.json())
    .then((json) => {
        // console.log(json);

        products = json;
        elLoader.style.display = "none"
        renderProducts(products);
    });
    
}
getProduct();


// console.log(products);

fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{

                // console.log(json)

                json.forEach((category) => {

                    const newElement = document.createElement('p')
                    newElement.className = 'big-p text-capitalize'
                    newElement.innerHTML = category
                    console.log(category);
                    elCategories.appendChild(newElement)
                })
                


            })

elCategories.addEventListener('click' , (evt) => {

    fetch(`https://fakestoreapi.com/products/category/${evt.target.textContent}`)
            .then(res=>res.json())
            .then(json=> {

                renderProducts(json);
            })

})


function renderProducts(list = products, parent = elWrapperProducts) {
    parent.textContent = null;
    const fragment = new DocumentFragment();
    list.forEach((product) => {
        const newTemplate = elProductTemplate.content.cloneNode(true);
        const elTopImg = findElement(".mahsulot", newTemplate);
        const elTitle = findElement(".tanlov", newTemplate);
        const elPrice = findElement(".yulov", newTemplate);
        const elRealPrice = findElement(".anarxi", newTemplate);
        const elDiccountPrice = findElement(".sikidga", newTemplate);
        const elFavoritBtn = findElement(".btn-yurak", newTemplate);
        const elShopBtn = findElement(".shop-btn", newTemplate);
        if (product.isLiked) {
            elFavoritBtn.src = "imgs/liked.svg";
        }
        elFavoritBtn.dataset.id = product.id;
        elShopBtn.dataset.id = product.id;
        elTopImg.src = product.image;
        elTopImg.dataset.id = product.id;
        elTitle.textContent = product.title;
        elPrice.textContent = product.price;
        // elRealPrice.textContent = product.real_price;
        elDiccountPrice.textContent = product.category;

        fragment.appendChild(newTemplate);
    });
    parent.appendChild(fragment);
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        elToTop.style.display = "inline-block";
    } else {
        elToTop.style.display = "none";
    }
});

elToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

elWrapperProducts.addEventListener("click", (evt) => {
    // if (evt.target.className.includes("btn-yurak")) {
    //     const id = Number(evt.target.dataset.id);

    //     products.forEach((product) => {
    //         if (product.id === id) {
    //             product.isLiked = !product.isLiked;
    //         }
    //     });

    //     localStorage.setItem("products", JSON.stringify(products));
    //     renderProducts();
    // }

    if (evt.target.className.includes("mahsulot")) {
        const id = evt.target.dataset.id;
        // localStorage.setItem("id", id);

        window.location.replace(`http://127.0.0.1:5500/single-product.html?id=${id}`);
    }
});
