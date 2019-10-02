var productsViewDataLoad = 0;

function addCollectEvent() {
  productsViewDataLoad++;

  if (productsViewDataLoad >= 4) {
    let collectButton = document.getElementsByClassName('collect');
    let storage = sessionStorage;

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        if (xhr.responseText != "false") {
          data.map(function (element) {
            for (const collectBtn of collectButton) {
              if (collectBtn.id.split('_')[1] == element.prod_no) {
                collectBtn.src = "img/prod/collected.png";
              }
            }
          });
        }
      }
    }

    dataInfo = `mem_id=${storage['member']}`;

    var url = "php/collectView.php";
    xhr.open("post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(dataInfo);

    for (const key of collectButton) {

      key.addEventListener('click', function (collectBtn) {

        if (!storage['member'] || storage['member'] == "") {
          let lightBox = document.querySelector('.lightBox');
          lightBox.style.display = 'block';
        }
        else {
          var xhr = new XMLHttpRequest();

          xhr.onload = function () {
            if (xhr.status == 200) {

              if (xhr.responseText == "true") {
                Swal.fire({
                  type: 'success',
                  text: '選擇的商品已加入收藏囉~!',
                })
                collectBtn.target.src = "img/prod/collected.png";
              }
              else if (xhr.responseText == "false") {
                Swal.fire({
                  type: 'success',
                  text: '選擇的商品已取消收藏囉~!',
                })
                collectBtn.target.src = "img/prod/collect.png";
              }
              else {
                Swal.fire({
                  type: 'error',
                  text: '資料錯誤，請重試',
                })
              }
            }
          }

          dataInfo = `mem_id=${storage['member']}&prod_no=${this.id.split('_')[1]}`;

          var url = "php/addCollect.php";
          xhr.open("post", url, true);
          xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
          xhr.send(dataInfo);
        }

      }, false);
    }
  }

}

function showGroupData(jsonStr) {
  let groupProds = JSON.parse(jsonStr);
  console.log('jsonStr:', groupProds);
  let htmlGroupStr = "";
  let championStr = "";
  if (groupProds.length) {
    for (var i = 4; i < 7; i++) {
      console.log(groupProds.length)
      htmlGroupStr += `<div class="card_slider">`;
      htmlGroupStr += `<div class="card_titleshow">`;
      htmlGroupStr += `<h3 class='card_title'>${groupProds[i].prod_name}</h3>`;
      htmlGroupStr += `<img src="img/prod/collect.png" id="C_${groupProds[i].prod_no}" alt="" class='collect'>`;
      htmlGroupStr += `<input type="hidden" value="${groupProds[i].prod_img}|${groupProds[i].prod_name}|${groupProds[i].prod_price}|1">`
      htmlGroupStr += `</div>`;
      htmlGroupStr += `<img src="${groupProds[i].prod_img}" class='card_img' alt="派">`;
      htmlGroupStr += `<div class="card_price">價格:${groupProds[i].prod_price}元</div>`;
      htmlGroupStr += `<div class="card_btnGroup">`;
      htmlGroupStr += `<a href="product_in.php?prod_no=${groupProds[i].prod_no}" class='card_group'>看商品詳情</a>`;
      htmlGroupStr += `<a href="javascript:void(0)" class='card_cart' id="P_${groupProds[i].prod_no}" onclick=findCartBtn("P_${groupProds[i].prod_no}")>加入購物車
                            <input type="hidden" value="${groupProds[i].prod_img}|${groupProds[i].prod_name}|${groupProds[i].prod_price}|1">
                        </a>`;
      htmlGroupStr += "</div>";
      htmlGroupStr += "</div>";
    }
    htmlGroupStr += "</div>";
  }
  //上個月團購冠軍區塊
  if (groupProds.length) {
    championStr +=
      `<figcaption>${groupProds[4].prod_name}</figcaption>
          <a href="javascript:void(0)"><img src="${groupProds[4].prod_img}" ></a>
          <a href="buy.html" class='card_group' style='display:block; margin:50px auto; width:100px;'>去看看</a>
        `;

  }

  document.querySelector('.figure').innerHTML = championStr;

  document.querySelector('.groupshop .slider_cardset').innerHTML = htmlGroupStr;

  addCollectEvent();
}

function catchGroupProd() {
  var xhr = new XMLHttpRequest();
  // console.log("xhr:",xhr);
  xhr.onload = function () {
    if (xhr.status == 200) {
      showGroupData(xhr.responseText);
      // console.log("xhr回傳的文字:",xhr.responseText);
    } else {
      alert(xhr.status);
    }
  }
  // console.log("xhr.onload:",xhr.onload);

  var url = "php/prod/prodData.php";
  // console.log("url:",url);
  xhr.open('Get', url, true);
  xhr.send(null);
  // console.log("xhr.status:",xhr.status);
}

function showNormalData(jsonStr) {
  let normalProds = JSON.parse(jsonStr);
  // console.log('jsonStr:',normalProds);
  let htmlNormalStr = "";

  if (normalProds.length) {
    for (var i = 8; i < 11; i++) {
      // console.log("normalProds.length:",normalProds.length);

      htmlNormalStr += `<div class="card_slider">`;
      htmlNormalStr += `<div class="card_titleshow">`;
      htmlNormalStr += `<h3 class='card_title'>${normalProds[i].prod_name}</h3>`;
      htmlNormalStr += `<img src="img/prod/collect.png"  id="C_${normalProds[i].prod_no}"alt="" class='collect'>`;
      htmlNormalStr += `</div>`;
      htmlNormalStr += `<img src="${normalProds[i].prod_img}" class='card_img' alt="派">`;
      htmlNormalStr += `<input type="hidden" value="${normalProds[i].prod_img}|${normalProds[i].prod_name}|${normalProds[i].prod_price}|1">`
      htmlNormalStr += `<div class="card_price">價格:${normalProds[i].prod_price}元</div>`;
      htmlNormalStr += `<div class="card_btnGroup">`;
      htmlNormalStr += `<a href="product_in.php?prod_no=${normalProds[i].prod_no}" class='card_group'>看商品詳情
                          </a>`;
      htmlNormalStr += `<a href="javascript:void(0)" class='card_cart' id="P_${normalProds[i].prod_no}" onclick=findCartBtn("P_${normalProds[i].prod_no}")>加入購物車
              <input type="hidden" value="${normalProds[i].prod_img}|${normalProds[i].prod_name}|${normalProds[i].prod_price}|1">
                          </a>`;
      htmlNormalStr += "</div>";
      htmlNormalStr += "</div>";
    }
    htmlNormalStr += "</div>";
  }
  document.querySelector('.prodbase .slider_cardset').innerHTML = htmlNormalStr;

  addCollectEvent()

} //-----------------------showNormalData

function catchNormalProd() {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status == 200) {
      // console.log("xhr.responseText:",xhr.responseText);
      showNormalData(xhr.responseText);
      // console.log("xhr回傳的文字:",xhr.responseText);
    } else {
      alert(xhr.status);
    }
  }
  // console.log("xhr.onload:",xhr.onload);

  var url = "php/prod/prodData.php";
  // console.log("url:",url);
  xhr.open('Get', url, true);
  xhr.send(null);
  // console.log("xhr.status:",xhr.status);
}

function showMatchData(jsonStr) {
  let matchProds = JSON.parse(jsonStr);
  // console.log('jsonStr:',matchProds);
  let htmlmatchStr = "";

  if (matchProds.length) {
    for (var i = 0; i < 3; i++) {
      // console.log("normalProds.length:",matchProds.length);

      htmlmatchStr += `<li class="card_slider">
                            <div class="card_titleshow">
                              <h3 class='card_title'>${matchProds[i].prod_name}</h3>
                              <img src="img/prod/collect.png" id="C_${matchProds[i].prod_no}" alt="" class='collect'>   
                              <input type="hidden" value="${matchProds[i].prod_img}|${matchProds[i].prod_name}|${matchProds[i].prod_price}|1">     
                            </div>    
                            <img src="${matchProds[i].prod_img}" class='card_img' alt="派">          
                            <div class="card_price">價格:${matchProds[i].prod_price}元</div>           
                            <div class="card_btnGroup">       
                              <a href="product_in.php?prod_no=${matchProds[i].prod_no}" class='card_group'>看商品詳情
                                <input type="hidden" name='${matchProds[i].prod_no}'>
                              </a>             
                              <a href="javascript:void(0)" class='card_cart' id="P_${matchProds[i].prod_no}" onclick=findCartBtn("P_${matchProds[i].prod_no}")>加入購物車
                                <input type="hidden" value="${matchProds[i].prod_img}|${matchProds[i].prod_name}|${matchProds[i].prod_price}|1">
                              </a>         
                            </div>`;
      htmlmatchStr += "</li>";
    }
    htmlmatchStr += "</div>";
  }
  document.querySelector('.match .slider_cardset').innerHTML = htmlmatchStr;

  addCollectEvent();

}


function catchMatchProd() {
  var xhr = new XMLHttpRequest();
  // console.log("xhr:",xhr);
  xhr.onload = function () {
    if (xhr.status == 200) {
      showMatchData(xhr.responseText);
      // console.log("xhr回傳的文字:",xhr.responseText);
    } else {
      alert(xhr.status);
    }
  }
  // console.log("xhr.onload:",xhr.onload);

  var url = "php/prod/prodData.php";
  // console.log("url:",url);
  xhr.open('Get', url, true);
  xhr.send(null);
  // console.log("xhr.status:",xhr.status);
}


function showDecoData(jsonStr) {
  let decoProds = JSON.parse(jsonStr);
  // console.log('jsonStr:',decoProds);
  let htmldecoStr = "";

  if (decoProds.length) {
    for (var i = 1; i < 4; i++) {
      // console.log("normalProds.length:",decoProds.length);

      htmldecoStr += `<li class="card_slider">
                            <div class="card_titleshow">
                              <h3 class='card_title'>${decoProds[i].deco_name}</h3>
                              <img src="img/prod/collect.png" class='collect' style='display:none;'>
                            </div>    
                            <img src="${decoProds[i].deco_img}" class='card_img' alt="派">          
                            <div class="card_price">價格:${decoProds[i].deco_price}元</div>           
                            <div class="card_btnGroup">       
                              <a href="product_in_deco.php?deco_no=${decoProds[i].deco_no}"  class='card_group' >看商品詳情</a>             
                              <a href="javascript:void(0)" class='card_cart' id="D_${decoProds[i].deco_no}" onclick=findCartBtn("D_${decoProds[i].deco_no}")>加入購物車
                                <input type="hidden" value="${decoProds[i].deco_img}|${decoProds[i].deco_name}|${decoProds[i].deco_price}|1">
                              </a>         
                            </div>`;
      htmldecoStr += "</li>";
    }
    htmldecoStr += "</div>";
  }
  document.querySelector('.deco .slider_cardset').innerHTML = htmldecoStr;
  // let prod_In=document.querySelectorAll('.card_group');
  // for(let i=0;i<prod_In.length;i++){
  //     prod_In.onclick=connected;
  //     location.href="product_in .php";
  //     console.log(5555);
  // }
  // function connected(){
  //   window.location.href=('product_in.php');
  // }

  addCollectEvent()

}









function catchDeco() {
  var xhr = new XMLHttpRequest();
  // console.log("xhr:",xhr);
  xhr.onload = function () {
    if (xhr.status == 200) {
      showDecoData(xhr.responseText);
      // console.log("xhr回傳的文字:",xhr.responseText);
    } else {
      alert(xhr.status);
    }
  }
  // console.log("xhr.onload:",xhr.onload);

  var url = "php/prod/deco.php";
  // console.log("url:",url);
  xhr.open('Get', url, true);
  xhr.send(null);
  // console.log("xhr.status:",xhr.status);
}



window.addEventListener("load", function () {
  catchGroupProd();
  catchNormalProd();
  catchMatchProd();
  catchDeco();
})




