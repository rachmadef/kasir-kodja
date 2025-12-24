function applyOrderFilters() {
  const keyword = (document.getElementById("orderSearch")?.value || "").toLowerCase();
  const status = (document.getElementById("orderStatusFilter")?.value || "all").toLowerCase();
  const method = (document.getElementById("orderMethodFilter")?.value || "all").toLowerCase();

  const rows = document.querySelectorAll(".order-row");

  rows.forEach(row => {
    const invoice = (row.dataset.invoice || "").toLowerCase();
    const customer = (row.dataset.customer || "").toLowerCase();
    const rowMethod = (row.dataset.method || "").toLowerCase();
    const rowStatus = (row.dataset.status || "").toLowerCase();

    const matchKeyword =
      invoice.includes(keyword) ||
      customer.includes(keyword) ||
      rowMethod.includes(keyword);

    const matchStatus = status === "all" ? true : rowStatus === status;
    const matchMethod = method === "all" ? true : rowMethod === method;

    row.style.display = (matchKeyword && matchStatus && matchMethod) ? "" : "none";
  });

  const visible = [...rows].some(r => r.style.display !== "none");
  document.getElementById("noOrderFound")?.classList.toggle("hidden", visible);
}

// Search & filter change
document.addEventListener("input", function (e) {
  if (e.target.id === "orderSearch") applyOrderFilters();
});

document.addEventListener("change", function (e) {
  if (e.target.id === "orderStatusFilter" || e.target.id === "orderMethodFilter") {
    applyOrderFilters();
  }
});

// Buttons & actions
document.addEventListener("click", function (e) {

  // Tambah pesanan => redirect ke POS
  if (e.target.id === "btnAddOrder") {
    // Bisa juga set mode: "new-order"
    localStorage.setItem("pos_mode", "new");
    // pindah halaman POS di SPA kita:
    const menu = document.querySelector('[data-page="pos"]');
    if (menu) menu.click();
  }

  const actionBtn = e.target.closest("[data-action]");
  if (actionBtn) {
    const action = actionBtn.dataset.action;
    const id = actionBtn.dataset.id;

    if (action === "detail") {
      // simpan id transaksi sementara
      localStorage.setItem("order_id", id);

      // nanti kita buat page detail order:
      // loadPage("invoice") atau "order-detail"
      alert("Nanti: buka detail pesanan id = " + id);
    }

    if (action === "print") {
      localStorage.setItem("order_id", id);
      // nanti page print.html
      alert("Nanti: buka halaman print untuk id = " + id);
    }
  }
});
