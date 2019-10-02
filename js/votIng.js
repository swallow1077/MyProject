// <span class="cust_level">${topdata[i].cust_no}</span>

(function () {
  function showLevel() {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200) {
        let topdata = JSON.parse(xhr.responseText);
        // console.log(topdata);
        let x = '';
        for (i = 0; i < 3; i = i + 1) {
          // console.log(topdata[i].cust_name, topdata[i].cust_no, topdata[i].vote);
          x += `
          <div class="vol_showlevel">
            <h3 class="vot_name">${topdata[i].cust_name}</h3>   
            <span class="cust_vot">${topdata[i].vote}</span>
            <span class="cust_level">${[i + 1]}</span>
          </div>
          `;
        }
        $('.show_votText').append(x);
      } else {
        alert(xhr.status);
      }
    };
    let url = 'php/vot/vot_top3.php';
    xhr.open('get', url, true);
    xhr.send(null);
  }

  function getVotList() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        let memberShow = $('.vot_group');
        let votData = JSON.parse(xhr.responseText);
        votData.forEach(obj => {
          memberShow.append(
            `       
            <div class="vot_card" id="cust_no=${obj.cust_no}">  
                <div class="vot_imgarea">          
                  <h3 class="img_title">${obj.cust_name}</h3>
                  <img src="${obj.cust_img}" alt="pie" />
                </div>
                <div>
                  <p class="vot_tetInfo">${obj.cust_import}</p>
                </div>
                <div class="vot_txt" id="${obj.cust_no}">     
                  <a class="votBtn">投給一票</a>
                </div>             
            </div>
          
            `,
          );
        });
        let vot = document.querySelectorAll('.vot_txt');
        // console.log(vot);
        // =============顯示票=======================
        function showVot() {
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status == 200) {
              let stats = JSON.parse(xhr.responseText);
              stats.forEach(ele => {

                let slideId = document.getElementById(`cust_no=${ele.cust_no}`);
                let votTitle = document.createElement('span');
                let votArea = document.createElement('div');
                votArea.className = 'votShow';
                votTitle.className = 'votTitle';
                let votTextnode = document.createTextNode(`${ele.vote}`);
                votTitle.appendChild(votArea);
                votArea.appendChild(votTextnode);
                slideId.appendChild(votArea);
              });
            }
          };
          let url = 'php/vot/showVot.php';
          xhr.open('get', url, true);
          xhr.send(null);
        }
        showVot();
        // ===========================================

        vot.forEach(btn => {
          btn.addEventListener('click', e => {
            let memberData = sessionStorage.getItem('memberData');
            // 拿到資料
            if (memberData !== '') {
              // console.log('有資料');
              let changeJsomMdata = JSON.parse(memberData);
              let userCheckMem = changeJsomMdata.mem_id;
              let memId = userCheckMem;
              let seletIndex = e.target.parentNode.id;
              // console.log(memId, seletIndex, '這邊');
              if (memId !== '') {
                // console.log(memId, '有帳號');
                //判斷是否有登入;
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                  if (xhr.status == 200) {
                    let stats = xhr.responseText;

                    // console.log(e.target, 'ha');
                    if (stats.indexOf('ok') != -1) {
                      let nowBtn = e.target.parentNode;
                      let btnValue = nowBtn.nextSibling.nextSibling.textContent;
                      let upDataVotNum = btnValue * 1 + 1;
                      console.log(upDataVotNum);
                      let upData = nowBtn.nextSibling.nextSibling;
                      upData.innerText = upDataVotNum;
                      // console.log(upData);
                      Swal.fire({
                        title: '感謝你的支持',
                        confirmButtonText: '離開<b style="color:green;"></b>',
                        type: 'success',
                      });
                    } else {
                      Swal.fire({
                        title: '你已投票了',
                        confirmButtonText: '離開<b style="color:red;"></b>',
                        type: 'error',
                      });
                    }
                  } else {
                    alert(xhr.status);
                  }
                };
                let select = `cust_no=${seletIndex}&mem_id=${memId}`;
                console.log(memId, '哪一個會員');
                console.log(seletIndex, '投幾號');
                console.log(select, '傳過去資料');
                let url = 'php/vot/upVot.php';
                xhr.open('post', url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(select);
              }
            } else {
              // console.log('無資料');
              Swal.fire({
                title: '請登入',
                confirmButtonText: '離開<b style="color:coral;"></b>',
                type: 'warning',
              });
            }
            // let memId = userCheckMem;
          });
        });
      } else {
        alert(xhr.status);
      }
    };
    let url = 'php/vot/vot.php';
    xhr.open('get', url, true);
    xhr.send(null);
  }
  showLevel();
  getVotList();
})();
