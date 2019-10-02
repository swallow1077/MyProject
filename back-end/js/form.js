(function () {
  let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

  let memId = document.querySelector('#loginId');
  let memPsw = document.querySelector('#loginPassword');
  let gologin = document.querySelector('#login');

  function checkId() {
    if (memId.value.search(uPattern)) {
      console.log('不行');
    } else {
      console.log('行');
    }
  }
  function checkPassword() {
    if (memPsw.value.search(uPattern)) {
      console.log('不行');
    } else {
      console.log('行');
    }
  }
  function loginEven() {
    console.log('click');
    let memIdValue = memId.value;
    let memPaValue = memPsw.value;
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        if (xhr.responseText === memIdValue) {
          let userId = xhr.responseText;
          console.log(xhr.responseText, '使用者');
          localStorage.setItem('adminUser', userId);
          window.location.href = 'member-List.html';
        } else {
          alert('請確認');
        }
      } else {
        alert(xhr.status);
      }
    };

    xhr.open('post', 'php/login.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    let data_info = `admin_id=${memIdValue}&admin_psw=${memPaValue}`;
    console.log(data_info);
    xhr.send(data_info);
  }

  gologin.addEventListener('click', loginEven, false);
  memId.addEventListener('change', checkId, false);
  memPsw.addEventListener('change', checkPassword, false);
})();
