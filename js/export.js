/* =========================================================
   AYO-CARD
   export.js
   Card Export / Download System
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DOM Helper
  --------------------------------------------------------- */
  const $ = (selector) => document.querySelector(selector);

  /* ---------------------------------------------------------
     Get Card
  --------------------------------------------------------- */
  function getCard() {
    const card = $("#businessCard");

    if (!card) {
      showMessage("Business card not found");
      return null;
    }

    return card;
  }

  /* ---------------------------------------------------------
     Check html2canvas
  --------------------------------------------------------- */
  function checkHtml2Canvas() {
    if (typeof html2canvas === "undefined") {
      showMessage(
        "Export library not loaded. Please check html2canvas."
      );

      return false;
    }

    return true;
  }

  /* ---------------------------------------------------------
     Create File Name
  --------------------------------------------------------- */
  function createFileName(extension) {
    const nameInput = $("#nameInput");

    let name = "ayo-card";

    if (nameInput && nameInput.value.trim() !== "") {
      name = nameInput.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "");

      if (!name) {
        name = "ayo-card";
      }
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);

    return `${name}-business-card-${timestamp}.${extension}`;
  }

  /* ---------------------------------------------------------
     Prepare Card Before Export
  --------------------------------------------------------- */
  async function prepareCard(card) {
    /* Wait for images/fonts to finish loading */
    await waitForImages(card);

    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (error) {
        console.warn("Font loading warning:", error);
      }
    }

    /* Small rendering delay */
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
  }

  /* ---------------------------------------------------------
     Wait For Images
  --------------------------------------------------------- */
  function waitForImages(container) {
    const images = Array.from(
      container.querySelectorAll("img")
    );

    const pendingImages = images.filter(
      (img) => !img.complete
    );

    if (pendingImages.length === 0) {
      return Promise.resolve();
    }

    return Promise.all(
      pendingImages.map((img) => {
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, {
            once: true
          });

          img.addEventListener("error", resolve, {
            once: true
          });
        });
      })
    );
  }

  /* ---------------------------------------------------------
     Create Canvas
  --------------------------------------------------------- */
  async function createCardCanvas(options = {}) {
    const card = getCard();

    if (!card) {
      return null;
    }

    if (!checkHtml2Canvas()) {
      return null;
    }

    await prepareCard(card);

    const scale =
      options.scale ||
      Math.max(
        2,
        Math.min(window.devicePixelRatio || 1, 3)
      );

    const backgroundColor =
      options.backgroundColor !== undefined
        ? options.backgroundColor
        : null;

    try {
      const canvas = await html2canvas(card, {
        scale: scale,

        backgroundColor: backgroundColor,

        useCORS: true,

        allowTaint: false,

        logging: false,

        imageTimeout: 15000,

        removeContainer: true,

        foreignObjectRendering: false,

        scrollX: 0,

        scrollY: 0,

        windowWidth: document.documentElement.clientWidth,

        windowHeight: document.documentElement.clientHeight
      });

      return canvas;
    } catch (error) {
      console.error("AYO-CARD Export Error:", error);

      showMessage(
        "Card export failed. Please try again."
      );

      return null;
    }
  }

  /* ---------------------------------------------------------
     Download Blob
  --------------------------------------------------------- */
  function downloadBlob(blob, fileName) {
    if (!blob) {
      showMessage("Unable to create download file");
      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /* ---------------------------------------------------------
     Download PNG
  --------------------------------------------------------- */
  async function downloadPNG() {
    const button = getActiveDownloadButton();

    setButtonLoading(button, true);

    try {
      showMessage("Preparing PNG...");

      const canvas = await createCardCanvas({
        scale: 3,
        backgroundColor: null
      });

      if (!canvas) {
        return;
      }

      canvas.toBlob(
        function (blob) {
          if (!blob) {
            showMessage("PNG creation failed");
            return;
          }

          const fileName = createFileName("png");

          downloadBlob(blob, fileName);

          showMessage("PNG downloaded successfully");
        },
        "image/png"
      );
    } catch (error) {
      console.error(error);

      showMessage(
        "Something went wrong while exporting PNG"
      );
    } finally {
      setButtonLoading(button, false);
    }
  }

  /* ---------------------------------------------------------
     Download JPG
  --------------------------------------------------------- */
  async function downloadJPG() {
    const button = getActiveDownloadButton();

    setButtonLoading(button, true);

    try {
      showMessage("Preparing JPG...");

      const canvas = await createCardCanvas({
        scale: 3,
        backgroundColor: "#ffffff"
      });

      if (!canvas) {
        return;
      }

      canvas.toBlob(
        function (blob) {
          if (!blob) {
            showMessage("JPG creation failed");
            return;
          }

          const fileName = createFileName("jpg");

          downloadBlob(blob, fileName);

          showMessage("JPG downloaded successfully");
        },
        "image/jpeg",
        0.95
      );
    } catch (error) {
      console.error(error);

      showMessage(
        "Something went wrong while exporting JPG"
      );
    } finally {
      setButtonLoading(button, false);
    }
  }

  /* ---------------------------------------------------------
     Download Based On Format
  --------------------------------------------------------- */
  async function download(format) {
    const selectedFormat = String(format || "png")
      .toLowerCase()
      .trim();

    if (selectedFormat === "jpg" ||
        selectedFormat === "jpeg") {
      await downloadJPG();
      return;
    }

    await downloadPNG();
  }

  /* ---------------------------------------------------------
     Find Active Download Button
  --------------------------------------------------------- */
  function getActiveDownloadButton() {
    return (
      $("#downloadBtn") ||
      $("#downloadButton") ||
      $('[data-action="download"]')
    );
  }

  /* ---------------------------------------------------------
     Button Loading State
  --------------------------------------------------------- */
  function setButtonLoading(button, loading) {
    if (!button) return;

    if (loading) {
      if (!button.dataset.originalText) {
        button.dataset.originalText =
          button.innerHTML;
      }

      button.disabled = true;

      button.innerHTML = `
        <span class="ayo-export-spinner"></span>
        Preparing...
      `;

      button.classList.add("export-loading");
    } else {
      button.disabled = false;

      if (button.dataset.originalText) {
        button.innerHTML =
          button.dataset.originalText;
      }

      button.classList.remove("export-loading");
    }
  }

  /* ---------------------------------------------------------
     Toast / Message
  --------------------------------------------------------- */
  function showMessage(message) {
    /* Use AYOCard toast if available */
    if (
      window.AYOCard &&
      typeof window.AYOCard.toast === "function"
    ) {
      window.AYOCard.toast(message);
      return;
    }

    /* Fallback toast */
    const toast = $("#toast");
    const toastMessage = $("#toastMessage");

    if (!toast) {
      console.log(message);
      return;
    }

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(window.__ayoExportToastTimer);

    window.__ayoExportToastTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
  }

  /* ---------------------------------------------------------
     Add Export Spinner CSS
  --------------------------------------------------------- */
  function addSpinnerStyle() {
    if ($("#ayoExportStyle")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "ayoExportStyle";

    style.textContent = `
      .ayo-export-spinner {
        width: 14px;
        height: 14px;
        display: inline-block;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        vertical-align: -2px;
        margin-right: 7px;
        animation: ayoExportSpin 0.7s linear infinite;
      }

      .export-loading {
        cursor: wait !important;
        opacity: 0.8;
      }

      @keyframes ayoExportSpin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* =========================================================
     BUTTON EVENTS
     ========================================================= */

  function setupExportButtons() {
    /* PNG buttons */
    const pngButtons = document.querySelectorAll(
      '[data-export="png"], #downloadPNG, #downloadPng'
    );

    pngButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        downloadPNG();
      });
    });

    /* JPG buttons */
    const jpgButtons = document.querySelectorAll(
      '[data-export="jpg"], #downloadJPG, #downloadJpg'
    );

    jpgButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        downloadJPG();
      });
    });

    /* Generic export buttons */
    const exportButtons = document.querySelectorAll(
      "[data-export-format]"
    );

    exportButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        const format =
          this.dataset.exportFormat || "png";

        download(format);
      });
    });
  }

  /* =========================================================
     INITIALIZE
     ========================================================= */

  function initExport() {
    addSpinnerStyle();
    setupExportButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initExport
    );
  } else {
    initExport();
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.AYOExport = {
    downloadPNG: downloadPNG,
    downloadJPG: downloadJPG,
    download: download,
    createCanvas: createCardCanvas
  };

})();