(function () {
  $.ajax({
    type: 'GET',
    url: 'php/carevent-List.php',
    dataType: 'json',
    success: json => {
      // console.log(json);
      let custShow = $('#carShow');
      json.forEach(data => {
        // console.log(data);
        custShow.append(
          `
          <tr>
          <th scope="row">${data.event_no}</th>
          <td scope="row">${data.car_eventName}</td>
          <td scope="row">${data.event_cdate}</td>
          <td scope="row">${data.event_edate}</td>
          <td scope="row">${data.event_text}</td>
          <td scope="row">${data.event_exactLocation}</td>
          <td scope="row">${data.event_tel}</td>
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
