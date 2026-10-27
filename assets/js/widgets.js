/* ============================================================
   RoboQuest — rover simulator and enrolment form
   ============================================================ */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const PLAY_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 4 14 8-14 8V4Z"/></svg>';

  const i18n = window.RQ_I18N;
  const t = (key, vars) => i18n.t(key, vars);

  /* ---------- Rover simulator ---------- */
  const simScene = $("#simScene");
  if (simScene) {
    const simSlider = $("#distanceRange");
    const distanceOut = $("#distanceOut");
    const simDistance = $("#simDistance");
    const simMotor = $("#simMotor");
    const simLed = $("#simLed");
    const simStatus = $("#simStatus");
    const simStatusText = $("#simStatusText");
    const simRover = $("#simRover");
    const simCodeLines = $$(".code-line");
    const simCodeFooter = $("#simCodeFooter");
    const simCodeNote = $("#simCodeNote");
    const runButton = $("#simRun");
    const resetButton = $("#simReset");

    const MIN_DISTANCE = 5;
    const MAX_DISTANCE = 80;
    const THRESHOLD = 25;
    const MAX_TRAVEL = 230;
    let autoTimer = null;
    let testing = false;

    function clampDistance(value) {
      return Math.max(MIN_DISTANCE, Math.min(MAX_DISTANCE, Math.round(value)));
    }

    function renderSim(rawDistance) {
      const distance = clampDistance(rawDistance);
      const stopped = distance < THRESHOLD;
      const progress = (MAX_DISTANCE - distance) / (MAX_DISTANCE - MIN_DISTANCE);
      const travel = progress * MAX_TRAVEL;

      simSlider.value = String(distance);
      distanceOut.textContent = `${distance} cm`;
      simDistance.textContent = `${distance} cm`;
      simRover.style.transform = `translate(${travel.toFixed(1)}px, 0px)`;

      simScene.classList.toggle("is-stopped", stopped);
      simScene.classList.toggle("is-moving", !stopped);

      simMotor.textContent = stopped ? "stop()" : "forward()";
      simMotor.className = stopped ? "red" : "green";
      simLed.textContent = stopped ? "RED" : "GREEN";
      simLed.className = stopped ? "red" : "green";

      simStatus.classList.toggle("is-danger", stopped);
      simStatusText.textContent = stopped
        ? t("sim.statusStopped")
        : t("sim.statusClear");

      simCodeLines.forEach((line) => {
        const lineNumber = Number(line.dataset.line);
        const active = stopped
          ? lineNumber === 4 || lineNumber === 5 || lineNumber === 6
          : lineNumber === 4 || lineNumber === 8 || lineNumber === 9;
        line.classList.toggle("is-active", active);
      });

      simCodeFooter.classList.toggle("is-danger", stopped);
      simCodeNote.textContent = stopped
        ? t("sim.brake")
        : t("sim.loop");
    }

    function setRunLabel(label) {
      runButton.innerHTML = `${PLAY_SVG}<span>${label}</span>`;
    }

    function haltTest() {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
      if (testing) {
        testing = false;
        runButton.disabled = false;
        setRunLabel(t("sim.run"));
      }
    }

    function runTest() {
      haltTest();
      testing = true;
      runButton.disabled = true;
      setRunLabel(t("sim.testing"));
      renderSim(78);

      let distance = 78;
      autoTimer = window.setInterval(() => {
        distance -= 1.1;
        if (distance <= 24) {
          renderSim(24);
          haltTest();
          return;
        }
        renderSim(distance);
      }, 38);
    }

    simSlider.addEventListener("input", () => {
      haltTest();
      renderSim(Number(simSlider.value));
    });

    runButton.addEventListener("click", runTest);
    resetButton.addEventListener("click", () => {
      haltTest();
      renderSim(70);
    });

    renderSim(70);

    document.addEventListener("rq:languagechange", () => {
      setRunLabel(testing ? t("sim.testing") : t("sim.run"));
      renderSim(Number(simSlider.value));
    });
  }

  /* ---------- Enrolment form ---------- */
  const form = $("#enrollForm");
  if (form) {
    const formHead = $("#formHead");
    const success = $("#enrollSuccess");
    const successText = $("#successText");
    const bookAnother = $("#bookAnother");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const fields = [
      {
        input: $("#studentName"),
        error: $("#nameError"),
        validate: (value) => value.trim().length >= 2,
        messageKey: "form.nameError",
        activeErrorKey: null
      },
      {
        input: $("#studentClass"),
        error: $("#classError"),
        validate: (value) => value !== "",
        messageKey: "form.classError",
        activeErrorKey: null
      },
      {
        input: $("#parentEmail"),
        error: $("#emailError"),
        validate: (value) => value.trim() !== "" && emailPattern.test(value.trim()),
        messageKey: "form.emailError",
        activeErrorKey: null
      }
    ];

    function setFieldError(field, messageKey) {
      const wrapper = field.input.closest(".field");
      field.activeErrorKey = messageKey;
      wrapper.classList.add("is-invalid");
      field.error.textContent = t(messageKey);
      field.input.setAttribute("aria-invalid", "true");
    }

    function clearFieldError(field) {
      const wrapper = field.input.closest(".field");
      field.activeErrorKey = null;
      wrapper.classList.remove("is-invalid");
      field.error.textContent = "";
      field.input.removeAttribute("aria-invalid");
    }

    function updateSuccessText() {
      const studentName = $("#studentName").value.trim();
      const classNumber = $("#studentClass").value;
      const email = $("#parentEmail").value.trim();
      const batchSelect = $("#batch");
      const batchLabel = batchSelect.value
        ? batchSelect.selectedOptions[0].textContent.trim()
        : "";
      successText.textContent = batchLabel
        ? t("form.successBatch", { name: studentName, n: classNumber, email, batch: batchLabel })
        : t("form.successNoBatch", { name: studentName, n: classNumber, email });
    }

    fields.forEach((field) => {
      [field.input].forEach((input) => {
        input.addEventListener("input", () => clearFieldError(field));
        input.addEventListener("change", () => clearFieldError(field));
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;

      fields.forEach((field) => {
        const value = field.input.value;
        let valid = field.validate(value);
        let messageKey = field.messageKey;

        if (field.input.id === "parentEmail" && value.trim() !== "" && !emailPattern.test(value.trim())) {
          valid = false;
          messageKey = "form.emailInvalid";
        }

        if (!valid) {
          setFieldError(field, messageKey);
          if (!firstInvalid) firstInvalid = field.input;
        } else {
          clearFieldError(field);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      updateSuccessText();

      formHead.hidden = true;
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    });

    document.addEventListener("rq:languagechange", () => {
      fields.forEach((field) => {
        if (field.activeErrorKey) field.error.textContent = t(field.activeErrorKey);
      });
      if (!success.hidden) updateSuccessText();
    });

    bookAnother.addEventListener("click", () => {
      form.reset();
      fields.forEach(clearFieldError);
      success.hidden = true;
      formHead.hidden = false;
      form.hidden = false;
      $("#studentName").focus();
    });
  }
})();
