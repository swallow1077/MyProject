(function() {
  let btnShowmenu = document.querySelector('.layout_menubtn');
  const openHandler = function() {
    $('.layout_nav').toggleClass('menu');
  };
  btnShowmenu.addEventListener('click', openHandler);
})();
