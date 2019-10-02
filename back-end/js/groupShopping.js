(function () {

  let btn = document.querySelector('#upData');
  function upDataHandle() {
    console.log('clickOK');
    let form = document.querySelector('#updataForm');
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        window.location.href = 'group-List.html';
        console.log(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    };

    let memFrom = new FormData(form);
    xhr.open('post', 'php/updata-Group.php', true);
    xhr.send(memFrom);
  }

  btn.addEventListener('click', upDataHandle, false);
})();
