// ===== Mobile menu =====
var toggle = document.querySelector(".nav-toggle");
var nav = document.getElementById("site-nav");

function closeMenu() {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
}

toggle.addEventListener("click", function () {
  var isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// ===== Life cycle dropdown =====
var dropdown = document.querySelector(".nav-dropdown");
var dropdownButton = document.querySelector(".dropdown-toggle");

function setDropdown(isOpen) {
  dropdown.classList.toggle("open", isOpen);
  dropdownButton.setAttribute("aria-expanded", isOpen);
}

// On a computer, also open it when the mouse hovers over it
var canHover = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1001px)");

dropdownButton.addEventListener("click", function () {
  // With a mouse the hover already opened it, so a click keeps it open
  if (canHover.matches) setDropdown(true);
  else setDropdown(!dropdown.classList.contains("open"));
});
dropdown.addEventListener("mouseenter", function () { if (canHover.matches) setDropdown(true); });
dropdown.addEventListener("mouseleave", function () { if (canHover.matches) setDropdown(false); });

// Close menu and dropdown when tapping outside, or pressing Escape
document.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  if (!dropdown.contains(e.target)) setDropdown(false);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMenu();
    setDropdown(false);
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Gallery lightbox (gallery page only) =====
var lightbox = document.getElementById("lightbox");
if (lightbox) {
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var galleryButtons = document.querySelectorAll(".gallery-open");

  for (var g = 0; g < galleryButtons.length; g++) {
    galleryButtons[g].addEventListener("click", function () {
      // Don't open a lightbox for a photo that hasn't been added yet
      if (this.closest(".gallery-item").classList.contains("is-missing")) return;
      lightboxImg.src = this.getAttribute("data-src");
      lightboxImg.alt = this.getAttribute("data-caption");
      lightboxCaption.textContent = this.getAttribute("data-caption");
      lightbox.showModal();
    });
  }

  lightbox.querySelector(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
  // Close when tapping the dark background
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
}

// ===== Live Shabbat times from Hebcal (home page only) =====
var card = document.getElementById("shabbat-card");
if (card) {
  // Coordinates for Izinga Ridge, Umhlanga
  var hebcalUrl = "https://www.hebcal.com/shabbat?cfg=json&latitude=-29.7286&longitude=31.0719&tzid=Africa/Johannesburg&M=on&b=18&leyning=off";

  var formatTime = function (isoString) {
    return new Date(isoString).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Johannesburg" });
  };
  var formatDate = function (isoString) {
    return new Date(isoString).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Johannesburg" });
  };

  fetch(hebcalUrl)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      var candles = null;
      var havdalah = null;
      var parsha = null;

      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        if (item.category === "candles" && !candles) candles = item;
        if (item.category === "havdalah" && !havdalah) havdalah = item;
        if (item.category === "parashat" && !parsha) parsha = item;
      }

      if (parsha) {
        document.getElementById("parsha").textContent = parsha.title;
        document.getElementById("hebdate").textContent = parsha.hebrew;
      } else {
        document.getElementById("parsha").textContent = "Shabbat Shalom";
      }

      document.getElementById("candles").textContent = candles ? formatTime(candles.date) : "--:--";
      document.getElementById("havdalah").textContent = havdalah ? formatTime(havdalah.date) : "--:--";
      if (candles) {
        document.getElementById("shabbat-date").textContent = "Friday candle lighting: " + formatDate(candles.date);
      }
      card.classList.remove("is-loading");
    })
    .catch(function () {
      document.getElementById("parsha").textContent = "Shabbat Shalom";
      document.getElementById("candles").textContent = "--:--";
      document.getElementById("havdalah").textContent = "--:--";
      document.getElementById("shabbat-date").textContent = "Times couldn't load. Phone the office on 031 566 3227.";
      card.classList.remove("is-loading");
    });
}
