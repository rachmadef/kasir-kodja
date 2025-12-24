// === SEARCH PRODUK (REALTIME) ===
document.addEventListener("input", function (e) {
  if (e.target.id === "productSearch") {
    const keyword = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".product-row");

    rows.forEach(row => {
      const name = row.dataset.name || "";
      const category = row.dataset.category || "";

      const match =
        name.includes(keyword) ||
        category.includes(keyword);

      row.style.display = match ? "" : "none";
    });
  }
});

// === MODAL HANDLER ===
document.addEventListener("click", function (e) {

  // Buka modal
  if (e.target.id === "btnAddProduct") {
    document.getElementById("productModal")
      .classList.remove("hidden");
  }

  // Tutup modal (button)
  if (e.target.id === "closeProductModal") {
    document.getElementById("productModal")
      .classList.add("hidden");
  }

  // Tutup modal (backdrop)
  if (e.target.id === "productModal") {
    e.target.classList.add("hidden");
  }

});
