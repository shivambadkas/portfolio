

//toggle dark mode
document
  .querySelector("#dark-mode-toggle")
  .addEventListener('click', () => {
     document.body.classList.toggle("latex-dark");
  });
//gallerie interactif
lightGallery(document.getElementById('animated-thumbnails-gallery'), {
  thumbnail: true,
});
