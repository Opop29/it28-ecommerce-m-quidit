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
