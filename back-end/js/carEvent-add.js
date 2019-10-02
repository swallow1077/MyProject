(function () {
  let btn = document.querySelector('#upcarEventData');
  function upDataHandle() {
    console.log('clickOK');
    let form = document.querySelector('#updatacarList');
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        // window.location.href = 'index_memberList.html';
        console.log(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    };

    let carFrom = new FormData(form);
    xhr.open('post', 'php/updata-CarEvent.php', true);
    xhr.send(carFrom);
  }

  btn.addEventListener('click', upDataHandle, false);
})();
