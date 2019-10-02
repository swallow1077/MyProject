(function () {
  $.ajax({
    type: 'GET',
    url: 'php/crustomize-Lis.php',
    dataType: 'json',
    success: json => {
      // console.log(json);
      let custShow = $('#custTable');
      json.forEach(data => {
        // console.log(data);
        custShow.append(
          `
          <tr>
          <th scope="row">${data.base_no}</th>
          <td scope="row">${data.base_name}</td>
          <td scope="row">${data.base_img}</td>
          <td scope="row">${data.base_price}</td>
          <td scope="row">${data.base_health_lv}</td>
          <td scope="row">${data.base_sweet_lv}</td>
          <td scope="row">${data.base_salty_lv}</td>
          <td>
            <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">${data.base_stat}</a>
          </td>
        </tr>
          `,
        );
      });
    },
    error: function (jqXHR) {
      alert('發生錯誤: ' + jqXHR.status);
    },
  });
})();
