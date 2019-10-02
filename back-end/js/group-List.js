(function () {
  $.ajax({
    type: 'GET',
    url: 'php/group-List.php',
    dataType: 'json',
    success: json => {
      // console.log(json);
      let memberShow = $('.groupTable');
      json.forEach(data => {
        memberShow.append(
          `
          <tr>
            <td scope="row">${data.grp_no}</td>
            <td scope="row">${data.cust_no}</td>
            <td scope="row">${data.grp_cdate}</td>
          
            <td scope="row">${data.grp_edate}</td>
            
            <td scope="row">${data.grp_price}</td>
            <td scope="row"><a href="#"
          class="btn btn-primary btn-lg active" role="button" aria-pressed="true">${data.grp_stat}</a>
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
