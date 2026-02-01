console.log('Cart.js loaded!');

document.querySelectorAll('.add-to-cart-form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const productName = form.dataset.productName;
    // Get the productId from the hidden input
    const productId = form.querySelector('[name="productId"]').value;

    console.log('Product ID:', productId);

    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      showNotification(`${productName} added to cart`);
    } else {
      showNotification('Error adding item to cart', true);
    }
  });
});

function showNotification(msg, isError = false) {
  const container = document.getElementById('notification-container');
  const div = document.createElement('div');
  div.textContent = msg;
  div.style.background = isError ? '#f44336' : '#4caf50';
  div.style.color = 'white';
  div.style.padding = '10px 20px';
  div.style.marginBottom = '10px';
  div.style.borderRadius = '4px';
  div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  container.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
