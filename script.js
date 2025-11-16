// ===== Navigation Menu Toggle =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== Navbar Background on Scroll & Progress Bar =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  // Add scrolled class for background
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Calculate scroll progress
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;

  // Update progress bar width
  navbar.style.setProperty("--scroll-width", scrolled + "%");
});

// ===== International Phone Input =====
const phoneInput = document.querySelector("#phone");
let iti = null;

if (phoneInput) {
  iti = window.intlTelInput(phoneInput, {
    initialCountry: "eg",
    preferredCountries: ["eg", "ae", "sa", "kw", "qa", "bh", "om", "us", "gb"],
    separateDialCode: true,
    nationalMode: false,
    autoPlaceholder: "polite",
    formatOnDisplay: true,
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.4/build/js/utils.js",
  });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = iti
    ? iti.getNumber()
    : document.getElementById("phone").value || "Not provided";
  const message = document.getElementById("message").value;

  // Email addresses
  const recipients =
    "ahmed.sherif.elsaid.99@gmail.com,yehiahesham973@gmail.com";

  // Create email subject
  const subject = `New Message from ${name} - El-Sherif Company Website`;

  // Create email body
  const body = `Hello El-Sherif Company,\n\nYou have received a new message from your website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\n---\nThis message was sent from the El-Sherif Company contact form.`;

  // Create mailto link
  const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open email client
  window.location.href = mailtoLink;

  // Reset form after a short delay
  setTimeout(() => {
    contactForm.reset();
    alert("Thank you for your message! Your email client should open shortly.");
  }, 500);
});

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe product categories
const productCategories = document.querySelectorAll(".product-category");
productCategories.forEach(category => {
  category.style.opacity = "0";
  category.style.transform = "translateY(30px)";
  category.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(category);

  // Add click toggle for mobile devices
  category.addEventListener("click", function () {
    // Toggle active class on this category
    this.classList.toggle("active");

    // Remove active from other categories
    productCategories.forEach(otherCategory => {
      if (otherCategory !== this) {
        otherCategory.classList.remove("active");
      }
    });
  });
});

// ===== Active Navigation Link on Scroll =====
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll(".stat-number");

const animateCounter = element => {
  const target = element.innerText;
  const isPlus = target.includes("+");
  const isPercent = target.includes("%");
  const numericValue = parseInt(target.replace(/[^0-9]/g, ""));
  const duration = 2000;
  const increment = numericValue / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }
    element.innerText =
      Math.floor(current) + (isPlus ? "+" : "") + (isPercent ? "%" : "");
  }, 16);
};

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});

// ===== Language Switcher =====
const langButtons = document.querySelectorAll(".lang-btn");
const htmlElement = document.documentElement;

// FORCE RESET: Always start with English as default
// Remove this reset after confirming it works, then it will remember user choice
localStorage.removeItem("language");
localStorage.setItem("language", "en");
let currentLang = "en";

// Initialize language on page load
function initializeLanguage() {
  setLanguage(currentLang);
  updateActiveLangButton(currentLang);
}

// Set language and update all content
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);

  // Update HTML lang and dir attributes
  htmlElement.setAttribute("lang", lang);
  htmlElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Update all elements with data-en and data-ar attributes
  const elements = document.querySelectorAll("[data-en][data-ar]");
  elements.forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (text) {
      // Check if it's a title tag
      if (element.tagName === "TITLE") {
        element.textContent = text;
      }
      // Check if it has innerHTML content that shouldn't be replaced
      else if (element.children.length === 0) {
        element.textContent = text;
      } else {
        // For elements with children, update only text nodes
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        const textNodes = [];
        while (walker.nextNode()) {
          if (walker.currentNode.nodeValue.trim()) {
            textNodes.push(walker.currentNode);
          }
        }
        if (textNodes.length > 0) {
          textNodes[0].nodeValue = text;
        }
      }
    }
  });

  // Update placeholders
  const inputsWithPlaceholder = document.querySelectorAll(
    "[data-placeholder-en][data-placeholder-ar]"
  );
  inputsWithPlaceholder.forEach(input => {
    const placeholder = input.getAttribute(`data-placeholder-${lang}`);
    if (placeholder) {
      input.setAttribute("placeholder", placeholder);
    }
  });

  // Update active button
  updateActiveLangButton(lang);
}

// Update active language button
function updateActiveLangButton(lang) {
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Add click event to language buttons
langButtons.forEach(button => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// Initialize language when page loads
initializeLanguage();

console.log("El-Sherif Company Website - Loaded Successfully!");
