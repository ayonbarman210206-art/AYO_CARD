/* =========================================================
   AYO-CARD
   app.js
   Main UI Controller
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM Helper
  --------------------------------------------------------- */
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  /* ---------------------------------------------------------
     Safe element event listener
  --------------------------------------------------------- */
  function on(selector, event, handler) {
    const element = $(selector);

    if (element) {
      element.addEventListener(event, handler);
    }
  }

  /* ---------------------------------------------------------
     Initialize Application
  --------------------------------------------------------- */
  function initApp() {
    setupTextInputs();
    setupSocialInputs();
    setupLayoutButtons();
    setupColorModeButtons();
    setupThemeButtons();
    setupControlButtons();
    setupKeyboardShortcuts();
    setupNavigation();
  }

  /* =========================================================
     1. TEXT INPUTS
     ========================================================= */

  function setupTextInputs() {
    const textInputs = [
      "#nameInput",
      "#professionInput",
      "#companyInput",
      "#phoneInput",
      "#emailInput",
      "#websiteInput",
      "#bioInput"
    ];

    textInputs.forEach((selector) => {
      const input = $(selector);

      if (!input) return;

      input.addEventListener("input", function () {
        if (
          window.AYOCard &&
          typeof window.AYOCard.updateText === "function"
        ) {
          window.AYOCard.updateText();
        }
      });
    });
  }

  /* =========================================================
     2. SOCIAL INPUTS
     ========================================================= */

  function setupSocialInputs() {
    const socialInputs = [
      "#instagramInput",
      "#facebookInput",
      "#linkedinInput",
      "#whatsappInput",
      "#githubInput"
    ];

    socialInputs.forEach((selector) => {
      const input = $(selector);

      if (!input) return;

      input.addEventListener("input", function () {
        if (
          window.AYOCard &&
          typeof window.AYOCard.updateSocials === "function"
        ) {
          window.AYOCard.updateSocials();
        }
      });
    });
  }

  /* =========================================================
     3. LAYOUT BUTTONS
     ========================================================= */

  function setupLayoutButtons() {
    const buttons = $$(".layout-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });

        this.classList.add("active");

        const layout = this.dataset.layout;

        if (!layout) return;

        const card = $("#businessCard");

        if (!card) return;

        card.classList.remove(
          "layout-left",
          "layout-top",
          "layout-right",
          "layout-center"
        );

        card.classList.add(`layout-${layout}`);

        if (
          window.AYOCard &&
          window.AYOCard.state
        ) {
          window.AYOCard.state.layout = layout;
        }
      });
    });
  }

  /* =========================================================
     4. SOLID / GRADIENT MODE
     ========================================================= */

  function setupColorModeButtons() {
    const buttons = $$(".color-mode");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });

        this.classList.add("active");

        const mode = this.dataset.mode;

        if (!mode) return;

        const solidControls = $("#solidColorControls");
        const gradientControls = $("#gradientColorControls");

        if (solidControls) {
          solidControls.style.display =
            mode === "solid" ? "" : "none";
        }

        if (gradientControls) {
          gradientControls.style.display =
            mode === "gradient" ? "" : "none";
        }

        if (
          window.AYOCard &&
          window.AYOCard.state
        ) {
          window.AYOCard.state.colorMode = mode;

          if (
            typeof window.AYOCard.updateBackground === "function"
          ) {
            window.AYOCard.updateBackground();
          }
        }
      });
    });
  }

  /* =========================================================
     5. QUICK THEMES
     ========================================================= */

  function setupThemeButtons() {
    const buttons = $$(".theme-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });

        this.classList.add("active");

        const theme = this.dataset.theme;

        if (!theme) return;

        applyTheme(theme);
      });
    });
  }

  function applyTheme(theme) {
    const themes = {
      midnight: {
        mode: "solid",
        color1: "#111318",
        color2: "#111318",
        text: "#ffffff"
      },

      purple: {
        mode: "gradient",
        color1: "#24113d",
        color2: "#7137a8",
        text: "#ffffff"
      },

      ocean: {
        mode: "gradient",
        color1: "#062b3f",
        color2: "#087ea4",
        text: "#ffffff"
      },

      emerald: {
        mode: "gradient",
        color1: "#06291e",
        color2: "#138a5b",
        text: "#ffffff"
      },

      sunset: {
        mode: "gradient",
        color1: "#4a1628",
        color2: "#d86b35",
        text: "#ffffff"
      },

      white: {
        mode: "solid",
        color1: "#ffffff",
        color2: "#ffffff",
        text: "#111318"
      }
    };

    const selected = themes[theme];

    if (!selected) return;

    const primaryColor = $("#primaryColor");
    const gradientColor1 = $("#gradientColor1");
    const gradientColor2 = $("#gradientColor2");
    const textColor = $("#textColor");

    if (primaryColor) {
      primaryColor.value = selected.color1;
    }

    if (gradientColor1) {
      gradientColor1.value = selected.color1;
    }

    if (gradientColor2) {
      gradientColor2.value = selected.color2;
    }

    if (textColor) {
      textColor.value = selected.text;
    }

    /* Update state */
    if (
      window.AYOCard &&
      window.AYOCard.state
    ) {
      window.AYOCard.state.colorMode = selected.mode;
      window.AYOCard.state.primaryColor = selected.color1;
      window.AYOCard.state.gradientColor1 = selected.color1;
      window.AYOCard.state.gradientColor2 = selected.color2;
      window.AYOCard.state.textColor = selected.text;
    }

    /* Update color mode UI */
    const modeButtons = $$(".color-mode");

    modeButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.mode === selected.mode
      );
    });

    const solidControls = $("#solidColorControls");
    const gradientControls = $("#gradientColorControls");

    if (solidControls) {
      solidControls.style.display =
        selected.mode === "solid" ? "" : "none";
    }

    if (gradientControls) {
      gradientControls.style.display =
        selected.mode === "gradient" ? "" : "none";
    }

    /* Call card update functions */
    if (
      window.AYOCard &&
      typeof window.AYOCard.updateBackground === "function"
    ) {
      window.AYOCard.updateBackground();
    }

    if (
      window.AYOCard &&
      typeof window.AYOCard.updateColors === "function"
    ) {
      window.AYOCard.updateColors();
    }

    if (
      window.AYOCard &&
      typeof window.AYOCard.updateTextColor === "function"
    ) {
      window.AYOCard.updateTextColor();
    }

    showToast("Theme applied successfully");
  }

  /* =========================================================
     6. CONTROL BUTTONS
     ========================================================= */

  function setupControlButtons() {
    /* Reset */
    const resetButtons = $$(
      '[data-action="reset"], #resetBtn, #resetButton'
    );

    resetButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (
          window.AYOCard &&
          typeof window.AYOCard.reset === "function"
        ) {
          window.AYOCard.reset();
        }

        resetActiveStates();

        showToast("Card reset successfully");
      });
    });

    /* Clear Photo */
    const clearPhotoButtons = $$(
      '[data-action="clear-photo"], #clearPhotoBtn'
    );

    clearPhotoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const photoInput = $("#photoInput");
        const photo = $("#cardPhoto");

        if (photoInput) {
          photoInput.value = "";
        }

        if (photo) {
          photo.removeAttribute("src");
          photo.style.display = "none";
        }

        if (
          window.AYOCard &&
          window.AYOCard.state
        ) {
          window.AYOCard.state.photoURL = "";
        }

        showToast("Photo removed");
      });
    });

    /* Clear Logo */
    const clearLogoButtons = $$(
      '[data-action="clear-logo"], #clearLogoBtn'
    );

    clearLogoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const logoInput = $("#logoInput");
        const logo = $("#cardLogo");

        if (logoInput) {
          logoInput.value = "";
        }

        if (logo) {
          logo.removeAttribute("src");
          logo.style.display = "none";
        }

        if (
          window.AYOCard &&
          window.AYOCard.state
        ) {
          window.AYOCard.state.logoURL = "";
        }

        showToast("Logo removed");
      });
    });

    /* Preview / Download buttons */
    const downloadButtons = $$(
      '[data-action="download"], #downloadBtn, #downloadButton'
    );

    downloadButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (
          window.AYOExport &&
          typeof window.AYOExport.downloadPNG === "function"
        ) {
          window.AYOExport.downloadPNG();
        } else {
          showToast("Export system is not ready");
        }
      });
    });
  }

  /* =========================================================
     7. RESET ACTIVE STATES
     ========================================================= */

  function resetActiveStates() {
    const layoutButtons = $$(".layout-btn");

    layoutButtons.forEach((button) => {
      button.classList.remove("active");
    });

    const firstLayout = $(".layout-btn");

    if (firstLayout) {
      firstLayout.classList.add("active");
    }

    const colorModes = $$(".color-mode");

    colorModes.forEach((button) => {
      button.classList.remove("active");
    });

    const solidMode = $('.color-mode[data-mode="solid"]');

    if (solidMode) {
      solidMode.classList.add("active");
    }

    const themes = $$(".theme-btn");

    themes.forEach((button) => {
      button.classList.remove("active");
    });
  }

  /* =========================================================
     8. KEYBOARD SHORTCUTS
     ========================================================= */

  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", function (event) {
      /* Ctrl + S = Download PNG */
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();

        if (
          window.AYOExport &&
          typeof window.AYOExport.downloadPNG === "function"
        ) {
          window.AYOExport.downloadPNG();
        }
      }

      /* Escape = close toast */
      if (event.key === "Escape") {
        const toast = $("#toast");

        if (toast) {
          toast.classList.remove("show");
        }
      }
    });
  }

  /* =========================================================
     9. NAVIGATION
     ========================================================= */

  function setupNavigation() {
    const links = $$("[data-scroll]");

    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        const targetSelector = this.dataset.scroll;

        if (!targetSelector) return;

        const target = $(targetSelector);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  /* =========================================================
     10. TOAST
     ========================================================= */

  function showToast(message) {
    if (
      window.AYOCard &&
      typeof window.AYOCard.toast === "function"
    ) {
      window.AYOCard.toast(message);
      return;
    }

    const toast = $("#toast");
    const toastMessage = $("#toastMessage");

    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(window.__ayoToastTimer);

    window.__ayoToastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* =========================================================
     11. INITIALIZE AFTER DOM LOAD
     ========================================================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  /* ---------------------------------------------------------
     Public API
  --------------------------------------------------------- */

  window.AYOApp = {
    init: initApp,
    applyTheme: applyTheme,
    toast: showToast
  };

})();