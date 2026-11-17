/* ============================================================
   RoboQuest for Schools — shared page interactions
   Mobile navigation, reveals, FAQ, gallery lightbox and forms
   ============================================================ */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: scroll state + mobile navigation ---------- */
  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const siteNav = $("#siteNav");

  if (header && navToggle && siteNav) {
    const setNav = (open) => {
      header.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    navToggle.addEventListener("click", () => {
      setNav(!header.classList.contains("nav-open"));
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("click", (event) => {
      if (header.classList.contains("nav-open") && !header.contains(event.target)) setNav(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("nav-open")) {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && header.classList.contains("nav-open")) setNav(false);
    });

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveals ---------- */
  const revealElements = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  /* ---------- FAQ: one answer open at a time ---------- */
  const faqItems = $$(".school-faq details");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Gallery: filtering + lightbox ---------- */
  const gallerySection = $("[data-gallery-section]");
  const gallery = $("#schoolGallery");

  if (gallerySection && gallery) {
    const filters = $$("[data-gallery-filter]", gallerySection);
    const items = $$(".school-gallery-item", gallery);
    const status = $("#galleryStatus");

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.galleryFilter;
        let visible = 0;

        filters.forEach((other) => {
          const active = other === button;
          other.classList.toggle("is-active", active);
          other.setAttribute("aria-pressed", String(active));
        });

        items.forEach((item) => {
          const show = filter === "all" || item.dataset.galleryCat === filter;
          item.hidden = !show;
          if (show) visible += 1;
        });

        if (status) {
          status.textContent = filter === "all"
            ? `Showing all ${visible} photos.`
            : `Showing ${visible} photos in this collection.`;
        }
      });
    });

    const lightbox = $("#schoolLightbox");
    const lightboxImg = $("#schoolLightboxImg");
    const lightboxCaption = $("#schoolLightboxCaption");
    const lightboxClose = $("#schoolLightboxClose");
    let lastFocusedItem = null;

    const closeLightbox = () => {
      if (!lightbox || lightbox.hidden) return;
      lightbox.hidden = true;
      document.body.classList.remove("modal-open");
      if (lastFocusedItem) lastFocusedItem.focus({ preventScroll: true });
    };

    const openLightbox = (item) => {
      if (!lightbox || !lightboxImg || !lightboxCaption) return;
      const image = $("img", item);
      if (!image) return;

      lastFocusedItem = item;
      lightboxImg.src = item.dataset.full || image.src;
      lightboxImg.alt = image.alt;
      lightboxCaption.textContent = item.dataset.caption || $("span", item)?.textContent || "";
      lightbox.hidden = false;
      document.body.classList.add("modal-open");
      if (lightboxClose) lightboxClose.focus({ preventScroll: true });
    };

    items.forEach((item) => {
      item.addEventListener("click", () => openLightbox(item));
    });

    $$("[data-close-lightbox]").forEach((element) => {
      element.addEventListener("click", closeLightbox);
    });

    if (lightbox) {
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });

      document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) return;
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "Tab" && lightboxClose) {
          event.preventDefault();
          lightboxClose.focus();
        }
      });
    }
  }

  /* ---------- School enquiry forms ---------- */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  $$("[data-school-form]").forEach((form) => {
    const card = form.closest(".school-form-card") || form.parentElement;
    const formHead = $("[data-form-head]", card);
    const success = $("[data-form-success]", card);
    const successText = $("[data-success-text]", success || card);
    const resetButton = $("[data-form-reset]", card);
    const requiredFields = $$("input[required], select[required], textarea[required]", form);

    const fieldLabel = (input) => {
      const field = input.closest(".field");
      const label = field ? $("label", field) : null;
      return label ? label.textContent.replace("*", "").replace(/\(optional\)/i, "").trim() : "This field";
    };

    const errorFor = (input) => {
      const field = input.closest(".field");
      return field ? $(".error", field) : null;
    };

    const clearError = (input) => {
      const field = input.closest(".field");
      if (field) field.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      const error = errorFor(input);
      if (error) error.textContent = "";
    };

    const setError = (input, message) => {
      const field = input.closest(".field");
      if (field) field.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      const error = errorFor(input);
      if (error) error.textContent = message;
    };

    const validate = (input) => {
      const value = input.value.trim();
      if (input.required && value === "") {
        setError(input, `${fieldLabel(input)} is required.`);
        return false;
      }
      if (input.type === "email" && value !== "" && !emailPattern.test(value)) {
        setError(input, "Enter a valid email address, like name@school.edu.in.");
        return false;
      }
      clearError(input);
      return true;
    };

    requiredFields.forEach((input) => {
      input.addEventListener("input", () => clearError(input));
      input.addEventListener("change", () => clearError(input));
      input.addEventListener("blur", () => {
        if (input.value.trim() !== "" || input.required) validate(input);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;

      requiredFields.forEach((input) => {
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const values = Object.fromEntries(new FormData(form).entries());
      const school = String(values.schoolName || "your school").trim();
      const contact = String(values.contactName || "").trim();

      try {
        const key = "rqSchoolEnquiries";
        const saved = JSON.parse(window.localStorage.getItem(key) || "[]");
        saved.push({ ...values, submittedAt: new Date().toISOString() });
        window.localStorage.setItem(key, JSON.stringify(saved));
      } catch (error) {
        /* Storage can be unavailable in private browsing. The success state still works. */
      }

      if (successText) {
        successText.textContent = contact
          ? `Thanks, ${contact}. We’ve logged the request for ${school} and will reply within two school days.`
          : `Thanks — we’ve logged the request for ${school} and will reply within two school days.`;
      }

      if (formHead) formHead.hidden = true;
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus({ preventScroll: true });
        success.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      }
    });

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        form.reset();
        requiredFields.forEach(clearError);
        if (success) success.hidden = true;
        if (formHead) formHead.hidden = false;
        form.hidden = false;
        const firstInput = $("input, select, textarea", form);
        if (firstInput) firstInput.focus();
      });
    }
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
