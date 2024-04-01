const products = [
    { id: 0, image: './image/smile.jpg', title: 'smilekachu', price: 200 },
    { id: 1, image: './image/naruchu.jpg', title: 'naruchu', price: 400 },
    { id: 2, image: './image/zinichu.jpg', title: 'zinichu', price: 450 },
    { id: 3, image: './image/ironchu.jpg', title: 'ironchu', price: 500 },
    { id: 4, image: './image/deadchu.jpg', title: 'deadchu', price: 450 },
    { id: 5, image: './image/enelchu.jpg', title: 'enelchu', price: 450 },
    { id: 6, image: './image/minachu.jpg', title: 'minachu', price: 400 },
    { id: 7, image: './image/strongerchu.jpg', title: 'superchu', price: 600 }
];

document.getElementById('root').innerHTML = products.map(product =>
    `
    <div class='box'>
        <div class='img-box'>
            <img class='images' src='${product.image}'></img>
        </div>
        <div class='bottom'>
            <p class='p1'>${product.title}</p>
            <h2>₱ ${product.price}.00</h2>
            <button onclick='addtocart(${product.id})'>Add to cart</button><br>
            <button onclick='buynow(${product.id})'>Buy now</button>
            
        </div>
    </div>`
).join('');

const cartItemsContainer = document.getElementById('cartItemsContainer');
let cartTotal = 0;

function addtocart(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        cartTotal += selectedProduct.price;
        document.getElementById('total').innerText = `₱ ${cartTotal}.00`;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img class="cart-image" src="${selectedProduct.image}" alt="${selectedProduct.title}">
            <p>${selectedProduct.title}</p>
            <span>₱ ${selectedProduct.price}.00</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    }
}

function buynow(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        window.location.href = `payment.html?id=${selectedProduct.id}&title=${encodeURIComponent(selectedProduct.title)}&price=${selectedProduct.price}`;
    }
}
