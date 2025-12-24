document.addEventListener("click", function (e) {

  // Buka modal
  if (e.target.id === "btnAddCategory") {
    document.getElementById("categoryModal")
      .classList.remove("hidden");
  }

  // Tutup modal
  if (e.target.id === "closeCategoryModal") {
    document.getElementById("categoryModal")
      .classList.add("hidden");
  }

  // Klik backdrop → tutup
  if (e.target.id === "categoryModal") {
    e.target.classList.add("hidden");
  }

});
