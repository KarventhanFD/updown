// Navbar
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

// Function to handle click events
function handleClick(event) {
  // Remove 'active' class from all links
  navLinks.forEach((link) => link.classList.remove("active"));
  // Add 'active' class to the clicked link
  event.target.classList.add("active");
}

// Add click event listener to each link
navLinks.forEach((link) => link.addEventListener("click", handleClick));

// Set default active link (Home)
document.querySelector('a[href="#home"]').classList.add("active");

// Scroll-based active link
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Carousel Logic
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

// Function to show the current slide
function showSlide(index) {
  carouselItems.forEach((item, i) => item.classList.toggle("active", i === index));
}

// Function to go to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showSlide(currentIndex);
}

// Auto-play the carousel (change slide every 2 seconds)
const carouselInterval = setInterval(nextSlide, 2000);

// Initialize the first slide
showSlide(currentIndex);

// Toggle Mobile Menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => mobileMenu.classList.remove("translate-x-full"));
closeMenu.addEventListener("click", () => mobileMenu.classList.add("translate-x-full"));

// Latest Collection Carousel
const latestCarousel = document.querySelector(".carousel-inner");
const latestImages = document.querySelectorAll(".carousel-items");
let latestIndex = 0;

// Function to show the current slide in the latest collection carousel
function showLatestSlide(newIndex) {
  if (newIndex < 0) {
    latestIndex = latestImages.length - 1;
  } else if (newIndex >= latestImages.length) {
    latestIndex = 0;
  } else {
    latestIndex = newIndex;
  }
  const offset = -latestIndex * 100;
  latestCarousel.style.transform = `translateX(${offset}%)`;
  latestCarousel.style.transition = "transform 0.5s ease-in-out";
}

// Navigation buttons for the latest collection carousel
document.getElementById("prev").addEventListener("click", () => showLatestSlide(latestIndex - 1));
document.getElementById("next").addEventListener("click", () => showLatestSlide(latestIndex + 1));

// Auto Slide Every 3 Seconds for the latest collection carousel
const latestCarouselInterval = setInterval(() => showLatestSlide(latestIndex + 1), 3000);

//--------------------------------Counter----------------------------------------->

function initCountUp() {
  // Elements
  const customerEl = document.getElementById('customerCount');
  const locationEl = document.getElementById('locationCount');
  
  // Fallback if elements don't exist
  if (!customerEl || !locationEl) {
      console.error('CountUp elements not found');
      return;
  }

  // Mobile detection for performance
  const isMobile = window.innerWidth < 640;
  const duration = isMobile ? 1.5 : 2.5;

  // Check if CountUp.js loaded
  if (typeof countUp === 'undefined') {
      // Smooth manual count-up fallback
      const animateValue = (el, start, end) => {
          let startTimestamp = null;
          const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
              el.textContent = Math.floor(progress * (end - start) + start) + "+";
              if (progress < 1) {
                  window.requestAnimationFrame(step);
              }
          };
          window.requestAnimationFrame(step);
      };
      
      animateValue(customerEl, 0, 500);
      animateValue(locationEl, 0, 50);
      return;
  }

  // Configure counters
  const options = {
      duration: duration,
      useEasing: true,
      suffix: '+',
      separator: ''
  };

  const customerCounter = new countUp.CountUp('customerCount', 500, options);
  const locationCounter = new countUp.CountUp('locationCount', 50, options);

  // Start animation when visible
  const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
          customerCounter.start();
          locationCounter.start();
          observer.disconnect();
      }
  }, { 
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly early
  });

  observer.observe(document.getElementById('countup-section'));

  // Fallback if observer not supported
  if (!('IntersectionObserver' in window)) {
      customerCounter.start();
      locationCounter.start();
  }
}

// Initialize with debounce for resize
let initTimeout;
function handleInit() {
  clearTimeout(initTimeout);
  initTimeout = setTimeout(initCountUp, 100);
}

// Start when ready
if (document.readyState === 'complete') {
  handleInit();
} else {
  window.addEventListener('load', handleInit);
}

// Re-init on resize (for mobile/desktop differences)
window.addEventListener('resize', handleInit);