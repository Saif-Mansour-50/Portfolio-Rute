// 1 Navbar Scroll
window.addEventListener("scroll", function () {
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll("nav a");
  var scrollPosition = window.scrollY || document.body.scrollTop;

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop - 200;
    var sectionHeight = section.offsetHeight;
    var id = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      var activeLink = document.querySelector(`nav a[href="#${id}"]`);

      if (activeLink && !activeLink.classList.contains("active-link")) {
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].style.color = "#cad5e2";
          navLinks[j].style.borderBottom = "3px solid transparent";
          navLinks[j].style.borderImageSource = "none";
          navLinks[j].style.fontWeight = "normal";
          navLinks[j].classList.remove("active-link");
        }
        activeLink.style.color = "#6366f1";
        activeLink.style.borderBottom = "3px solid";
        activeLink.style.borderImageSource =
          "linear-gradient(to right, #885df6, #6565f1)";
        activeLink.style.borderImageSlice = "1";
        activeLink.style.fontWeight = "bold";
        activeLink.style.transition = "all 0.3s ease";
        activeLink.classList.add("active-link");
      }
    }
  }
});

// 2 Dark and Light Theme Switch
var themeToggleButton = document.getElementById("theme-toggle-button");
var htmlElement = document.documentElement;

if (localStorage.siteMode === "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}

function themeToggleBtn() {
  if (htmlElement.className.indexOf("dark") !== -1) {
    htmlElement.className = htmlElement.className.replace("dark", "").trim();
    localStorage.setItem("siteMode", "light");
  } else {
    htmlElement.className += " dark";
    localStorage.setItem("siteMode", "dark");
  }
}
themeToggleButton.addEventListener("click", themeToggleBtn);

// 3  Navs & Tabs
var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove("active");
    }

    this.classList.add("active");

    var filterValue = this.getAttribute("data-filter");

    for (var i = 0; i < portfolioItems.length; i++) {
      var item = portfolioItems[i];
      var category = item.getAttribute("data-category");

      if (filterValue === "all" || filterValue === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// 4  Carousel
var carouselContainer = document.getElementById("testimonials-carousel");
var allCards = document.querySelectorAll(".testimonial-card");
var btnNext = document.getElementById("next-testimonial");
var btnPrev = document.getElementById("prev-testimonial");

var currentPos = 0;

function slideCarousel() {
  var cardWidth = allCards[0].offsetWidth;

  carouselContainer.style.transform =
    "translateX(" + currentPos * cardWidth + "px)";
}

btnNext.addEventListener("click", function () {
  var visibleCards;
  if (window.innerWidth >= 1024) {
    visibleCards = 3;
  } else if (window.innerWidth >= 640) {
    visibleCards = 2;
  } else {
    visibleCards = 1;
  }
  var maxIndex = allCards.length - visibleCards;

  if (currentPos < maxIndex) {
    currentPos++;
  } else {
    currentPos = 0;
  }
  slideCarousel();
});

btnPrev.addEventListener("click", function () {
  if (currentPos > 0) {
    currentPos--;
  } else {
    var visibleCards;

    if (window.innerWidth >= 1024) {
      visibleCards = 3;
    } else if (window.innerWidth >= 640) {
      visibleCards = 2;
    } else {
      visibleCards = 1;
    }
    currentPos = allCards.length - visibleCards;
  }
  slideCarousel();
});

window.addEventListener("resize", function () {
  slideCarousel();
});

// 5  gear icon
var settingsBtn = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");

settingsBtn.onclick = function () {
  settingsSidebar.classList.remove("translate-x-full");
  settingsBtn.setAttribute("aria-expanded", "true");
};

closeSettings.onclick = function () {
  settingsSidebar.classList.add("translate-x-full");
  settingsBtn.setAttribute("aria-expanded", "false");
};

var fontOptions = document.querySelectorAll(".font-option");

for (var i = 0; i < fontOptions.length; i++) {
  fontOptions[i].onclick = function () {
    var selectedFont = this.getAttribute("data-font");

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo"
    );

    document.body.classList.add("font-" + selectedFont);

    for (var i = 0; i < fontOptions.length; i++) {
      fontOptions[i].classList.remove("active");
      fontOptions[i].setAttribute("aria-checked", "false");
    }
    this.classList.add("active");
    this.setAttribute("aria-checked", "true");

    localStorage.setItem("user-font", selectedFont);
  };
}

var colorsGrid = document.getElementById("theme-colors-grid");
var themeColors = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#06b6d4",
];

for (var i = 0; i < themeColors.length; i++) {
  var colorBtn = document.createElement("button");
  colorBtn.className =
    "w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 cursor-pointer transition-transform hover:scale-110";
  colorBtn.style.backgroundColor = themeColors[i];

  colorBtn.onclick = (function (color) {
    return function () {
      document.documentElement.style.setProperty("--color-primary", color);
      localStorage.setItem("user-color", color);
    };
  })(themeColors[i]);

  colorsGrid.appendChild(colorBtn);
}

// 6  scroll to top

var scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400 || document.body.scrollTop > 400) {
    scrollToTopBtn.classList.add("opacity-100", "visible");
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
    scrollToTopBtn.classList.remove("opacity-100", "visible");
  }
});

scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
  });
};
