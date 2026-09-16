/**
 * MOVENEST — dashboard.js
 * Small interactions scoped to the customer dashboard: a brief loading
 * skeleton on first paint (demonstrating the loading-state pattern), and
 * dismissible notifications.
 */

(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const skeletons = document.querySelectorAll("[data-skeleton-target]");
    if (skeletons.length) {
      window.setTimeout(() => {
        skeletons.forEach((skel) => {
          const targetSel = skel.getAttribute("data-skeleton-target");
          const target = document.querySelector(targetSel);
          skel.classList.add("d-none");
          if (target) target.classList.remove("d-none");
        });
      }, 650);
    }
  });

  document.addEventListener("click", (e) => {
    const dismissBtn = e.target.closest("[data-dismiss-notif]");
    if (!dismissBtn) return;
    const item = dismissBtn.closest(".notif-item");
    if (item) {
      item.style.opacity = "0";
      window.setTimeout(() => item.remove(), 200);
    }
  });
})();
