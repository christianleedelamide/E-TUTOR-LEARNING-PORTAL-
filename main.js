// ================= HAMBURGER NAVIGATION =================
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// ================= SMOOTH SCROLL =================
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

navAnchors.forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    // Close hamburger menu on mobile
    if(hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }

    const targetID = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// ================= HEADER HIDE/SHOW ON SCROLL =================
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.top = "-80px"; // hide header when scrolling down
  } else {
    header.style.top = "0"; // show header when scrolling up
  }

  lastScroll = currentScroll;
});

// ================= EMAILJS =================
// Initialize EmailJS
(function(){
  emailjs.init("P3nSmfQ-SadKsTTu6"); // Your public key
})();

// Connect form dual-send (team + auto-reply)
const connectForm = document.getElementById('connect-form');

connectForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Send to portal team
  emailjs.sendForm('service_etutor', 'template_nleghgr', this)
    .then(() => {
      console.log("Message sent to team ✅");
    }, (err) => {
      console.error("Team message error ❌", err);
    });

  // Send auto-reply to user
  emailjs.sendForm('service_etutor', 'template_6p712xg', this)
    .then(() => {
      alert("Message sent successfully! ✅ Auto-reply sent to your email.");
      connectForm.reset(); // clear form
    }, (err) => {
      alert("Oops! Something went wrong with auto-reply ❌ " + JSON.stringify(err));
    });
});

// ================= DEVELOPER CAROUSEL SWIPE (MOBILE) =================
const carousel = document.querySelector('.developer-carousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.classList.remove('active');
});
carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.classList.remove('active');
});
carousel.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile swipe
let touchStartX = 0;
let touchScrollLeft = 0;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].pageX;
  touchScrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
  const touchX = e.touches[0].pageX;
  const walk = (touchX - touchStartX) * 2; // scroll-fast
  carousel.scrollLeft = touchScrollLeft - walk;
});