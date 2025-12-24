document.addEventListener("click", function (e) {

  // Buka modal
  if (e.target.id === "btnAddUser") {
    document.getElementById("userModal")
      .classList.remove("hidden");
  }

  // Tutup modal
  if (e.target.id === "closeUserModal") {
    document.getElementById("userModal")
      .classList.add("hidden");
  }
    if (e.target.id === "userModal") {
    e.target.classList.add("hidden");
    }

});
