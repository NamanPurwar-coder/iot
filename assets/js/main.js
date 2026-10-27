/* ============================================================
   RoboQuest — navigation, journey, project gallery & modal
   ============================================================ */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = reducedMotion ? "auto" : "smooth";

  const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const CLOCK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const GRID_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  const BOLT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>';

  const i18n = window.RQ_I18N;
  const t = (key, vars) => i18n.t(key, vars);
  const isHindi = () => i18n.lang === "hi";

  function getJourneyStages() {
    if (!isHindi() || typeof JOURNEY_STAGES_HI === "undefined") return JOURNEY_STAGES;
    return JOURNEY_STAGES.map((stage, index) => ({
      ...stage,
      ...(JOURNEY_STAGES_HI[index] || {})
    }));
  }

  function getBotFacts() {
    return isHindi() && typeof BOT_FACTS_HI !== "undefined" ? BOT_FACTS_HI : BOT_FACTS;
  }

  function getProject(slug) {
    const base = PROJECTS[slug];
    if (!base) return null;
    if (!isHindi() || typeof PROJECTS_HI === "undefined" || !PROJECTS_HI[slug]) return base;
    return { ...base, ...PROJECTS_HI[slug] };
  }

  /* ---------- Mobile navigation ---------- */
  const header = $("#siteHeader");
  const navToggle = $("#navToggle");
  const siteNav = $("#siteNav");

  function setNav(open) {
    header.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? t("nav.closeMenu") : t("nav.openMenu"));
  }

  navToggle.addEventListener("click", () => {
    setNav(!header.classList.contains("nav-open"));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setNav(false);
  });

  document.addEventListener("click", (event) => {
    if (header.classList.contains("nav-open") && !header.contains(event.target)) {
      setNav(false);
    }
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

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active section in navigation ---------- */
  const navLinks = $$(".nav-links a");
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === id;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: 0 }
    );
    navSections.forEach((section) => navObserver.observe(section));
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

  /* ---------- Bolt the mascot ---------- */
  const botStage = $("#botStage");
  const botButton = $("#botButton");
  const botSpeech = $("#botSpeech");
  let factIndex = 0;
  let lastFactIndex = -1;
  let speechTimer = null;
  let bopTimer = null;

  function showBotSpeech(text) {
    if (!botStage || !botSpeech) return;
    botSpeech.textContent = text;
    botStage.classList.add("is-talking");
    window.clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => botStage.classList.remove("is-talking"), 8500);

    botStage.classList.remove("is-bopping");
    void botStage.offsetWidth;
    botStage.classList.add("is-bopping");
    window.clearTimeout(bopTimer);
    bopTimer = window.setTimeout(() => botStage.classList.remove("is-bopping"), 650);
  }

  if (botButton) {
    botButton.addEventListener("click", () => {
      const facts = getBotFacts();
      const index = factIndex % facts.length;
      lastFactIndex = index;
      showBotSpeech(facts[index]);
      factIndex += 1;
    });

    window.setTimeout(() => {
      if (botStage) botStage.classList.remove("is-talking");
    }, 9000);
  }

  /* ---------- Project journey tabs ---------- */
  const stepper = $("#journeyStepper");
  const stageTabs = $$(".journey-step");
  const journeyPanel = $("#journeyPanel");
  const journeyProgress = $("#journeyProgress");
  const journeyIcon = $("#journeyIcon");
  const journeyCount = $("#journeyCount");
  const journeyDuration = $("#journeyDuration");
  const journeyTitle = $("#journeyTitle");
  const journeyDesc = $("#journeyDesc");
  const journeyList = $("#journeyList");
  const journeyTakeaway = $("#journeyTakeaway");
  const journeyNext = $("#journeyNext");
  const journeySection = $("#journey");
  let currentStage = 0;

  const journeyAnnouncer = document.createElement("p");
  journeyAnnouncer.className = "sr-only";
  journeyAnnouncer.setAttribute("aria-live", "polite");
  journeySection.querySelector(".container").appendChild(journeyAnnouncer);

  function setStage(index, focusPanel = false) {
    if (!stageTabs.length) return;
    const stages = getJourneyStages();
    currentStage = Math.max(0, Math.min(index, stages.length - 1));
    const stage = stages[currentStage];

    stageTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === currentStage;
      tab.classList.toggle("is-active", isActive);
      tab.classList.toggle("is-done", tabIndex < currentStage);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      const stageData = stages[tabIndex];
      if (stageData) {
        const label = tab.querySelector(".step-label");
        const caption = tab.querySelector(".step-caption");
        if (label) label.textContent = stageData.label;
        if (caption) caption.textContent = t("journey.sessionShort", { n: tabIndex + 1 });
      }
    });

    journeyProgress.style.width = `${(currentStage / (stages.length - 1)) * 100}%`;
    journeyPanel.style.setProperty("--stage-accent", stage.color);
    journeyPanel.style.setProperty("--stage-tint", stage.tint);
    journeyPanel.setAttribute("aria-labelledby", `stage-tab-${currentStage}`);
    journeyIcon.innerHTML = stage.icon;
    journeyCount.textContent = `${String(currentStage + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`;
    journeyDuration.textContent = stage.duration;
    journeyTitle.textContent = stage.title;
    journeyDesc.textContent = stage.desc;
    journeyTakeaway.textContent = stage.takeaway;
    journeyList.innerHTML = stage.bullets.map((bullet) => `<li>${CHECK_SVG}${bullet}</li>`).join("");

    const nextStage = stages[(currentStage + 1) % stages.length];
    const nextLabel = currentStage === stages.length - 1
      ? t("journey.back", { label: nextStage.label })
      : t("journey.next", { label: nextStage.label });
    journeyNext.innerHTML = `${nextLabel} ${ARROW_SVG}`;
    journeyAnnouncer.textContent = t("journey.announce", {
      n: currentStage + 1,
      total: stages.length,
      title: stage.title
    });

    journeyPanel.classList.remove("is-swapping");
    void journeyPanel.offsetWidth;
    journeyPanel.classList.add("is-swapping");

    if (focusPanel) journeyPanel.focus({ preventScroll: true });
    if (i18n && typeof i18n.apply === "function") i18n.apply(journeySection);
  }

  stageTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setStage(index));
  });

  if (stepper) {
    stepper.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const stages = getJourneyStages();
      let nextIndex = currentStage;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentStage + 1) % stages.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentStage - 1 + stages.length) % stages.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = stages.length - 1;
      }
      setStage(nextIndex);
      stageTabs[nextIndex].focus();
    });
  }

  journeyNext.addEventListener("click", () => {
    setStage((currentStage + 1) % getJourneyStages().length);
  });

  setStage(0, false);

  /* ---------- Project filtering ---------- */
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project-card");
  const filterStatus = $("#filterStatus");
  let currentFilter = "all";

  function applyFilter(filter, announce = true) {
    currentFilter = filter;
    let visible = 0;
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.class === filter;
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.classList.remove("card-pop");
        void card.offsetWidth;
        card.classList.add("card-pop");
      }
    });

    if (announce && filterStatus) {
      filterStatus.textContent = filter === "all"
        ? t("projects.statusAll", { count: visible })
        : t("projects.statusClass", { count: visible, n: filter });
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  $$(".track-link").forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.track);
      $("#projects").scrollIntoView({ behavior: scrollBehavior, block: "start" });
    });
  });

  /* ---------- Project modal ---------- */
  const modal = $("#projectModal");
  const modalCard = $("#modalCard");
  const modalImg = $("#modalImg");
  const modalBadges = $("#modalBadges");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalMeta = $("#modalMeta");
  const modalPhotos = $("#modalPhotos");
  const modalMaterials = $("#modalMaterials");
  const modalSteps = $("#modalSteps");
  const modalSkills = $("#modalSkills");
  const modalClassLabel = $("#modalClassLabel");
  const modalBook = $("#modalBook");
  let currentProject = null;
  let currentProjectSlug = null;
  let lastFocusedElement = null;

  function renderProjectModal(slug) {
    const project = getProject(slug);
    if (!project) return false;

    currentProject = project;
    currentProjectSlug = slug;

    modalImg.src = project.img;
    modalImg.alt = project.alt;
    modalBadges.innerHTML = `
      <span class="badge">${t("class.label", { n: project.classNum })}</span>
      <span class="badge ${project.levelClass}">${project.level}</span>
    `;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalMeta.innerHTML = `
      <span>${CLOCK_SVG}${project.sessions}</span>
      <span>${GRID_SVG}${project.classLabel}</span>
      <span>${BOLT_SVG}${project.board}</span>
    `;
    modalPhotos.innerHTML = (project.photos || []).map((photo) => `
      <figure class="modal-photo">
        <img src="${photo.src}" alt="${photo.alt}" width="800" height="520" loading="lazy" decoding="async">
        <figcaption>
          <span class="photo-tag">${photo.label}</span>
          <span class="photo-caption">${photo.caption}</span>
          <span class="photo-credit">${photo.credit}</span>
        </figcaption>
      </figure>`).join("");
    modalMaterials.innerHTML = project.materials.map((item) => `<li>${CHECK_SVG}${item}</li>`).join("");
    modalSteps.innerHTML = project.steps.map((step) => `<li>${step}</li>`).join("");
    modalSkills.innerHTML = project.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join("");
    modalClassLabel.textContent = t("class.label", { n: project.classNum });
    modalBook.innerHTML = `${t("modal.bookTrack", { n: project.classNum })} ${ARROW_SVG}`;

    if (i18n && typeof i18n.apply === "function") i18n.apply(modal);
    return true;
  }

  function openProjectModal(slug, trigger) {
    if (!renderProjectModal(slug)) return;

    lastFocusedElement = trigger || document.activeElement;
    if (header.classList.contains("nav-open")) setNav(false);

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalCard.scrollTop = 0;
    window.setTimeout(() => modalCard.focus({ preventScroll: true }), 10);
  }

  function closeProjectModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    currentProject = null;
    currentProjectSlug = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  function trapModalFocus(event) {
    const focusable = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modalCard)
      .filter((element) => !element.disabled && element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first || document.activeElement === modalCard) {
        event.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  $$(".project-open").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
  });

  $$(".project-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      const opener = card.querySelector(".project-open");
      if (opener) opener.click();
    });
  });

  $$("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeProjectModal();
    } else if (event.key === "Tab") {
      trapModalFocus(event);
    }
  });

  modalBook.addEventListener("click", () => {
    if (!currentProject) return;
    const classNumber = String(currentProject.classNum);
    closeProjectModal();

    const classSelect = $("#studentClass");
    classSelect.value = classNumber;
    classSelect.dispatchEvent(new Event("change", { bubbles: true }));

    $("#enroll").scrollIntoView({ behavior: scrollBehavior, block: "start" });
    window.setTimeout(() => {
      const firstName = $("#studentName");
      if (firstName && !firstName.closest("form").hidden) firstName.focus({ preventScroll: true });
    }, reducedMotion ? 60 : 550);
  });

  /* ---------- Language changes ---------- */
  document.addEventListener("rq:languagechange", () => {
    setNav(header.classList.contains("nav-open"));
    setStage(currentStage);
    applyFilter(currentFilter, true);

    if (!modal.hidden && currentProjectSlug) {
      renderProjectModal(currentProjectSlug);
    }

    if (lastFactIndex >= 0 && botSpeech) {
      const facts = getBotFacts();
      botSpeech.textContent = facts[lastFactIndex % facts.length];
    }
  });

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
