let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isFullscreen = false;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    // Reset animasi saat slide berubah
    if (i === index) {
      slide.querySelectorAll('h1, h2, p, li').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
          el.style.animation = null;
        }, 10);
      });
    }
  });
  currentSlide = index;
}

// Navigasi
const prevBtns = ['prev', 'prev-mobile'];
const nextBtns = ['next', 'next-mobile'];

prevBtns.forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  });
});

nextBtns.forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
  });
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showSlide(Math.max(0, currentSlide - 1));
  if (e.key === 'ArrowRight') showSlide(Math.min(totalSlides - 1, currentSlide + 1));
});

// Fullscreen
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.textContent = '🖥️';

function toggleFullscreen() {
  if (!isFullscreen) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    fullscreenBtn.textContent = '⏹️';
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    fullscreenBtn.textContent = '🖥️';
  }
  isFullscreen = !isFullscreen;
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = '🖥️';
    isFullscreen = false;
  }
});

showSlide(0);
