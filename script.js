

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
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const photoItems = document.querySelectorAll('.photo-item');

  let currentIndex = 0;

  function showSlide(index) {
    if (index >= photoItems.length) { currentIndex = 0; }
    else if (index < 0) { currentIndex = photoItems.length - 1; }
    else { currentIndex = index; }

    const item = photoItems[currentIndex];
    lightboxImg.src = item.src;
    captionText.innerHTML = item.alt;
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
