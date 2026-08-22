/* ==========================================================================
   LeakTech Waterproofing — main.js
   Vanilla JS: mobile nav, lightbox gallery, FAQ accordion, quote form
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when a link is clicked (mobile)
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on Escape / outside click
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Set active nav link based on current page ---------- */
  (function setActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".primary-nav a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  })();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (expanded) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg, lightboxCaption, lightboxPic, current = 0;

  if (galleryItems.length && lightbox) {
    lightboxImg = lightbox.querySelector(".lightbox__img");
    lightboxCaption = lightbox.querySelector(".lightbox__caption");
    // <picture> wrapper for WebP support in the lightbox; created on demand.
    lightboxPic = document.createElement("picture");
    lightboxImg.parentNode.insertBefore(lightboxPic, lightboxImg);
    lightboxPic.appendChild(lightboxImg);

    // Pick the best-format source the browser supports, with JPEG fallback.
    function bestSrc(item) {
      var webp = item.getAttribute("data-full-webp");
      var jpeg = item.getAttribute("data-full") || item.getAttribute("href");
      var canWebp = false;
      try {
        canWebp = document.createElement("canvas")
          .toDataURL("image/webp").indexOf("data:image/webp") === 0;
      } catch (e) { /* older browsers */ }
      return canWebp && webp ? webp : jpeg;
    }

    // Preload the next image so navigation feels instant.
    function preload(src) {
      if (!src) return;
      var img = new Image();
      img.src = src;
    }

    function show(index) {
      current = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[current];
      var src = bestSrc(item);
      var caption = item.getAttribute("data-caption") || "";
      lightboxImg.setAttribute("src", src);
      lightboxImg.setAttribute("alt", caption);
      lightboxCaption.textContent = caption;
      // Warm the cache for the neighbours.
      preload(bestSrc(galleryItems[(current + 1) % galleryItems.length]));
      preload(bestSrc(galleryItems[(current - 1 + galleryItems.length) % galleryItems.length]));
    }

    function openLightbox(index) {
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox__close").focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(i);
      });
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
    lightbox.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Quote request form (client-side validation + FormSubmit) ---------- */
  // The form posts to FormSubmit (https://formsubmit.co), a free service that
  // forwards form submissions to our email without needing a backend or account.
  // We only block submission when validation fails; otherwise we let the browser
  // POST the form naturally, and FormSubmit redirects back to the page anchor
  // (#thank-you) so the success message can be revealed.
  var form = document.querySelector("#quote-form");
  if (form) {
    var successBox = form.querySelector(".form-success");

    function setError(field, msg) {
      field.classList.add("invalid");
      var err = field.querySelector(".field__error");
      if (err) err.textContent = msg;
    }
    function clearError(field) {
      field.classList.remove("invalid");
      var err = field.querySelector(".field__error");
      if (err) err.textContent = "";
    }
    function showSuccess() {
      if (!successBox) return;
      successBox.classList.add("is-visible");
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.addEventListener("submit", function (e) {
      var valid = true;
      var required = form.querySelectorAll("[data-required]");

      required.forEach(function (input) {
        var field = input.closest(".field");
        clearError(field);
        var value = input.value.trim();

        if (!value) {
          setError(field, "This field is required.");
          valid = false;
        } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setError(field, "Please enter a valid email address.");
          valid = false;
        } else if (input.type === "tel" && value.replace(/\D/g, "").length < 9) {
          setError(field, "Please enter a valid phone number.");
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        var firstInvalid = form.querySelector(".invalid input, .invalid select, .invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Valid — show the in-page success box before the browser POSTs to FormSubmit.
      showSuccess();
      // Allow the form to submit naturally; FormSubmit will email the lead and
      // redirect back to #thank-you (handled below).
    });

    // After a FormSubmit redirect lands back at #thank-you, reveal the success
    // box and scroll it into view.
    if (window.location.hash === "#thank-you" && successBox) {
      showSuccess();
    }

    // Clear errors as the user types
    form.querySelectorAll("[data-required]").forEach(function (input) {
      input.addEventListener("input", function () {
        clearError(input.closest(".field"));
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();