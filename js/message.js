
function $id(id){
return document.getElementById(id);
};

// -----點擊星星亮幾顆星-------------------
var starIndex = "";
$(document).ready(function() {
    $('.star').click(function (e) {
    console.log($('#rankStar .star').index($(this)));
    starIndex = $('#rankStar .star').index($(this));
    $('#rankStar .star').attr("src", "img/prd_in_img/star_en.png");
    for(let i = 0; i <= $('#rankStar .star').index($(this)) ; i++)
    {
        $(`#rankStar .star:eq(${i})`).attr("src", "img/prd_in_img/star_true.png");
    }
    });
});
// -----點擊星星亮幾顆星-------------------


// ---印留言---------------
function addMes(result){
  var senstr = "";
  senstr+= `<div class="msg_pic">`;
  senstr+= `<img src="img/prd_in_img/Original.jpg" alt="idpic" class="msg_img">`;
  senstr+= `</div>`;
  senstr+= `<div class="msg_txt">`;
  senstr+= `<div class="msg_title">`;
  senstr+= `<p class="msg_id">${result.mem_id}</p>`;
  senstr+= `<div class="fivestar">`;
  for($i=1;$i<=result.mem_eva;$i++)
  senstr+= `<img src="img/prd_in_img/star_true.png" alt="星" class="star">`;
  senstr+= `</div>`;
  senstr+= `</div>`;
  senstr+= `<div class="msg_info">`;
  senstr+= `<p class="msg_content">${result.comment_content}</p>`;
  senstr+= `</div>`;
  senstr+= `<p class="msg_time"><span>留言時間:</span>${result.msgDate}</p>`;
  senstr+= `</div>`;
  senstr+= `<button class="report" id="report" msgNo="">...</button>`;
  // 取得容器
  var container  = document.getElementById('container');

  // 取得 "<li>Item 02</li>" 的元素
  var refNode = document.querySelectorAll('.mem')[0];

  // 建立 li 元素節點
  var newNode = document.createElement('div');
  newNode.id = "add";
  newNode.classList = "mem";
  newNode.innerHTML = senstr;

  // 將新節點 newNode 插入 refNode 的前方
  container.insertBefore(newNode, refNode);
  window.location.reload();

//   $("form[name='addMes']").find(":text,textarea,input").each(function() {
//       $(this).val("");
//   });

}
// ---印留言end---------------



// ---送出留言----------------------------------------------------------
window.addEventListener("load", function () {
    document.getElementById("msn_btn").onclick = function(){
    if($id('spanLoginText').innerText == '登出'){
        var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    console.log("responseText:"+xhr.responseText);
                    var res = JSON.parse(xhr.responseText); //物件
                    console.log(res);
                    addMes(res);
                }
                else{
                alert(xhr.status);
                }
            }

            xhr.open("post", "php/prod_in/sendMesBord.php",true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            
            var dataObj = {};
            var Today = new Date();
        　  var msgDate = Today.getFullYear()+ "-" + (Today.getMonth()+1) + "-" + Today.getDate() ;
            
            // var starIndex = $("#rankStar .star").index($(this));
            console.log(starIndex);

            dataObj.prod_no = document.getElementById("prod_no").value;
            dataObj.mem_id = document.getElementById("mem_id").value;
            dataObj.comment_content = document.getElementById("comment_content").value;
            dataObj.mem_eva = (starIndex)+1;
            // console.log(mem_eva);

            // dataObj.thisStar = document.querySelectorAll(".star").index;
            dataObj.msgDate = msgDate;
            console.log(dataObj);
            var data_info = "dataInfo=" + JSON.stringify(dataObj);
            // var data_info = JSON.stringify(dataObj);
            // var data_info = "dataInfo=" + `msg_name=${msg_name}&comment_content=${comment_content}`;
            console.log(data_info);
            xhr.send(data_info); 
            
    }
    else{
        showLoginForm();
    } 
}  
}, false);



