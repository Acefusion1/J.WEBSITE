// ===== Mobile menu =====
var toggle = document.querySelector(".nav-toggle");
var nav = document.getElementById("site-nav");

toggle.addEventListener("click", function () {
  var isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
  toggle.textContent = isOpen ? "Close" : "Menu";
});

// Close the menu after tapping a link
var navLinks = nav.querySelectorAll("a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  });
}

// ===== Live Shabbat times from Hebcal (free, no key needed) =====
// Coordinates for Izinga Ridge, Umhlanga
var hebcalUrl = "https://www.hebcal.com/shabbat?cfg=json&latitude=-29.7286&longitude=31.0719&tzid=Africa/Johannesburg&M=on&b=18&leyning=off";

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

    if (candles) {
      document.getElementById("candles").textContent = formatTime(candles.date);
      document.getElementById("shabbat-date").textContent = "Friday candle lighting: " + formatDate(candles.date);
    }
    if (havdalah) {
      document.getElementById("havdalah").textContent = formatTime(havdalah.date);
    }
  })
  .catch(function () {
    document.getElementById("parsha").textContent = "Shabbat Shalom";
    document.getElementById("shabbat-date").textContent = "Times couldn't load. Phone the office on 031 566 3227.";
  });
