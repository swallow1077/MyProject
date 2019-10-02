(function () {
  $.ajax({
    type: 'GET',
    url: 'php/member-List.php',
    dataType: 'json',
    success: json => {
      let memberShow = $('#member_list');
      json.forEach(data => {
        memberShow.append(
          `
          <tr>
            <td scope="row" width='150'>${data.mem_no}</td>
            <td scope="row" >${data.mem_id}</td>
            <td scope="row">${data.mem_psw}</td>
            <td scope="row" class="memName">${data.mem_name}</td>
            <td scope="row" width='150' class="memTel">${data.mem_tel}</td>
            <td scope="row" width='550' class="memAddr">${data.mem_addr}</td>
            <td scope="row" width='100' class="memStat">${data.mem_stat}</td>
            <td scope="row" width='150'>
            <button type="button" class="btn btn-primary cahangeBtn" data-toggle="modal" data-target="#exampleModal" id=${data.mem_no}>
             修改
            </button>
            </td>
          </tr>
          `,
        );
      });


      // ====================顯示區域

      // ====================
      //全部資料
      // console.log(json);
      // 選到到一筆全部資料
      //按鈕事件
      const clickHandler = function (e) {
        let selectId = e.target.id;
        // 找出對應資料
        const oneData = json.map(item => {
          let chickData = item.mem_no;
          if (chickData === selectId) {
            let user_Name = item.mem_name;
            let user_Tel = item.mem_tel;
            let mem_Stat = item.mem_stat;
            let mem_Addr = item.mem_addr;
            let mem_id = item.mem_no;
            // console.log(user_Name, user_Tel, mem_Stat, mem_Addr, mem_id);
            document.querySelector('#memName').value = user_Name;
            document.querySelector('#memTel').value = item.mem_tel;
            document.querySelector('#memState').value = mem_Stat;
            document.querySelector('#memAddr').value = mem_Addr;
            document.querySelector('#memId').value = mem_id;
            //發出修改請求
            let btnSendData = document.querySelector('#changeData');
            function changeHandler() {
              // console.log('updata');
              let changeFrom = document.querySelector('#upForm');
              let xhr = new XMLHttpRequest();


              xhr.onload = () => {
                if (xhr.status == 200) {
                  window.location.reload('member-List.html');

                } else {
                  alert(xhr.status);
                }
              };
              let sandchangeFrom = new FormData(changeFrom);
              xhr.open('post', 'php/memberUpdata.php', true);
              xhr.send(sandchangeFrom);

              // console.log("----------", changeFrom.memState.value, changeFrom.memName.value, changeFrom.memTel.value, changeFrom.memAddr.value);


            }
            //綁定修改事件
            btnSendData.addEventListener('click', changeHandler, false);
          }
        });
        oneData;
        // 選到那一個按鈕的id
      };
      //選到全部的按鈕
      let slectbtns = document.querySelectorAll('.cahangeBtn');
      // console.log(slectbtns);
      //選到按鈕註冊
      slectbtns.forEach(btn => {
        btn.addEventListener('click', clickHandler, false);
      });
    },
    error: function (jqXHR) {
      alert('發生錯誤: ' + jqXHR.status);
    },
  });
})();
