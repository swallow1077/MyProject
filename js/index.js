const spotlight = document.getElementById('spotlight');
const spotlight_child = document.getElementById('spotlight-child');
const main = document.querySelector('.main_show');

// console.log(typeof anime);
function moveSpotlight(e) {
  let pos, x, y;
  e.preventDefault();
  x = e.clientX - 300;
  y = e.clientY - 350;
  spotlight.style.left = x + 'px';
  spotlight.style.top = y + 'px';
  spotlight_child.style.left = x + 'px';
  spotlight_child.style.top = y + 'px';
}
function closeHandler(e) {
  $('.cursor-box').css({
    boxShadow: 'none',
  });
  anime({
    targets: '.main_pie',
    bottom: {
      value: ['-100%', '0%'],
      duration: 800,
    },
    opacity: {
      value: [0, 1],
      duration: 1800,
      easing: 'easeInOutSine',
    },
    scale: {
      value: 1.1,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart',
    },
    delay: 250,
    text: {
      value: console.log('aa'),
    },
  });
}

main.addEventListener('click', closeHandler);
// main.addEventListener('mousemove', moveSpotlight);
// main.addEventListener('touchmove', moveSpotlight);
