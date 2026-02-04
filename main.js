// ================= HEADER HIDE ON SCROLL =================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
        // scrolling down
        header.style.top = '-80px';
    } else {
        // scrolling up
        header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ================= HAMBURGER MENU =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav when link clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({behavior:'smooth', block:'start'});
        }
    });
});

// ================= EMAILJS FORM SUBMISSION =================
(function(){
    emailjs.init('YOUR_EMAILJS_USER_ID'); // replace with your EmailJS User ID
})();

const form = document.getElementById('connect-form');
const popup = document.getElementById('form-popup');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // send email via EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',this)
    .then(() => {
        showPopup('Message Sent Successfully!');
        form.reset();
    }, (error) => {
        showPopup('Error sending message. Try again.');
        console.error('EmailJS Error:', error);
    });
});

// ================= POP-UP FUNCTION =================
function showPopup(message){
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// ================= OPTIONAL: DEVELOPER CAROUSEL SWIPE =================
let isDown = false;
let startX;
let scrollLeft;

const carousel = document.querySelector('.developer-carousel');

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
});// Touch events for mobile swipe
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
