let allItems = []

const getItems = async (endpoint = "books") => {
    try {
        let res = await fetch("https://striveschool-api.herokuapp.com/" + endpoint, {
            method: "GET"
        })
        let items = await res.json()
        // console.log(items)

        let containerNode = document.getElementById("main-container")
        items.forEach((book, index) => {
            containerNode.innerHTML += `<div class="card border m-1" id="${index}" style="width: 18rem;">
            <img src="${book.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Price £${book.price}</p>
                <button type="button" class="btn btn-primary" onclick="addToCart(${index})">Add to cart</button>
                <button type="button" class="btn btn-secondary" onclick="removeElement(this)">Skip</button>
            </div>
        </div>`
            allItems.push(book)
        })
    } catch (err) {
        console.log(err)
    }
}

let cartCounter = []

const addToCart = (element) => {
    let modalNode = document.getElementById("cart-container")
    let indexNode = allItems[element]
    let borderNode = document.getElementById(`${element}`)

    borderNode.classList.add("border-primary")

    modalNode.innerHTML += `
        <div class="cart-item">
            <p class="title-cart">${indexNode.title}<span>${indexNode.price}</span>
            <button type="button" class="btn btn-danger" onclick="removeFromCart(this)">Delete</button>
            </p>
        </div>`

    cartCounter.push(1)
    cartCount()
}

const removeElement = (element) => {
    element.closest('.card').classList.add("d-none")
}
const removeFromCart = (element) => {
    // let borderNode =let borderNode = document.getElementById(`${element}`)
    element.closest('.cart-item').classList.add("d-none")

}

const emptyCart = () => {
    let cartNode = document.getElementById("cart-container")
    cartNode.innerHTML = ``
}


const cartCount = () => {
    let counterNode = document.getElementById("cart-number")
    let numberCart = cartCounter.reduce((number) => number + 1, 0);
    counterNode.innerHTML = numberCart
    console.log(numberOfBooksInTheCart)
}


// const searchBar = () => {

//     let allTitlesNode = document.getElementsByClassName("card-title")
//     let textNode = document.getElementById("search-bar").value.toLowerCase()
//     let titlesNode = document.querySelector(".card-title").innerHTML.toLowerCase()

//     console.log(allTitlesNode)

//     if (textNode.length >= 3) {
//         if (titlesNode.includes(textNode)) {

//         } else {
//             allTitlesNode.classList.toggle("d-none")
//         }
//     } else {
//         for (let index = 0; index < allTitlesNode.length; index++) {
//             const element = allTitlesNode[index];
//             element.closest(".card").classList.toggle("d-none")
//         }
//     }
// }

window.onload = () => {
    getItems()
};
