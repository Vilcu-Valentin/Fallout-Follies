document.addEventListener('DOMContentLoaded', function(){
  const buyBtns = document.querySelectorAll('.buy-btn');
  const cartItemsContainer = document.querySelector('.cart-table');
let cartItems = [];
try {
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
} catch (error) {
  console.error('Error parsing cart items:', error);
  localStorage.removeItem('cartItems');
}

  buyBtns.forEach(buyBtn => {
    buyBtn.addEventListener('click', (event) => {
      const bombName = document.querySelector('#bomb-name').textContent;
      const imgName = document.querySelector('#img-name').getAttribute('src');
      const price = document.querySelector('#price').textContent;

      // Add the item to the cart
      const existingItem = cartItems.find(item => item.name === bombName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ name: bombName, img: imgName, price: parseFloat(price), quantity: 1 });
      }

      // Save the cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Create the pop-up content
      const overlay = document.createElement('div');
      const popup = document.createElement('div');
      overlay.classList.add('overlay');
      popup.classList.add('popup');
      popup.innerHTML = `
        <h3>Added to cart!</h3>
        <p>${bombName} has been added to your cart.</p>
        <p>$${price}</p>
        <button class="close-btn">Close</button>
        <a href="cart.html"><button>To Cart</button></a>
      `;

      // Add the pop-up to the page
      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      // Close the pop-up when the "Close" button is clicked
      const closeBtn = popup.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        popup.remove();
        overlay.remove();
      });
    });
  });
});