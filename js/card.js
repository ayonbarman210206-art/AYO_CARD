/* =========================================================
   AYO-CARD
   js/card.js
   Live Card Designer Engine
   ========================================================= */


/* =========================================================
   01. GLOBAL STATE
   ========================================================= */

const cardState = {

    colorMode: "solid",

    layout: "left",

    primaryColor: "#111318",

    gradientColor1: "#111318",

    gradientColor2: "#3b1d5a",

    textColor: "#ffffff",

    borderColor: "#ffffff",

    borderWidth: 1,

    cardRadius: 28,

    cardShadow: 45,

    photoSize: 92,

    photoShape: "circle",

    logoSize: 58,

    font: "Inter",

    photoURL: "",

    logoURL: "",

    qrText: "https://ayo-card.com"

};


/* =========================================================
   02. ELEMENT SELECTOR HELPER
   ========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   03. MAIN CARD ELEMENTS
   ========================================================= */

const businessCard = getElement("businessCard");

const cardName = getElement("cardName");

const cardProfession = getElement("cardProfession");

const cardCompany = getElement("cardCompany");

const cardPhone = getElement("cardPhone");

const cardEmail = getElement("cardEmail");

const cardWebsite = getElement("cardWebsite");

const cardBio = getElement("cardBio");

const cardPhoto = getElement("cardPhoto");

const cardPhotoWrapper = getElement("cardPhotoWrapper");

const cardLogo = getElement("cardLogo");

const cardSocials = getElement("cardSocials");

const cardQR = getElement("cardQR");


/* =========================================================
   04. INPUT ELEMENTS
   ========================================================= */

const nameInput = getElement("nameInput");

const professionInput = getElement("professionInput");

const companyInput = getElement("companyInput");

const phoneInput = getElement("phoneInput");

const emailInput = getElement("emailInput");

const websiteInput = getElement("websiteInput");

const bioInput = getElement("bioInput");

const photoInput = getElement("photoInput");

const logoInput = getElement("logoInput");

const photoShape = getElement("photoShape");

const photoSize = getElement("photoSize");

const logoSize = getElement("logoSize");

const instagramInput = getElement("instagramInput");

const facebookInput = getElement("facebookInput");

const linkedinInput = getElement("linkedinInput");

const whatsappInput = getElement("whatsappInput");

const githubInput = getElement("githubInput");

const qrInput = getElement("qrInput");

const primaryColor = getElement("primaryColor");

const gradientColor1 = getElement("gradientColor1");

const gradientColor2 = getElement("gradientColor2");

const textColor = getElement("textColor");

const borderColor = getElement("borderColor");

const borderWidth = getElement("borderWidth");

const cardRadius = getElement("cardRadius");

const cardShadow = getElement("cardShadow");

const fontSelect = getElement("fontSelect");


/* =========================================================
   05. VALUE DISPLAY ELEMENTS
   ========================================================= */

const photoSizeValue = getElement("photoSizeValue");

const logoSizeValue = getElement("logoSizeValue");

const borderWidthValue = getElement("borderWidthValue");

const cardRadiusValue = getElement("cardRadiusValue");

const shadowValue = getElement("shadowValue");


/* =========================================================
   06. SAFE TEXT
   ========================================================= */

function safeText(value, fallback = "") {

    if (value === undefined || value === null) {

        return fallback;

    }

    return String(value).trim();

}


/* =========================================================
   07. UPDATE TEXT INFORMATION
   ========================================================= */

function updateCardText() {

    const name = safeText(
        nameInput.value,
        "Your Name"
    );

    const profession = safeText(
        professionInput.value,
        "Your Profession"
    );

    const company = safeText(
        companyInput.value,
        "Your Company"
    );

    const phone = safeText(
        phoneInput.value
    );

    const email = safeText(
        emailInput.value
    );

    const website = safeText(
        websiteInput.value
    );

    const bio = safeText(
        bioInput.value
    );


    cardName.textContent =
        name || "Your Name";


    cardProfession.textContent =
        profession || "Your Profession";


    cardCompany.textContent =
        company || "Your Company";


    cardPhone.textContent =
        phone;


    cardEmail.textContent =
        email;


    cardWebsite.textContent =
        website;


    cardBio.textContent =
        bio;


    /*
     * Hide empty contact fields
     */

    const phoneContainer =
        cardPhone.closest(".contact-item");

    const emailContainer =
        cardEmail.closest(".contact-item");

    const websiteContainer =
        cardWebsite.closest(".contact-item");


    if (phoneContainer) {

        phoneContainer.style.display =
            phone ? "flex" : "none";

    }


    if (emailContainer) {

        emailContainer.style.display =
            email ? "flex" : "none";

    }


    if (websiteContainer) {

        websiteContainer.style.display =
            website ? "flex" : "none";

    }


    /*
     * Hide bio if empty
     */

    cardBio.style.display =
        bio ? "block" : "none";

}


/* =========================================================
   08. PHOTO UPLOAD
   ========================================================= */

function handlePhotoUpload(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {

        return;

    }


    /*
     * Make sure selected file is an image.
     */

    if (!file.type.startsWith("image/")) {

        showToast("Please select an image file.");

        event.target.value = "";

        return;

    }


    /*
     * Limit file size to 10MB.
     */

    if (file.size > 10 * 1024 * 1024) {

        showToast("Photo must be smaller than 10MB.");

        event.target.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        cardState.photoURL =
            e.target.result;


        cardPhoto.src =
            cardState.photoURL;


        cardPhotoWrapper.style.display =
            "block";


        updatePhotoShape();

        updatePhotoSize();

        showToast("Profile photo added.");

    };


    reader.onerror = function() {

        showToast("Unable to read this image.");

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   09. LOGO UPLOAD
   ========================================================= */

function handleLogoUpload(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {

        return;

    }


    /*
     * Logo must be an image.
     */

    if (!file.type.startsWith("image/")) {

        showToast("Please select an image file.");

        event.target.value = "";

        return;

    }


    /*
     * Limit logo to 10MB.
     */

    if (file.size > 10 * 1024 * 1024) {

        showToast("Logo must be smaller than 10MB.");

        event.target.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        cardState.logoURL =
            e.target.result;


        cardLogo.src =
            cardState.logoURL;


        cardLogo.style.display =
            "block";


        updateLogoSize();

        showToast("Logo added.");

    };


    reader.onerror = function() {

        showToast("Unable to read this logo.");

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   10. PHOTO SHAPE
   ========================================================= */

function updatePhotoShape() {

    if (!cardPhotoWrapper) {

        return;

    }


    /*
     * Remove all previous shape classes.
     */

    cardPhotoWrapper.classList.remove(
        "circle",
        "square",
        "rounded",
        "pill",
        "hexagon"
    );


    const shape =
        photoShape.value || "circle";


    cardState.photoShape =
        shape;


    cardPhotoWrapper.classList.add(
        shape
    );

}


/* =========================================================
   11. PHOTO SIZE
   ========================================================= */

function updatePhotoSize() {

    const size =
        Number(photoSize.value) || 92;


    cardState.photoSize =
        size;


    cardPhotoWrapper.style.width =
        `${size}px`;


    cardPhotoWrapper.style.height =
        `${size}px`;


    if (photoSizeValue) {

        photoSizeValue.textContent =
            `${size}px`;

    }

}


/* =========================================================
   12. LOGO SIZE
   ========================================================= */

function updateLogoSize() {

    const size =
        Number(logoSize.value) || 58;


    cardState.logoSize =
        size;


    cardLogo.style.width =
        `${size}px`;


    cardLogo.style.height =
        `${size}px`;


    if (logoSizeValue) {

        logoSizeValue.textContent =
            `${size}px`;

    }

}


/* =========================================================
   13. COLOR MODE
   ========================================================= */

function updateCardBackground() {

    const mode =
        cardState.colorMode;


    if (mode === "solid") {

        businessCard.style.background =
            cardState.primaryColor;

        return;

    }


    if (mode === "gradient") {

        businessCard.style.background =
            `linear-gradient(
                135deg,
                ${cardState.gradientColor1},
                ${cardState.gradientColor2}
            )`;

    }

}


/* =========================================================
   14. TEXT COLOR
   ========================================================= */

function updateTextColor() {

    const color =
        cardState.textColor;


    businessCard.style.color =
        color;


    cardName.style.color =
        color;


    cardProfession.style.color =
        color;


    cardCompany.style.color =
        color;


    cardBio.style.color =
        color;


    cardPhone.style.color =
        color;


    cardEmail.style.color =
        color;


    cardWebsite.style.color =
        color;


    /*
     * Keep text slightly transparent
     * where appropriate.
     */

    cardProfession.style.opacity =
        "0.72";


    cardCompany.style.opacity =
        "0.58";


    cardBio.style.opacity =
        "0.52";


    cardPhone.style.opacity =
        "0.72";


    cardEmail.style.opacity =
        "0.72";


    cardWebsite.style.opacity =
        "0.72";

}


/* =========================================================
   15. BORDER
   ========================================================= */

function updateCardBorder() {

    const width =
        Number(cardState.borderWidth) || 0;


    businessCard.style.border =
        `${width}px solid ${cardState.borderColor}`;


    if (borderWidthValue) {

        borderWidthValue.textContent =
            `${width}px`;

    }

}


/* =========================================================
   16. CARD RADIUS
   ========================================================= */

function updateCardRadius() {

    const radius =
        Number(cardState.cardRadius) || 0;


    businessCard.style.borderRadius =
        `${radius}px`;


    if (cardRadiusValue) {

        cardRadiusValue.textContent =
            `${radius}px`;

    }

}


/* =========================================================
   17. CARD SHADOW
   ========================================================= */

function updateCardShadow() {

    const value =
        Number(cardState.cardShadow) || 0;


    /*
     * Convert 0–100 into realistic shadow values.
     */

    const opacity =
        value / 100;


    const blur =
        Math.round(
            35 + value * 0.75
        );


    const spread =
        Math.round(
            5 + value * 0.12
        );


    businessCard.style.boxShadow =
        `0 ${spread}px ${blur}px rgba(0,0,0,${opacity})`;


    if (shadowValue) {

        shadowValue.textContent =
            `${value}`;

    }

}


/* =========================================================
   18. FONT
   ========================================================= */

function updateFont() {

    const selectedFont =
        fontSelect.value || "Inter";


    cardState.font =
        selectedFont;


    businessCard.style.fontFamily =
        `"${selectedFont}", Arial, sans-serif`;

}


/* =========================================================
   19. SOCIAL MEDIA DATA
   ========================================================= */

const socialData = [

    {
        input: "instagramInput",

        icon: "fa-brands fa-instagram",

        title: "Instagram"

    },

    {
        input: "facebookInput",

        icon: "fa-brands fa-facebook-f",

        title: "Facebook"

    },

    {
        input: "linkedinInput",

        icon: "fa-brands fa-linkedin-in",

        title: "LinkedIn"

    },

    {
        input: "whatsappInput",

        icon: "fa-brands fa-whatsapp",

        title: "WhatsApp"

    },

    {
        input: "githubInput",

        icon: "fa-brands fa-github",

        title: "GitHub"

    }

];


/* =========================================================
   20. UPDATE SOCIAL ICONS
   ========================================================= */

function updateSocials() {

    if (!cardSocials) {

        return;

    }


    cardSocials.innerHTML = "";


    let socialCount = 0;


    socialData.forEach(function(social) {

        const input =
            getElement(social.input);


        if (!input) {

            return;

        }


        const value =
            safeText(input.value);


        if (!value) {

            return;

        }


        socialCount++;


        const item =
            document.createElement("div");


        item.className =
            "card-social-item";


        item.title =
            social.title;


        const icon =
            document.createElement("i");


        icon.className =
            social.icon;


        item.appendChild(icon);


        cardSocials.appendChild(item);

    });


    /*
     * Hide social area if no social profile exists.
     */

    cardSocials.style.display =
        socialCount > 0 ? "flex" : "none";

}


/* =========================================================
   21. QR CODE
   ========================================================= */

function generateQRCode() {

    if (!cardQR) {

        return;

    }


    const value =
        safeText(
            qrInput.value,
            "https://ayo-card.com"
        );


    cardState.qrText =
        value;


    /*
     * Clear old QR.
     */

    cardQR.innerHTML = "";


    if (!value) {

        cardQR.style.display =
            "none";

        return;

    }


    /*
     * Check if QRCode library loaded.
     */

    if (
        typeof QRCode ===
        "undefined"
    ) {

        showToast(
            "QR library is not available."
        );

        return;

    }


    try {

        new QRCode(
            cardQR,
            {

                text: value,

                width: 50,

                height: 50,

                colorDark: "#111111",

                colorLight: "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );


        cardQR.style.display =
            "flex";


    } catch (error) {

        console.error(
            "QR generation error:",
            error
        );


        cardQR.style.display =
            "none";


        showToast(
            "Could not generate QR code."
        );

    }

}


/* =========================================================
   22. LAYOUT
   ========================================================= */

function updateLayout(layout) {

    const selectedLayout =
        layout || "left";


    cardState.layout =
        selectedLayout;


    businessCard.classList.remove(
        "layout-left",
        "layout-top",
        "layout-right",
        "layout-center"
    );


    businessCard.classList.add(
        `layout-${selectedLayout}`
    );


    /*
     * Update active button.
     */

    document
        .querySelectorAll(".layout-btn")
        .forEach(function(button) {

            button.classList.remove(
                "active"
            );

        });


    const activeButton =
        document.querySelector(
            `.layout-btn[data-layout="${selectedLayout}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }

}


/* =========================================================
   23. COLOR MODE
   ========================================================= */

function setColorMode(mode) {

    cardState.colorMode =
        mode;


    document
        .querySelectorAll(".color-mode")
        .forEach(function(button) {

            button.classList.remove(
                "active"
            );

        });


    const activeButton =
        document.querySelector(
            `.color-mode[data-mode="${mode}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }


    const solidControls =
        getElement(
            "solidColorControls"
        );


    const gradientControls =
        getElement(
            "gradientColorControls"
        );


    if (mode === "solid") {

        if (solidControls) {

            solidControls.classList.remove(
                "hidden"
            );

        }


        if (gradientControls) {

            gradientControls.classList.add(
                "hidden"
            );

        }

    } else {

        if (solidControls) {

            solidControls.classList.add(
                "hidden"
            );

        }


        if (gradientControls) {

            gradientControls.classList.remove(
                "hidden"
            );

        }

    }


    updateCardBackground();

}


/* =========================================================
   24. QUICK THEME
   ========================================================= */

function applyQuickTheme(color) {

    if (!color) {

        return;

    }


    cardState.primaryColor =
        color;


    if (primaryColor) {

        primaryColor.value =
            color;

    }


    /*
     * Switch automatically
     * to solid mode.
     */

    setColorMode("solid");


    updateCardBackground();


    showToast(
        "Theme applied."
    );

}


/* =========================================================
   25. INPUT EVENT LISTENER
   ========================================================= */

function setupTextInput(
    element,
    callback
) {

    if (!element) {

        return;

    }


    element.addEventListener(
        "input",
        callback
    );


    element.addEventListener(
        "change",
        callback
    );

}


/* =========================================================
   26. INITIALIZE INPUT EVENTS
   ========================================================= */

function setupInputEvents() {

    /*
     * Personal information
     */

    setupTextInput(
        nameInput,
        updateCardText
    );


    setupTextInput(
        professionInput,
        updateCardText
    );


    setupTextInput(
        companyInput,
        updateCardText
    );


    setupTextInput(
        phoneInput,
        updateCardText
    );


    setupTextInput(
        emailInput,
        updateCardText
    );


    setupTextInput(
        websiteInput,
        updateCardText
    );


    setupTextInput(
        bioInput,
        updateCardText
    );


    /*
     * Social media
     */

    socialData.forEach(
        function(social) {

            const input =
                getElement(
                    social.input
                );


            if (!input) {

                return;

            }


            input.addEventListener(
                "input",
                updateSocials
            );


            input.addEventListener(
                "change",
                updateSocials
            );

        }
    );


    /*
     * Photo
     */

    if (photoInput) {

        photoInput.addEventListener(
            "change",
            handlePhotoUpload
        );

    }


    /*
     * Logo
     */

    if (logoInput) {

        logoInput.addEventListener(
            "change",
            handleLogoUpload
        );

    }


    /*
     * Photo shape
     */

    if (photoShape) {

        photoShape.addEventListener(
            "change",
            updatePhotoShape
        );

    }


    /*
     * Photo size
     */

    if (photoSize) {

        photoSize.addEventListener(
            "input",
            updatePhotoSize
        );

    }


    /*
     * Logo size
     */

    if (logoSize) {

        logoSize.addEventListener(
            "input",
            updateLogoSize
        );

    }


    /*
     * QR
     */

    if (qrInput) {

        qrInput.addEventListener(
            "input",
            function() {

                /*
                 * Debounce QR generation
                 * while typing.
                 */

                clearTimeout(
                    window.qrTimer
                );


                window.qrTimer =
                    setTimeout(
                        generateQRCode,
                        400
                    );

            }
        );

    }


    /*
     * Primary color
     */

    if (primaryColor) {

        primaryColor.addEventListener(
            "input",
            function() {

                cardState.primaryColor =
                    primaryColor.value;


                updateCardBackground();

            }
        );

    }


    /*
     * Gradient color one
     */

    if (gradientColor1) {

        gradientColor1.addEventListener(
            "input",
            function() {

                cardState.gradientColor1 =
                    gradientColor1.value;


                updateCardBackground();

            }
        );

    }


    /*
     * Gradient color two
     */

    if (gradientColor2) {

        gradientColor2.addEventListener(
            "input",
            function() {

                cardState.gradientColor2 =
                    gradientColor2.value;


                updateCardBackground();

            }
        );

    }


    /*
     * Text color
     */

    if (textColor) {

        textColor.addEventListener(
            "input",
            function() {

                cardState.textColor =
                    textColor.value;


                updateTextColor();

            }
        );

    }


    /*
     * Border color
     */

    if (borderColor) {

        borderColor.addEventListener(
            "input",
            function() {

                cardState.borderColor =
                    borderColor.value;


                updateCardBorder();

            }
        );

    }


    /*
     * Border width
     */

    if (borderWidth) {

        borderWidth.addEventListener(
            "input",
            function() {

                cardState.borderWidth =
                    Number(
                        borderWidth.value
                    );


                updateCardBorder();

            }
        );

    }


    /*
     * Card radius
     */

    if (cardRadius) {

        cardRadius.addEventListener(
            "input",
            function() {

                cardState.cardRadius =
                    Number(
                        cardRadius.value
                    );


                updateCardRadius();

            }
        );

    }


    /*
     * Shadow
     */

    if (cardShadow) {

        cardShadow.addEventListener(
            "input",
            function() {

                cardState.cardShadow =
                    Number(
                        cardShadow.value
                    );


                updateCardShadow();

            }
        );

    }


    /*
     * Font
     */

    if (fontSelect) {

        fontSelect.addEventListener(
            "change",
            updateFont
        );

    }

}


/* =========================================================
   27. COLOR MODE EVENTS
   ========================================================= */

function setupColorModeEvents() {

    document
        .querySelectorAll(".color-mode")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const mode =
                        button.dataset.mode;


                    setColorMode(mode);

                }
            );

        });

}


/* =========================================================
   28. LAYOUT EVENTS
   ========================================================= */

function setupLayoutEvents() {

    document
        .querySelectorAll(".layout-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const layout =
                        button.dataset.layout;


                    updateLayout(
                        layout
                    );

                }
            );

        });

}


/* =========================================================
   29. QUICK THEME EVENTS
   ========================================================= */

function setupThemeEvents() {

    document
        .querySelectorAll(".theme-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const theme =
                        button.dataset.theme;


                    applyQuickTheme(
                        theme
                    );

                }
            );

        });

}


/* =========================================================
   30. TOAST SYSTEM
   ========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        getElement("toast");


    const toastMessage =
        getElement("toastMessage");


    if (!toast || !toastMessage) {

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   31. RESET CARD
   ========================================================= */

function resetCard() {

    /*
     * Restore personal information
     */

    nameInput.value =
        "Ayon Barman";


    professionInput.value =
        "Software Developer";


    companyInput.value =
        "AYOX";


    phoneInput.value =
        "+880 1856 562 374";


    emailInput.value =
        "ayon@example.com";


    websiteInput.value =
        "www.ayo-card.com";


    bioInput.value =
        "Creating digital experiences with technology.";


    /*
     * Clear social inputs
     */

    instagramInput.value =
        "";


    facebookInput.value =
        "";


    linkedinInput.value =
        "";


    whatsappInput.value =
        "";


    githubInput.value =
        "";


    /*
     * Reset QR
     */

    qrInput.value =
        "https://ayo-card.com";


    /*
     * Reset colors
     */

    primaryColor.value =
        "#111318";


    gradientColor1.value =
        "#111318";


    gradientColor2.value =
        "#3b1d5a";


    textColor.value =
        "#ffffff";


    borderColor.value =
        "#ffffff";


    borderWidth.value =
        "1";


    cardRadius.value =
        "28";


    cardShadow.value =
        "45";


    photoSize.value =
        "92";


    logoSize.value =
        "58";


    photoShape.value =
        "circle";


    fontSelect.value =
        "Inter";


    /*
     * Remove photo
     */

    cardState.photoURL =
        "";


    cardPhoto.src =
        "";


    cardPhotoWrapper.style.display =
        "none";


    photoInput.value =
        "";


    /*
     * Remove logo
     */

    cardState.logoURL =
        "";


    cardLogo.src =
        "";


    cardLogo.style.display =
        "none";


    logoInput.value =
        "";


    /*
     * Reset state
     */

    cardState.colorMode =
        "solid";


    cardState.layout =
        "left";


    cardState.primaryColor =
        "#111318";


    cardState.gradientColor1 =
        "#111318";


    cardState.gradientColor2 =
        "#3b1d5a";


    cardState.textColor =
        "#ffffff";


    cardState.borderColor =
        "#ffffff";


    cardState.borderWidth =
        1;


    cardState.cardRadius =
        28;


    cardState.cardShadow =
        45;


    cardState.photoSize =
        92;


    cardState.logoSize =
        58;


    cardState.photoShape =
        "circle";


    cardState.font =
        "Inter";


    /*
     * Re-render everything
     */

    updateCardText();

    updatePhotoShape();

    updatePhotoSize();

    updateLogoSize();

    updateCardBackground();

    updateTextColor();

    updateCardBorder();

    updateCardRadius();

    updateCardShadow();

    updateFont();

    updateSocials();

    updateLayout("left");

    setColorMode("solid");

    generateQRCode();


    showToast(
        "Card has been reset."
    );

}


/* =========================================================
   32. INITIALIZE CARD
   ========================================================= */

function initializeCard() {

    /*
     * Set initial state from HTML values.
     */

    if (primaryColor) {

        cardState.primaryColor =
            primaryColor.value;

    }


    if (gradientColor1) {

        cardState.gradientColor1 =
            gradientColor1.value;

    }


    if (gradientColor2) {

        cardState.gradientColor2 =
            gradientColor2.value;

    }


    if (textColor) {

        cardState.textColor =
            textColor.value;

    }


    if (borderColor) {

        cardState.borderColor =
            borderColor.value;

    }


    if (borderWidth) {

        cardState.borderWidth =
            Number(
                borderWidth.value
            );

    }


    if (cardRadius) {

        cardState.cardRadius =
            Number(
                cardRadius.value
            );

    }


    if (cardShadow) {

        cardState.cardShadow =
            Number(
                cardShadow.value
            );

    }


    if (photoSize) {

        cardState.photoSize =
            Number(
                photoSize.value
            );

    }


    if (logoSize) {

        cardState.logoSize =
            Number(
                logoSize.value
            );

    }


    if (photoShape) {

        cardState.photoShape =
            photoShape.value;

    }


    if (fontSelect) {

        cardState.font =
            fontSelect.value;

    }


    /*
     * Initial rendering.
     */

    updateCardText();

    updatePhotoShape();

    updatePhotoSize();

    updateLogoSize();

    updateCardBackground();

    updateTextColor();

    updateCardBorder();

    updateCardRadius();

    updateCardShadow();

    updateFont();

    updateSocials();

    updateLayout(
        cardState.layout
    );

    setColorMode(
        cardState.colorMode
    );

    generateQRCode();

}


/* =========================================================
   33. START EVERYTHING
   ========================================================= */

function startCardDesigner() {

    setupInputEvents();

    setupColorModeEvents();

    setupLayoutEvents();

    setupThemeEvents();

    initializeCard();

}


/* =========================================================
   34. DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startCardDesigner
    );

} else {

    startCardDesigner();

}


/* =========================================================
   35. GLOBAL ACCESS
   ========================================================= */

window.AYOCard = {

    state: cardState,

    updateText:
        updateCardText,

    updateSocials:
        updateSocials,

    updateQR:
        generateQRCode,

    reset:
        resetCard,

    toast:
        showToast

};