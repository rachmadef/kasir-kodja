document.addEventListener("DOMContentLoaded", () => {

  // Dummy stats (nanti dari API)
  document.getElementById("totalTransaksi").innerText = 40;
  document.getElementById("transaksiHariIni").innerText = 5;
  document.getElementById("totalKategori").innerText = 6;
  document.getElementById("transaksiLunas").innerText = 32;

  // Chart
  const ctx = document.getElementById("chartPendapatan");

  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [{
          label: "Pendapatan",
          data: [120000, 150000, 100000, 180000, 200000, 170000, 220000],
          borderColor: "#6366f1",
          backgroundColor: "rgba(99,102,241,0.1)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

});
document.addEventListener("DOMContentLoaded", () => {
  const showWelcome = localStorage.getItem("showWelcome");
  const modal = document.getElementById("welcomeModal");

  if (showWelcome === "true" && modal) {
    const role = localStorage.getItem("role") || "karyawan";
    document.getElementById("welcomeRole").innerText =
      role === "admin" ? "Admin" : "Karyawan";

    modal.classList.remove("hidden");
  }
});

// Tutup modal
document.addEventListener("click", function (e) {
  if (e.target.id === "closeWelcomeModal") {
    document.getElementById("welcomeModal").classList.add("hidden");
    localStorage.removeItem("showWelcome");
  }
});
