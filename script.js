const photos = document.querySelectorAll('.photo-item');

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const imgSrc = photo.querySelector('img').src;
    const imgAlt = photo.querySelector('img').alt;

    // Create lightbox overlay and content
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.textContent = '×';

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Add event listener to close the lightbox
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.remove();
      }
    });
  });
});