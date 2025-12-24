// ================= ROLE ACCESS FILTER =================
function applyRoleAccess() {
  const role = localStorage.getItem("role") || "karyawan";

  document.querySelectorAll("[data-role]").forEach(menu => {
    const allowed = menu.dataset.role.split(",");
    menu.style.display = allowed.includes(role) ? "" : "none";
  });
}

// ================= LOAD COMPONENT =================
async function loadComponent(id, path) {
  const res = await fetch(path);
  document.getElementById(id).innerHTML = await res.text();
}

// ================= ROLE CHECK =================
function isAllowed(page) {
  const role = localStorage.getItem("role") || "karyawan";
  const menu = document.querySelector(`[data-page="${page}"]`);
  if (!menu) return false;
  return menu.dataset.role.split(",").includes(role);
}

// ================= ACTIVE MENU =================
function setActiveMenu(page) {
  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });
}

// ================= LOAD PAGE SCRIPT =================
function loadPageScript(page) {
  const scripts = {
    dashboard: "./assets/js/dashboard.js",
    users: "./assets/js/users.js",
    categories: "./assets/js/categories.js",
    products: "./assets/js/products.js",
    orders: "./assets/js/orders.js",
    pos: "./assets/js/pos.js",
    invoice: "./assets/js/invoice.js",
  };

  if (!scripts[page]) return;

  // hapus script lama agar tidak dobel
  const oldScript = document.getElementById("page-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = scripts[page];
  script.id = "page-script";
  document.body.appendChild(script);
}

// ================= LOAD PAGE =================
async function loadPage(page) {
  if (!isAllowed(page)) {
    alert("Anda tidak memiliki akses ke halaman ini");
    return;
  }

  // HILANGKAN WELCOME STATE JIKA ADA
  const welcome = document.getElementById("welcomeState");
  if (welcome) welcome.remove();

  const res = await fetch(`./pages/${page}.html`);
  document.getElementById("content").innerHTML = await res.text();

  setActiveMenu(page);
  loadPageScript(page);
}

// ================= MENU CLICK =================
document.addEventListener("click", function (e) {
  const menu = e.target.closest("[data-page]");
  if (menu) {
    e.preventDefault();
    loadPage(menu.dataset.page);
  }
});

// ================= INIT APP =================
window.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("sidebar", "./layouts/sidebar.html");
  await loadComponent("navbar", "./layouts/navbar.html");

  applyRoleAccess();

  // SET ROLE TEXT DI WELCOME (jika ada)
  const role = localStorage.getItem("role") || "karyawan";
  const roleEl = document.getElementById("welcomeRole");
  if (roleEl) {
    roleEl.innerText = role === "admin" ? "Admin" : "Karyawan";
  }

  // CEK APAKAH BARU LOGIN
  const showWelcome = localStorage.getItem("showWelcome");

  if (showWelcome === "true") {
    // login pertama → tampilkan welcome (dashboard akan dimuat setelah modal ditutup)
    localStorage.removeItem("showWelcome");
  } else {
    // refresh / buka ulang → langsung ke dashboard
    loadPage("dashboard");
  }
});
