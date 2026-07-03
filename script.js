
// Masonry layout: places photos into whichever column is currently shorter,
// so the DOM order in photos.html reliably determines the top-to-bottom,
// left-to-right reading order (unlike CSS column-count's height-balancing).
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;

  const MOBILE_BREAKPOINT = 700;
  const originalItems = Array.from(gallery.children);
  const NOMINAL_COL_WIDTH = 500; // only used for relative height comparison

  function layoutDesktop() {
    const colLeft = document.createElement('div');
    const colRight = document.createElement('div');
    colLeft.className = 'masonry-col';
    colRight.className = 'masonry-col';

    let heightLeft = 0;
    let heightRight = 0;

    originalItems.forEach((item) => {
      const w = Number(item.getAttribute('width')) || 1;
      const h = Number(item.getAttribute('height')) || 1;
      const estimatedHeight = NOMINAL_COL_WIDTH * (h / w) + 20;

      if (heightLeft <= heightRight) {
        colLeft.appendChild(item);
        heightLeft += estimatedHeight;
      } else {
        colRight.appendChild(item);
        heightRight += estimatedHeight;
      }
    });

    gallery.innerHTML = '';
    gallery.classList.add('js-masonry');
    gallery.appendChild(colLeft);
    gallery.appendChild(colRight);
  }

  function layoutMobile() {
    gallery.innerHTML = '';
    gallery.classList.remove('js-masonry');
    originalItems.forEach((item) => gallery.appendChild(item));
  }

  function applyLayout() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      layoutMobile();
    } else {
      layoutDesktop();
    }
  }

  applyLayout();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyLayout, 150);
  });
});

//toggle dark mode
document
  .querySelector("#dark-mode-toggle")
  .addEventListener('click', () => {
    document.body.classList.toggle("latex-dark");
  });

// Lightbox functionality
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const photoItems = Array.from(document.querySelectorAll('.photo-item'))
    .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));

  let currentIndex = 0;

  function showSlide(index) {
    if (index >= photoItems.length) { currentIndex = 0; }
    else if (index < 0) { currentIndex = photoItems.length - 1; }
    else { currentIndex = index; }

    const item = photoItems[currentIndex];
    lightboxImg.src = item.src;
  }

  function changeSlide(n) {
    showSlide(currentIndex + n);
  }

  photoItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      lightbox.style.display = "block";
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Close functionality
  function closeLightbox() {
    lightbox.style.display = "none";
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => changeSlide(-1));
  nextBtn.addEventListener('click', () => changeSlide(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        changeSlide(-1);
      } else if (e.key === "ArrowRight") {
        changeSlide(1);
      }
    }
  });
});
