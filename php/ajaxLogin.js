(function() {
  //會員
  let memName = document.querySelector('#memName');
  //帳號
  let memId = document.querySelector('#memId');
  //密碼
  let memPsw = document.querySelector('#memPsw');
  //按鈕區域
  let btnCancel = document.querySelector('#btnLoginCancel');
  let btnLogin = document.querySelector('#btnLogin');
  //選到燈箱區域
  let lightBox = document.querySelector('#lightBox');
  //登入狀態
  let spanLogin = document.querySelector('#spanLogin');

  function showLoginForm() {
    //檢查登入bar面版上 spanLogin 的字是登入或登出
    //如果是登入，就顯示登入用的燈箱(lightBox)
    if (spanLogin.innerHTML === '登入') {
      lightBox.style.display = '';
    } else {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        spanLogin.innerHTML = '登入';
        memName.innerHTML = '&nbsp;';
        memId.value = '';
        memPsw.value = '';
      };
      xhr.open('Get', 'ajaxLogout.php', true);
      xhr.send(null);
    }
  } //showLoginForm

  function sendForm() {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        if (xhr.responseText.indexOf('sysError') != -1) {
          console.log('aa');
          alert('系統異常,請通知系統維護人員');
        } else if (xhr.responseText.indexOf('loginError') != -1) {
          alert('帳密錯誤');
        } else {
          memName.innerText = xhr.responseText;
          spanLogin.innerText = '登出';
          lightBox.style.display = 'none';
        }
      } else {
        alert(xhr.status);
      }
    };
    xhr.open('post', 'ajaxLogin.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    var data_info = `memId=${memId.value}&memPsw=${memPsw.value}`;
    console.log(data_info);
    xhr.send(data_info);
  }

  //將登入表單上的資料清空，並將燈箱隱藏起來
  function cancelLoginHandler() {
    memId.value = '';
    memPsw.value = '';
    lightBox.style.display = 'none';
  }

  function getLoginInfo() {
    //----------------------------檢查使用者是否已登入
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status == 200) {
        if (xhr.responseText.indexOf('notLogin') == -1) {
          //已登入
          memName.innerText = xhr.responseText;
          spanLogin.innerText = '登出';
        }
      } else {
        alert(xhr.status);
      }
    };
    xhr.open('get', 'getLoginInfo.php', true);
    xhr.send(null);
  }
  //註冊事件
  window.addEventListener(
    'load',
    () => {
      getLoginInfo();
      spanLogin.onclick = showLoginForm;
      btnLogin.onclick = sendForm;
      btnCancel.onclick = cancelLoginHandler;
    },
    false,
  );
})();
