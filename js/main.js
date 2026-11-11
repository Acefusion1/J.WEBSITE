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

// Close the menu after tapping a link
var navLinks = nav.querySelectorAll("a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", closeMenu);
}

// Close the menu when tapping outside it, or pressing Escape
document.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeMenu();
});

// ===== Highlight the menu link for the section on screen =====
if ("IntersectionObserver" in window) {
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        var id = entries[i].target.id;
        for (var j = 0; j < navLinks.length; j++) {
          var isMatch = navLinks[j].getAttribute("href") === "#" + id;
          navLinks[j].classList.toggle("is-active", isMatch);
        }
      }
    }
  }, { rootMargin: "-40% 0px -55% 0px" });

  var sections = document.querySelectorAll("main section[id]");
  for (var k = 0; k < sections.length; k++) {
    observer.observe(sections[k]);
  }
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Live Shabbat times from Hebcal (free, no key needed) =====
// Coordinates for Izinga Ridge, Umhlanga
var hebcalUrl = "https://www.hebcal.com/shabbat?cfg=json&latitude=-29.7286&longitude=31.0719&tzid=Africa/Johannesburg&M=on&b=18&leyning=off";
var card = document.getElementById("shabbat-card");

function formatTime(isoString) {
  var d = new Date(isoString);
  return d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Johannesburg" });
}

function formatDate(isoString) {
  var d = new Date(isoString);
  return d.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Johannesburg" });
}

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
