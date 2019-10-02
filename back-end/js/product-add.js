(function () {
  let inputFile = document.getElementById('customFileInput');

  inputFile.addEventListener(
    'change',
    function (e) {
      var fileData = e.target.files[0]; // 檔案資訊
      console.log(fileData); // 用開發人員工具可看到資料
      document.getElementById('file_thumbnail').src = URL.createObjectURL(fileData);
    },
    false,
  );
  let btn = document.querySelector('#upData');
  function upDataHandle() {
    console.log('clickOK');
    let form = document.querySelector('#updataForm');
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        window.location.href = 'products-List.html';
        console.log(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    };

    let memFrom = new FormData(form);
    xhr.open('post', 'php/updata-Cust.php', true);
    xhr.send(memFrom);
  }

  btn.addEventListener('click', upDataHandle, false);
})();
