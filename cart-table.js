document.addEventListener('DOMContentLoaded', function() {
  const cartItemsContainer = document.querySelector('.cart-table');
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  console.log(cartItemsContainer);
  // Update cart items and total
  function updateCart() {
    console.log('updateCart() called');
    // Clear existing items from the cart
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through each item in the cart and add it to the table
cartItems.forEach(item => {
  console.log(item);
  if (item.quantity > 0) {
    const itemContainer = document.createElement('tr');
    itemContainer.classList.add('bomb_s');
    itemContainer.innerHTML = `
      <td class="bomb">
        <img src=${item.img}>
        <h3>${item.name}</h3>
      </td>
      <td>
        <input type="number" min="1" class="item-quantity" value="${item.quantity}">
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td class="local-total">$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="clear-btn">X</button></td>
    `;
    cartItemsContainer.appendChild(itemContainer);

    // Update total
    total += item.price * item.quantity;

    const quantityInput = itemContainer.querySelector('.item-quantity');
    const localTotalCell = itemContainer.querySelector('.local-total');
    quantityInput.addEventListener('input', () => {
      item.quantity = parseInt(quantityInput.value);
      item.total = item.price * item.quantity;
      localTotalCell.textContent = `$${item.total.toFixed(2)}`;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateTotal();
    });

    const clearBtn = itemContainer.querySelector('.clear-btn');
    clearBtn.addEventListener('click', () => {
      item.quantity = 0;
      item.total = 0;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCart();
    });
  }
});

    const totalContainer = document.querySelector('.total');
    totalContainer.textContent = `$${total.toFixed(2)}`;
  }

  // Add the new item to the cart
  function addItemToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name: name, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  //Update Total
  function updateTotal() {
    total = cartItems.reduce((accumulator, item) => {
      return accumulator + (item.price * item.quantity);
    }, 0);
    const totalContainer = document.querySelector('.total');
    totalContainer.textContent = `$${total.toFixed(2)}`;
  }

  // Find all the buy buttons and add an event listener to each one
  const buyBtns = document.querySelectorAll('.buy-btn');
  buyBtns.forEach(buyBtn => {
    buyBtn.addEventListener('click', (event) => {
      const bombName = event.target.getAttribute('data-name');
      const price = event.target.getAttribute('data-price');
      addItemToCart(bombName, price);
    });
  });

  if (cartItemsContainer) {
    updateCart();
  }
});