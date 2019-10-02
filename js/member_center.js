function $id(id){
	return document.getElementById(id);
}

// 展開訂單明細------------------------------------------------------
$(document).ready(function () {
    $('.items_title').on('click', function () {
        let open = $(this).next();  //吃結構
      if($(this).text() == "訂單明細 v") {
        
        open.addClass('show_orderdetail');
        // console.log(open);
        // open.css("display","block");
        $(this).text("訂單明細 ^");
      } else {
        // open.css("display","none");
        open.removeClass('show_orderdetail');
        $(this).text("訂單明細 v");
      }
    });
});

// 頁籤切換 start-------------------------------------------------------

$(document).ready(function () {
    var $tabContainer = $('.tab_container') ,
        $tablinks = $tabContainer.find('.tablinks') ,
        $tab_btn = $tablinks.find('.tab_btn') ,
        $wrap_tab_panel = $tabContainer.find('.wrap_tab_panel') ,
        $tab_panel = $wrap_tab_panel.find('.tab_panel');
    // --預設狀態
    $tab_btn.eq(0).addClass('active');
    $tab_panel.eq(0).show();
     
    $tab_btn.on('click',function(){
        var $tabIndex = $(this).index();
        console.log($tabIndex);
        $(this).addClass('active').siblings().removeClass('active');
        $tab_panel.eq($tabIndex).show().siblings().hide();
        console.log($tab_panel.eq($tabIndex));
        console.log($tab_panel.length);


    });
});

// 頁籤切換end-------------------------------------------------------


//上傳大頭照-------------------------------------------
function getFileInfo(fileStr){
    //回傳一個陣列，索引0放的是主檔名, 索引1放的是副檔名
	let dotPos = fileStr.lastIndexOf(".");
	let fileName = fileStr.substring(0, dotPos);
	let fileExt = fileStr.substr( dotPos+1);

	let file = { 
		name : fileName,
		ext : fileExt
	};
	return file;
}


window.addEventListener("load", function(){
	$id("upFile").onchange = function(e){
		//.........檢查檔案格式
		let fileAccepts = ["bmp", "png", "gif", "jpg"];
		let fileInfo = getFileInfo(e.target.value);
		if( fileAccepts.indexOf(fileInfo.ext.toLowerCase()) == -1){
			alert("檔案格式不對");
			e.target.value = "";
		}else{
			let file = e.target.files[0];
			//console.log(e.target.files.length);
			let reader = new FileReader();
			reader.onload = function(){
				$id("head_pic").src = reader.result;
			}
			reader.readAsDataURL(file);
		}
	}
})
//上傳大頭照-------------------------------------------

// 修改個人資料------------------------------------

function updateData(){
 
    $(".modify_mem").click(function(e){ //讓input可以編輯
      console.log($('.modify_mem').index());
      console.log($(this).prev());
      $(this).prev('input').attr("readonly", false);
      $(this).prev('input').css("backgroundColor", "#ccc");
    });

 };



  

  window.addEventListener("load",function(){
    updateData();
  })
