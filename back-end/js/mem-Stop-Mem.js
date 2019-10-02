(function () {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status == 200) {
      // window.location.href = 'index_memberList.html';
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.log((xhr.status));
    }
  };


  xhr.open('get', 'php/memberStopMem.php', true);
  xhr.send();
})();
