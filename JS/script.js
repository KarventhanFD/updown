// ---------------------------- Navbar ---------------------------- //
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

// Click-based active link
function handleClick(event) {
  navLinks.forEach((link) => link.classList.remove("active"));
  event.target.classList.add("active");
}
navLinks.forEach((link) => link.addEventListener("click", handleClick));
document.querySelector('a[href="#home"]')?.classList.add("active");

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

// ---------------------------- Hero Carousel (Fade + Smooth Transition) ---------------------------- //
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showSlide(index) {
  carouselItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add("opacity-100");
      item.classList.remove("opacity-0");
      item.style.zIndex = 10;
    } else {
      item.classList.add("opacity-0");
      item.classList.remove("opacity-100");
      item.style.zIndex = 0;
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showSlide(currentIndex);
}

// Auto-play every 3s
setInterval(nextSlide, 3000);

// Initialize first slide
showSlide(currentIndex);




// ---------------------------- Latest Collection Carousel ---------------------------- //
const latestCarousel = document.querySelector(".carousel-inner");
const latestImages = document.querySelectorAll(".carousel-items");
let latestIndex = 0;

function showLatestSlide(newIndex) {
  if (!latestCarousel || latestImages.length === 0) return;
  latestIndex = (newIndex + latestImages.length) % latestImages.length;
  const offset = -latestIndex * 100;
  latestCarousel.style.transform = `translateX(${offset}%)`;
  latestCarousel.style.transition = "transform 0.5s ease-in-out";
}

document.getElementById("prev")?.addEventListener("click", () => showLatestSlide(latestIndex - 1));
document.getElementById("next")?.addEventListener("click", () => showLatestSlide(latestIndex + 1));
setInterval(() => showLatestSlide(latestIndex + 1), 3000); // Auto-slide

// ---------------------------- Counter Section ---------------------------- //
function initCountUp() {
  const customerEl = document.getElementById('customerCount');
  const locationEl = document.getElementById('locationCount');

  if (!customerEl || !locationEl) return;

  const isMobile = window.innerWidth < 640;
  const duration = isMobile ? 1.5 : 2.5;

  if (typeof countUp === 'undefined') {
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

  const options = {
    duration,
    useEasing: true,
    suffix: '+',
    separator: ''
  };

  const customerCounter = new countUp.CountUp('customerCount', 500, options);
  const locationCounter = new countUp.CountUp('locationCount', 50, options);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      customerCounter.start();
      locationCounter.start();
      observer.disconnect();
    }
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(document.getElementById('countup-section'));

  if (!('IntersectionObserver' in window)) {
    customerCounter.start();
    locationCounter.start();
  }
}

let initTimeout;
function handleInit() {
  clearTimeout(initTimeout);
  initTimeout = setTimeout(initCountUp, 100);
}

if (document.readyState === 'complete') {
  handleInit();
} else {
  window.addEventListener('load', handleInit);
}

window.addEventListener('resize', handleInit);


