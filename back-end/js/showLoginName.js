(function () {
  let outBtn = document.querySelector('#loginUser');
  let adminId = localStorage.getItem('adminUser');
  let changeShow = document.querySelector('.nav-link');
  changeShow.append(
    `使用者：${adminId}`
  )
  // console.log(changeShow);
  function closeIdHandler() {
    console.log('out');
    localStorage.removeItem('adminUser');
    window.location.href = 'index.html';
  }
  outBtn.addEventListener('click', closeIdHandler, false)
})();