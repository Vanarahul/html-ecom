// Function to open the modal
function openModal() {
  document.getElementById("loginModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Close the modal if clicked outside the content area
window.onclick = function(event) {
  if (event.target == document.getElementById("loginModal")) {
    closeModal();
  }
}
function openModal2() {
  document.getElementById("RegisterModal").style.display = "flex";
}

// Function to close the modal
function closeModal2() {
  document.getElementById("RegisterModal").style.display = "none";
}

// Close the modal if clicked outside the content area
window.onclick = function(event) {
  if (event.target == document.getElementById("RegisterModal")) {
    closeModal();
  }
}

// slider
const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let interval;

// Clone the first item and append it to the end for seamless looping
const firstClone = items[0].cloneNode(true);
carouselInner.appendChild(firstClone);

function updateCarousel() {
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Reset transition after looping
    if (currentIndex === items.length) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            currentIndex = 0;
            carouselInner.style.transform = `translateX(0)`;
        }, 500);
    }
}

function showNextSlide() {
    currentIndex++;
    updateCarousel();
}

function showPrevSlide() {
    if (currentIndex === 0) {
        carouselInner.style.transition = 'none';
        currentIndex = items.length - 1;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
            currentIndex--;
            updateCarousel();
        }, 20);
    } else {
        currentIndex--;
        updateCarousel();
    }
}

function startAutoSlide() {
    interval = setInterval(showNextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    showNextSlide();
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    showPrevSlide();
    startAutoSlide();
});

// Start the automatic sliding
startAutoSlide();
// products and cart
const cartIcon = document.querySelector('.cart-icon');
const cartContainer = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const placeOrderButton = document.getElementById('place-order');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButtons = document.querySelectorAll('.buy-now');
const confirmationMessage = document.getElementById('confirmation-message');

let cart = [];

// Toggle cart visibility
cartIcon.addEventListener('click', () => {
    cartContainer.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartContainer.classList.remove('active');
});

// Add item to cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const img = button.getAttribute('data-img'); // Get the image path
      const existingItem = cart.find(item => item.name === name);

      if (!existingItem) {
          cart.push({ name, price, quantity: 1, img }); // Add img to the cart object
      }

      button.textContent = 'Added to Cart';
      button.disabled = true;

      updateCart();
  });
});

// Buy Now button action
buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        const confirmation = confirm(`Do you want to buy ${name} for $${price}?`);
        if (confirmation) {
            alert(`Thank you for purchasing ${name} for $${price}.`);
        }
    });
});

// Update cart display and total price
function updateCart() {
  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 4px;">
          <span>${item.name}</span>
          <div class="quantity-controls">
              <button onclick="changeQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
          <span>$${item.price * item.quantity}</span>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = `Total: $${totalPrice}`;
}

// Update quantity and reset button if quantity becomes 0
// Update quantity and reset button if quantity becomes 0
function changeQuantity(index, delta) {
const item = cart[index];
item.quantity += delta;

// If quantity becomes 0 or below, remove the item and reset the button
if (item.quantity <= 0) {
resetAddToCartButton(item.name);  // Reset button before removing the item
cart.splice(index, 1);  // Remove the item from the cart
}

// Update the cart display
updateCart();
}

// Reset "Add to Cart" button when an item is removed or its quantity becomes 0
function resetAddToCartButton(productName) {
const productButton = document.querySelector(`.add-to-cart[data-name="${productName}"]`);
if (productButton) {
productButton.textContent = 'Add to Cart';
productButton.disabled = false;
}
}

// Remove item from cart and reset button
function removeFromCart(index) {
const item = cart[index];
resetAddToCartButton(item.name);  // Reset the button before removal
cart.splice(index, 1);  // Remove the item from the cart
updateCart();
}



// Place order
// Place order
placeOrderButton.addEventListener('click', () => {
  if (cart.length === 0) {
      alert('Your cart is empty!'); // Show an alert when the cart is empty
      return;
  }

  const confirmation = confirm('Are you sure you want to place the order?');
  if (confirmation) {
      cart = []; // Clear the cart
      updateCart();

      confirmationMessage.style.display = 'block';
      setTimeout(() => {
          confirmationMessage.style.display = 'none';
      }, 3000);

      // Reset all Add to Cart buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.textContent = 'Add to Cart';
          button.disabled = false;
      });
  }
});
const viewMoreButton = document.getElementById('view-more');
    const hiddenProducts = document.querySelectorAll('.product.hidden');

    viewMoreButton.addEventListener('click', () => {
        hiddenProducts.forEach(product => {
            product.classList.remove('hidden'); // Make hidden products visible
        });
        viewMoreButton.style.display = 'none'; // Hide the "View More" button
    });
    // search bar
    document.addEventListener("DOMContentLoaded", () => {
      const searchToggle = document.getElementById("search-toggle");
      const searchBar = document.getElementById("search-bar");
      const closeSearch = document.getElementById("close-search");
  
      // Open the search bar
      searchToggle.addEventListener("click", () => {
          searchBar.style.display = "flex"; // Make the search bar visible
      });
  
      // Close the search bar
      closeSearch.addEventListener("click", () => {
          searchBar.style.display = "none"; // Hide the search bar
      });
  });