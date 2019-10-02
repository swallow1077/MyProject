(function () {
  $.ajax({
    type: 'GET',
    url: 'php/order-List.php',
    dataType: 'json',
    success: json => {
      // console.log(json);
      let memberShow = $('#order_list');
      json.forEach(data => {
        memberShow.append(
          `
          <tr>
          <th scope="row">${data.offi_order_no}</th>
          <td scope="row">${data.mem_id}</td>
          <td scope="row">${data.offi_order_stat}</td>
          <td scope="row">${data.offi_order_compted}</td>
          <td scope="row">${data.reci_name}</td>
          <td scope="row">${data.reci_tel}</td>
          <td scope="row">${data.reci_addr}</td>
          <td>
          <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">${data.offi_order_stat}</a>
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
