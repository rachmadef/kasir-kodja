let cart = [];

function renderCart() {
  const cartEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartEl.innerHTML = `<p class="text-sm text-gray-400 text-center">Belum ada item</p>`;
    totalEl.innerText = "Rp 0";
    return;
  }

  let total = 0;
  cartEl.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "flex justify-between items-center text-sm";

    row.innerHTML = `
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-xs text-gray-500">
          ${item.qty} x Rp ${item.price.toLocaleString()}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button data-id="${item.id}" data-action="minus">−</button>
        <button data-id="${item.id}" data-action="plus">+</button>
      </div>
    `;

    cartEl.appendChild(row);
  });

  totalEl.innerText = "Rp " + total.toLocaleString();
}

document.addEventListener("click", function (e) {
  // Add product
  const product = e.target.closest(".product-card");
  if (product) {
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);

    const existing = cart.find((i) => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
  }

  // Qty buttons
  if (e.target.dataset.action) {
    const item = cart.find((i) => i.id === e.target.dataset.id);
    if (!item) return;

    if (e.target.dataset.action === "plus") item.qty++;
    if (e.target.dataset.action === "minus") item.qty--;

    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== item.id);
    }

    renderCart();
  }

  // Checkout
  if (e.target.id === "btnCheckout") {
    const method = document.getElementById("paymentMethod").value;
    if (!method) return alert("Pilih metode pembayaran");

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("payment_method", method);

    const menu = document.querySelector('[data-page="invoice"]');
    if (menu) menu.click();
  }
});

// Search produk
document.addEventListener("input", function (e) {
  if (e.target.id === "posSearch") {
    const keyword = e.target.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(keyword) ? "" : "none";
    });
  }
});
