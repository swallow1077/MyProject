function doFirst(){
    //先將checkboxes都註冊onchange事件
      checkboxes=document.getElementsByName('prod');
      for(let i=0;i<checkboxes.length;i++){
          checkboxes[i].addEventListener("change",userSelected);
          checkboxes[i].addEventListener("change",getProd); 
      }
      //下拉式選單
     let prodSelect=document.getElementById('popular_item');
    //  console.log(prodSelect);
     prodSelect.addEventListener("change",userSelected);
     prodSelect.addEventListener("change",getProd);
      

}


function showProd(jsonStr){
      let prods = JSON.parse(jsonStr);
      // console.log('jsonStr:',prods);
      let htmlStr="";  
      htmlStr+="<div style='background-color:#f1bf8a;heigth:500px; class='card_skin'>"
          htmlStr="<div class='card_add_wrap'>";

    if(prods.length){     
      for( var i=0; i<prods.length;i++){
        // console.log(prods[i].prod_no, prods[i].prod_name);
              //-------------------------------------------------卡片結構
              htmlStr+="<div class='slider_cardset card_add_item'>";
                  htmlStr+="<div class='card_slider' style='width:100%;'>";
                      htmlStr+="<div class='card_titleshow'>";
                          htmlStr+=`<h3 class='card_title'>${prods[i].prod_name}</h3>`;
                          htmlStr+=`<img src="img/prod/collect.png" id="C_${prods[i].prod_no}" class='collect'>`;
                      htmlStr+="</div>";
                      htmlStr+=`<img src='${prods[i].prod_img}' class='card_img' alt="">`;
                      htmlStr+=`<div class="card_price">價格:${prods[i].prod_price}元</div>`;
                      htmlStr+="<div class='card_btnGroup'>";
                          htmlStr+=`<a href="product_in.php?prod_no=${prods[i].prod_no}" class='card_group'>看商品詳情</a>`;
                          //-------------------------------------------------------------------findCartBtn這個function放在addCart_prod.js這支裡(addCart_prod.js是sessionStorage用)
                          htmlStr+=`<a href='javascript:void(0)' class='card_cart'  id="P_${prods[i].prod_no}" onclick=findCartBtn("P_${prods[i].prod_no}")>加入購物車
                                        <input type="hidden" value="${prods[i].prod_img}|${prods[i].prod_name}|${prods[i].prod_price}|1">
                                    </a>`;
                      htmlStr+="</div>"; 
                  htmlStr+="</div>"; 
              htmlStr+="</div>";
              //-------------------------------------------------卡片結束
      }
    }else{
            htmlStr+=`<center class='noprod'>沒有符合此條件的商品</center>`;
    }  
            htmlStr+="</div>";
        htmlStr+="</div>";

     
        //卡片模板
        // <div class="carousel-wrap">
        //       <div class="owl-carousel">
        //           <div class="slider_cardset item">
        //               <div class="card_slider">
        //                 <div class="card_titleshow">
        //                   <h3 class='card_title'>宇治金時</h3>
        //                   <img src="img/prod/collect.png" alt="" class='collect'>
        //                 </div>
        //                 <img src="img/prod/pie.png" class='card_img' alt="派">
        //                 <div class="card_price">價格:100元</div>
        //                 <div class="card_btnGroup">
        //                   <a href="product_in.html" class='card_group'>我要團購</a>
        //                   <a href="javascript:void(0)" class='card_cart'>加入購物車</a>
        //                 </div>
        //               </div>
        //           </div>
        //       </div>
        //     </div>

      document.querySelector('.prod_prodset').innerHTML=htmlStr;


  }

function userSelected(e){
      //基底/配料可做選擇,每種各3/6種選項 (裝飾品分開,不做篩選直接秀)
        let base=[];
        let ingr=[];
        let prodSelectOpt=[];
       


        //基底
        for(let i=3;i<6;i++){
          if(checkboxes[i].checked==true){
            base.push(checkboxes[i].value);
          } 
        } 
        // console.log("base_no:",base);
      
        //配料
        for(let j=6;j<15;j++){
          if(checkboxes[j].checked==true){
            ingr.push(checkboxes[j].value);
          }
        }

        //下拉式選單
        let prodSelect=document.getElementById('popular_item');
        let index=prodSelect.selectedIndex;
        
        prodSelectOpt.push(prodSelect.options[index].value);
        // console.log("11111111",prodSelect.options[index].value);


        //手機板filter按取消後,選取過的值要全部清除
        // let cancelBtn=document.querySelector('.cancelBtn');
        // let filterForm=document.querySelector('.filterForm');

        



        let baseStr=base.join("-");
        // console.log("baseStr:",baseStr);
 

        let ingrStr=ingr.join("-");
        // console.log("ingrStr:",ingrStr);
       
        
        if(baseStr.length==0&&ingrStr.length>=1&&!prodSelectOpt.length==0){   //無基底有一種配料
          opt=`ingr_no=${ingrStr}`;
        }else if(baseStr.length>=1&&ingrStr.length>=1&&!prodSelectOpt.length==0){  //1基底+1種配料
          opt=`base_no=${base}&ingr_no=${ingrStr}`;
        }else if(baseStr.length>=1&&ingrStr.length==0&&!prodSelectOpt.length==0){  //1基底0配料
          opt=`base_no=${baseStr}`;
        }else if(baseStr.length==0&&ingrStr.length==0&&prodSelectOpt.length==1){
          opt=`prod_price=${prodSelectOpt}`;
        }


        // console.log("url後面接的變數:",opt);
        return opt;
      }
   


function getProd(){
      var xhr=new XMLHttpRequest();
      // console.log("xhr:",xhr);
      xhr.onload=function(){
        if(xhr.status==200){
           showProd(xhr.responseText);
          //  console.log("xhr回傳的文字:",xhr.responseText);
        }else{
          alert(xhr.status);
        }
      }
      // console.log("xhr.onload:",xhr.onload);
      
      
      var url=`php/prod/prod.php?${userSelected()}`;
     
      // console.log("url:",url);
      xhr.open("Get",url,true);
      xhr.send(null);
      // console.log("xhr.status:",xhr.status);
}
  
  window.addEventListener('load',doFirst)