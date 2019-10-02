(function () {
  console.log('member')
  $.ajax({
    type: 'GET',
    url: 'php/member-List.php',
    dataType: 'json',
    success: json => {
      // let $row = $('<tr></tr>');
      json.map((data, index) => {
        let resultContent = document.createElem('tr');
        let item = Object.values(data);
        item.forEach(item => {
          let result = document.createElement('td');
          let itemShow = document.createTextNode(`${item}`);
          result.appendChild(itemShow);
          resultContent.appendChild(result);
        });
        $('#member_list').append(resultContent);
      });
      let adminId = localStorage.getItem('adminUser');
      console.log(adminId);
    },
    error: function (jqXHR) {
      alert('發生錯誤: ' + jqXHR.status);
    },
  });

})();
