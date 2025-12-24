document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // === SIMULASI LOGIN ===
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    // Simpan session
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user_email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("showWelcome", "true");

    // Redirect ke main app
    window.location.href = "main.html";
  });
});
document.addEventListener("click", function (e) {
  if (e.target.id === "btnLogout") {
    localStorage.clear();
    window.location.href = "index.html";
  }
});
