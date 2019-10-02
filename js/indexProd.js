

function showNormalData(jsonStr){
    var normalProds=JSON.parse(jsonStr);
    console.log(normalProds);
    let htmlNormalStr="";
    if(normalProds.length){
            htmlNormalStr+=
            `
            <div id='group1' class="burn_box" >
              <div class="index_card">
                <div class="card_titleshow">
                  <h3 class='card_title1'>團購冠軍</h3>
                  <img src="img/index/prd_title.png" alt="">
                </div>
                <div class="index_showtitle">
                  <h3>${normalProds[0].prod_name}</h3>
                  <img src="img/index/collect.png" alt="">
                </div>
                <img src="${normalProds[0].prod_img}" class='card_img1' alt="派">
                <div class="card_price">價格:${normalProds[0].prod_price}元</div>
                <div class="card_btnGroup">
                    <a href="buy.html" class='card_group'>我要團購</a>
                    <a href="prod.html" class='card_cart'>看商品詳情</a>
                </div>
              </div>
            </div>

            <div class="burn_box">
              <div class="index_card">
                <div class="card_titleshow">
                  <h3 class='card_title1'>素顏派</h3>
                  <img src="img/index/prd_title.png" alt="">
                </div>
                <div class="index_showtitle">
                  <h3>${normalProds[8].prod_name}</h3>
                  <img src="img/index/collect.png" alt="">
                </div>
                <img src="${normalProds[8].prod_img}" class='card_img1' alt="派">
                <div class="card_price">價格:${normalProds[8].prod_price}元</div>
                <div class="card_btnGroup">
                    <a href="buy.html" class='card_group'>我要團購</a>
                    <a href="prod.html" class='card_cart'>看商品詳情</a>
                </div>
              </div>
            </div>

            <div class="burn_box">
            <div class="index_card">
              <div class="card_titleshow">
                <h3 class='card_title1'>最佳絕配</h3>
                <img src="img/index/prd_title.png" alt="">
              </div>
              <div class="index_showtitle">
                <h3>${normalProds[4].prod_name}</h3>
                <img src="img/index/collect.png" alt="">
              </div>
              <img src="${normalProds[4].prod_img}" class='card_img1' alt="派">
              <div class="card_price">價格:${normalProds[4].prod_price}元</div>
              <div class="card_btnGroup">
                  <a href="buy.html" class='card_group'>我要團購</a>
                  <a href="prod.html" class='card_cart'>看商品詳情</a>
              </div>
            </div>
          </div>
          <div class="burn_box">
          <div class="index_card">
            <div class="card_titleshow">
              <h3 class='card_title1'>團購冠軍</h3>
              <img src="img/index/prd_title.png" alt="">
            </div>
            <div class="index_showtitle">
              <h3>${normalProds[11].prod_name}</h3>
              <img src="img/index/collect.png" alt="">
            </div>
            <img src="${normalProds[11].prod_img}" class='card_img1' alt="派">
            <div class="card_price">價格:${normalProds[11].prod_price}元</div>
            <div class="card_btnGroup">
                <a href="buy.html" class='card_group'>我要團購</a>
                <a href="prod.html" class='card_cart'>看商品詳情</a>
            </div>
          </div>
        </div>
            `;
    }  
    document.querySelector('.index_product>.container').innerHTML=htmlNormalStr;
}


function catchNormalProd(){
    var xhr=new XMLHttpRequest();
      
      xhr.onload=function(){
        if(xhr.status==200){
          // console.log("xhr.responseText:",xhr.responseText);
          showNormalData(xhr.responseText);
          // console.log("xhr回傳的文字:",xhr.responseText);
        }else{
          alert(xhr.status);
        }
      }
      // console.log("xhr.onload:",xhr.onload);

    var url="php/prod/prodData.php";
    // console.log("url:",url);
    xhr.open('Get',url,true);
    xhr.send(null); 
    // console.log("xhr.status:",xhr.status);
  }
















window.addEventListener('load',function(){
    catchNormalProd();
    // catchDeco();
})