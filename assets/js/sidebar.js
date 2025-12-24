document.addEventListener("click", function (e) {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    /* === TOGGLE SIDEBAR (HAMBURGER) === */
    if (e.target.closest("#toggleSidebar")) {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    }

    /* === CLICK OVERLAY === */
    if (e.target.id === "sidebarOverlay") {
        closeSidebar();
    }

    /* === CLICK MENU (AUTO CLOSE MOBILE) === */
    if (e.target.closest(".sidebar-item")) {
        if (window.innerWidth < 768) {
            closeSidebar();
        }
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }
});