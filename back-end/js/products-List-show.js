(function () {
  $.ajax({
    type: 'GET',
    url: 'php/products-List.php',
    dataType: 'json',
    success: json => {



      let memberShow = $('#proList');
      json.forEach(data => {

        ///=======基底==========
        let baseNoshow = `${data.base_no}`;
        if (baseNoshow === '1') {
          txtBaseNo = '竹炭'
        } else if (baseNoshow === '2') {
          txtBaseNo = '抹茶'
        } else {
          txtBaseNo = '南瓜'
        };

        ///=======分類2==========
        let ingrNoOne = `${data.ingr_no_1}`;
        if (ingrNoOne === '1') {
          txtIngrNoOne = '杏仁'
        } else if (ingrNoOne === '2') {
          txtIngrNoOne = '蛋黃';
        }
        else if (ingrNoOne === '3') {
          txtIngrNoOne = '紅豆';
        }
        else if (ingrNoOne === '4') {
          txtIngrNoOne = '鳳梨';
        }
        else if (ingrNoOne === '5') {
          txtIngrNoOne = '蔥花';
        }
        else if (ingrNoOne === '6') {
          txtIngrNoOne = '火腿';
        }
        else {
          txtIngrNoOne = '無配料'
        };


        ///=======分類2==========


        let ingrNoTwo = `${data.ingr_no_2}`;
        if (ingrNoTwo === '1') {
          txtIngrNoTwo = '杏仁'
        } else if (ingrNoTwo === '2') {
          txtIngrNoTwo = '蛋黃';
        }
        else if (ingrNoTwo === '3') {
          txtIngrNoTwo = '紅豆';
        }
        else if (ingrNoTwo === '4') {
          txtIngrNoTwo = '鳳梨';
        }
        else if (ingrNoTwo === '5') {
          txtIngrNoTwo = '蔥花';
        }
        else if (ingrNoTwo === '6') {
          txtIngrNoTwo = '火腿';
        }
        else {
          txtIngrNoTwo = '無配料'
        };


        memberShow.append(
          `
          <tr>
          <th scope="row">${data.prod_no}</th>
          <td colspan="2">${data.prod_name}</td>
          <td scope="row">${txtBaseNo}</td>
          <td scope="row">${txtIngrNoOne}</td>
          <td scope="row">${txtIngrNoTwo}</td>
          <td>
            <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">${data.prod_stat}</a>
          </td>
          <td scope="row">${data.prod_price}</td>
          <td scope="row" colspan="3">${data.prod_desc}</td>
          <td scope="row" class="product_img"width='100'><img src="php/${data.prod_img}"></td>
          </tr>
          `,
        );
      });

      function upPdoHandler(e) {
        let selectId = e.target.id;
        console.log(selectId)
      }

      let btn = document.querySelectorAll('.change-btn ')
      btn.forEach((btn) => {
        btn.addEventListener('click', upPdoHandler, false)
      })
    },
    error: function (jqXHR) {
      alert('發生錯誤: ' + jqXHR.status);
    },
  });
  $.ajax({});
})();
