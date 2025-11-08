// ===== Navigation Menu Toggle =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
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

// ===== Navbar Background on Scroll =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Create WhatsApp message
  const whatsappNumber = "201014967473";
  const whatsappMessage = `Hello El-Sherif Company!%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0AMessage:%0A${message}`;

  // Open WhatsApp with pre-filled message
  window.open(
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
    "_blank"
  );

  // Reset form
  contactForm.reset();

  // Show success message
  alert("Thank you for your message! You will be redirected to WhatsApp.");
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

console.log("El-Sherif Company Website - Loaded Successfully!");
