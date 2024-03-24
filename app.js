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
            <button onclick='addtocart(${product.id})'>Add to cart</button>
        </div>
    </div>`
).join('');

class Slider {
    constructor(el, idx, options) {
        this.Element = el;
        this.Settings = Object.assign({
            autoFocus: false,
            dots: true,
            arrows: true,
            loop: false,
            allowDragToScroll: true,
            autoplay: {
                enable: false,
                timing: 5000,
                reverse: false
            }
        }, options);
        
        this.Selectors = {
            slides: {
                tag: 'slide',
                class: 'slider--slide'
            },
            dots: {
                tag: 'dot',
                class: 'slider--dot'
            }
        };

        this.currentSlideIndex = 0;
        this.slides = this.Element.querySelectorAll(`.${this.Selectors.slides.class}`);
        this.totalSlides = this.slides.length;

        this._init();
        this._setupEventListeners();
    }

    _init() {
        this._updateNavigation();
        if (this.Settings.autoplay.enable) {
            this._startAutoplay();
        }
    }

    _setupEventListeners() {
        if (this.Settings.arrows) {
            const prevButton = this.Element.querySelector('.prev-button');
            const nextButton = this.Element.querySelector('.next-button');
            prevButton.addEventListener('click', () => this.slideTo(this.currentSlideIndex - 1));
            nextButton.addEventListener('click', () => this.slideTo(this.currentSlideIndex + 1));
        }

        if (this.Settings.dots) {
            const dots = this.Element.querySelectorAll(`.${this.Selectors.dots.class}`);
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.slideTo(index));
            });
        }

        if (this.Settings.allowDragToScroll) {
            // Implement drag to scroll functionality
        }
    }

    _updateNavigation() {
        const dotsContainer = this.Element.querySelector('.dots-container');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add(this.Selectors.dots.class);
                if (i === this.currentSlideIndex) {
                    dot.classList.add('active');
                }
                dotsContainer.appendChild(dot);
            }
        }
    }

    slideTo(targetIndex) {
        if (targetIndex < 0 || targetIndex >= this.totalSlides) {
            return; // Invalid index
        }

        // Scroll to the target slide
        this.slides[targetIndex].scrollIntoView({ behavior: 'smooth' });
        this.currentSlideIndex = targetIndex;
        this._updateNavigation();
    }

    _startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            const nextIndex = (this.currentSlideIndex + 1) % this.totalSlides;
            this.slideTo(nextIndex);
        }, this.Settings.autoplay.timing);
    }

    _stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

// Slider initialization
(function(d, w) {
    "use strict";
    let sliders = document.querySelectorAll('.slider');
    sliders.forEach((el, idx) => {
        new Slider(el, idx, {
            autoplay: {
                enable: true,
                timing: 5000,
                reverse: false
            }
        });
    });
}(document, window));
// Update your JavaScript to handle the modal functionality
// Define variables for modal, close button, and product details
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];
const productDetails = document.getElementById("productDetails");

// Function to open the modal and populate it with product details
function openModal(product) {
  modal.style.display = "block";
  // Populate product details
  productDetails.innerHTML = `
    <div class='box'>
        <div class='img-box'>
            <img class='images' src='${product.image}'></img>
        </div>
        <div class='bottom'>
            <p class='p1'>${product.title}</p>
            <h2>₱ ${product.price}.00</h2>
        </div>
    </div>`;
}

// Event listener for clicking on a product
document.querySelectorAll('.box').forEach((box, index) => {
  box.addEventListener('click', () => openModal(products[index]));
});

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Event listener for close button
closeBtn.onclick = closeModal;

// Event listeners for buy, cancel, and add to cart buttons
document.getElementById("buyBtn").onclick = function() {
  // Implement buy functionality
  alert("You clicked Buy");
};

document.getElementById("cancelBtn").onclick = function() {
  closeModal();
};

document.getElementById("addToCartBtn").onclick = function() {
  // Implement add to cart functionality
  alert("Added to Cart");
};
// Define an array to store the cart items
let cartItems = [];

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const cartItem = {
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: 1, // Initial quantity
            dateAdded: new Date().toLocaleDateString() // Current date
        };
        cartItems.push(cartItem);
        updateCart(); // Update the cart display
    }
}

// Function to update the cart display
function updateCart() {
    const cartContainer = document.getElementById('cartItem');
    if (cartItems.length === 0) {
        cartContainer.innerHTML = 'Your cart is empty';
    } else {
        cartContainer.innerHTML = ''; // Clear previous content
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <p>${item.title}</p>
                    <p>Price: ₱ ${item.price}.00</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Date Added: ${item.dateAdded}</p>
                </div>`;
            cartContainer.appendChild(cartItemDiv);
        });
    }
}

// Add event listener to the "Add to Cart" button
function addtocart(productId) {
    addToCart(productId);
}

// Update the total in the cart
function updateTotal() {
    const totalElement = document.getElementById('total');
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalElement.textContent = `₱ ${total.toFixed(2)}`;
}

// Call updateTotal initially to display the initial total
updateTotal();
function updateCart() {
    const cartContainer = document.getElementById('cartItem');
    const sidebar = document.querySelector('.sidebar');
    if (cartItems.length === 0) {
        cartContainer.innerHTML = 'Your cart is empty';
        sidebar.classList.remove('collapsed'); // Ensure sidebar is expanded if cart is empty
    } else {
        cartContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <p>${item.title}</p>
                    <p>Price: ₱ ${item.price}.00</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Date Added: ${item.dateAdded}</p>
                </div>`;
            cartContainer.appendChild(cartItemDiv);
        });
        sidebar.classList.add('collapsed'); // Collapse sidebar after adding products
    }
}