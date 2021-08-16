const topBtn = document.querySelector(".arrowup")

document.addEventListener('DOMContentLoaded', () => {
  window.onscroll = function () {
    if (window.pageYOffset > 666) {
      topBtn.classList.add('view');
    } else {
      topBtn.classList.remove('view');
    }
  };

  topBtn.addEventListener('click', function () {
    window.scrollBy({
      top: -window.pageYOffset,
      behavior: 'smooth',
    });
  });
});
