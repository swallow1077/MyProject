(function() {
  $('#firstBtn_next').click(function() {
    $('html,body').animate({ scrollTop: '1500px' }, 300);
  });

  $('#secondBtn_last').click(function() {
    $('html,body').animate({ scrollTop: '550px' }, 300);
  });
  $('#secondBtn_next').click(function() {
    $('html,body').animate({ scrollTop: '2400px' }, 300);
  });

  $('#thirdBtn_last').click(function() {
    $('html,body').animate({ scrollTop: '1500px' }, 300);
  });
  $('#thirdBtn_next').click(function() {
    $('html,body').animate({ scrollTop: '3300px' }, 300);
  });
  //縮放還沒套用kanna
  // function beginHandler(index) {
  //   $('section .container')
  //     .velocity('stop', true)
  //     .velocity({ scale: 0.8 }, { duration: 250, complete: scrollHandler });
  // }
  // function scrollHandler() {
  //   let index = $('#thirdBtn_next').index();
  //   $('section')
  //     .eq(index)
  //     .velocity('stop', true)
  //     .velocity('scroll', {
  //       duration: 300,
  //       complete: completeHandler,
  //     });
  // }
  // function completeHandler() {
  //   $('section .container')
  //     .velocity('stop', true)
  //     .velocity({ scale: 1 }, 250);
  // }
})();
