/**
 * MOVENEST — main.js
 * Shared behaviour for every page: theme (dark/light), scroll-reveal,
 * FAQ accordion, lightweight form validation, and small nav utilities.
 * No console output in production; errors are caught and ignored quietly
 * where a failure shouldn't block the page from working.
 */

(() => {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Theme: dark / light, persisted, respects prefers-color-scheme once
   * ------------------------------------------------------------------ */
  const THEME_KEY = "movenest-theme";

  function getPreferredTheme() {
    const stored = safeGet(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      const icon = btn.querySelector("i");
      if (icon) icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    });
  }

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }
  function safeSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (_) { /* storage unavailable, non-fatal */ }
  }

  applyTheme(getPreferredTheme());

  /* ------------------------------------------------------------------ *
   * Preloader — shown until the page (and its images) finishes loading
   * ------------------------------------------------------------------ */
  (function () {
    const pre = document.getElementById("preloader");
    if (!pre) return;
    document.body.classList.add("preload-active");

    let hidden = false;
    function hidePreloader() {
      if (hidden) return;
      hidden = true;
      document.body.classList.remove("preload-active");
      document.body.classList.add("preload-done");
      window.setTimeout(() => pre.remove(), 600);
    }

    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
    }
    // Safety net: never let a slow image/font block the page more than this.
    window.setTimeout(hidePreloader, 4000);
    // Pages restored from the back/forward cache are already loaded.
    window.addEventListener("pageshow", (e) => { if (e.persisted) hidePreloader(); });
  })();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSet(THEME_KEY, next);
  });

  /* ------------------------------------------------------------------ *
   * RTL toggle — persisted, mirrors the theme toggle behaviour
   * ------------------------------------------------------------------ */
  const RTL_KEY = "movenest-dir";

  function applyDir(dir) {
    document.documentElement.setAttribute("dir", dir);
    document.querySelectorAll("[data-rtl-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", dir === "rtl" ? "true" : "false");
      const icon = btn.querySelector("i");
      if (icon) icon.className = dir === "rtl" ? "bi bi-text-left" : "bi bi-text-right";
    });
  }

  applyDir(safeGet(RTL_KEY) === "rtl" ? "rtl" : "ltr");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rtl-toggle]");
    if (!btn) return;
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    const next = isRtl ? "ltr" : "rtl";
    applyDir(next);
    safeSet(RTL_KEY, next);
  });

  /* ------------------------------------------------------------------ *
   * Mark current-page nav link active
   * ------------------------------------------------------------------ */
  const currentFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
    if (href && href === currentFile) a.classList.add("active");
  });

  /* ------------------------------------------------------------------ *
   * Scroll reveal — a single IntersectionObserver for all .reveal items
   * ------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ------------------------------------------------------------------ *
   * FAQ accordion (lightweight, no Bootstrap collapse dependency)
   * ------------------------------------------------------------------ */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* ------------------------------------------------------------------ *
   * Lightweight, friendly inline form validation
   * Usage: add data-validate to a <form>; fields marked required get a
   * sibling .field-error paragraph shown/hidden with a specific message.
   * ------------------------------------------------------------------ */
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()),
    pincode: (v) => /^[0-9]{4,8}$/.test(v.trim()),
  };

  function messageFor(field) {
    const label = field.dataset.label || field.name || "This field";
    if (field.validity.valueMissing) return `Please enter your ${label.toLowerCase()}.`;
    if (field.type === "email" || field.dataset.validate === "email") return "Please enter a valid email address.";
    if (field.dataset.validate === "phone") return "Please enter a valid phone number.";
    if (field.dataset.validate === "pincode") return "Please enter a valid PIN code.";
    if (field.dataset.matchField) {
      const other = field.form.querySelector(`[name="${field.dataset.matchField}"]`);
      if (other && other.value !== field.value) return "Passwords do not match.";
    }
    if (field.type === "date" && field.dataset.futureOnly && field.value) {
      const chosen = new Date(field.value);
      const today = new Date(); today.setHours(0,0,0,0);
      if (chosen < today) return "Please choose a date from today onward.";
    }
    return `Please check your ${label.toLowerCase()}.`;
  }

  function fieldIsValid(field) {
    if (field.required && !field.value.trim()) return false;
    if (!field.value.trim() && !field.required) return true;
    if (field.dataset.validate && validators[field.dataset.validate]) {
      if (!validators[field.dataset.validate](field.value)) return false;
    }
    if (field.dataset.matchField) {
      const other = field.form.querySelector(`[name="${field.dataset.matchField}"]`);
      if (other && other.value !== field.value) return false;
    }
    if (field.type === "date" && field.dataset.futureOnly && field.value) {
      const chosen = new Date(field.value);
      const today = new Date(); today.setHours(0,0,0,0);
      if (chosen < today) return false;
    }
    return true;
  }

  function showFieldState(field, valid) {
    const err = field.parentElement.querySelector(".field-error");
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid && field.value.trim() !== "");
    if (err) {
      err.textContent = valid ? "" : messageFor(field);
      err.classList.toggle("show", !valid);
    }
  }

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach((field) => {
      field.addEventListener("blur", () => showFieldState(field, fieldIsValid(field)));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) showFieldState(field, fieldIsValid(field));
      });
    });
    form.addEventListener("submit", (e) => {
      let allValid = true;
      fields.forEach((field) => {
        const valid = fieldIsValid(field);
        showFieldState(field, valid);
        if (!valid) allValid = false;
      });
      if (!allValid) {
        e.preventDefault();
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const successHandler = form.dataset.onValidSubmit;
      if (successHandler && typeof window[successHandler] === "function") {
        e.preventDefault();
        window[successHandler](form);
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * Dashboard sidebar toggle (mobile)
   * ------------------------------------------------------------------ */
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const sidebar = document.querySelector(".dash-sidebar");
  const scrim = document.querySelector(".dash-scrim");
  if (sidebarToggle && sidebar) {
    const closeSidebar = () => { sidebar.classList.remove("open"); scrim && scrim.classList.remove("show"); };
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      scrim && scrim.classList.toggle("show");
    });
    scrim && scrim.addEventListener("click", closeSidebar);
  }

  /* ------------------------------------------------------------------ *
   * Print invoice
   * ------------------------------------------------------------------ */
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });
})();
