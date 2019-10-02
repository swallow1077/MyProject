(function() {
  import { map, filter } from 'lodash';
  // let data;
  // function dataAll() {
  //   let xhr = new XMLHttpRequest();
  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       return JSON.parse(xhr.responseText);
  //     } else {
  //       console.log(xhr.status);
  //     }
  //   };
  //   let url = 'jetData.php';
  //   xhr.open('Get', url, true);
  //   xhr.send(null);
  // }
  // data = dataAll();
  // console.log(data);
  $.ajax({
    type: 'GET',
    url: 'jetData.php',
    dataType: 'json',
    success: json => {
      const idTitle = json.map(item => Object.values(item)[1]);
      console.log(idTitle);
      idTitle.forEach(title => {
        $('.title').append(title);
      });
    },
  });
})();
$(selector).html(htmlString);
