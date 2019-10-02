// 留言板星星評比點擊
$(document).ready(function() {
        $('.star').click(function (e) {
        // $(this).attr("src", "img/prd_in_img/star_true.png")
        // console.log(e.target.src);
        // console.log($('#rankStar .star').index(this))
        console.log($('#rankStar .star').index($(this)));
        var starIndex = $('#rankStar .star').index($(this));
        $('#rankStar .star').attr("src", "img/prd_in_img/star_en.png");
        for(let i = 0; i <= $('#rankStar .star').index($(this)) ; i++)
        {
            // console.log($('#rankStar .star')[i])
            $(`#rankStar .star:eq(${i})`).attr("src", "img/prd_in_img/star_true.png");
            
            // if($('#rankStar .star')[i] === this)
            // {
                // break;
            // }else{
                // $(this).attr("src", "img/prd_in_img/star_true.png");//會變黃色
            // }
        }
        // if(this.src.match("star_true.png")){//
        //     // $(this).removeAttr("src");
        //     console.log($(this).prevUntil())
        //     $(this).attr("src", "img/prd_in_img/star_en.png");
        // }else{
        //     // $(this).removeAttr("src", "img/prd_in_img/star_true.png");
        //     $(this).attr("src", "img/prd_in_img/star_true.png");//會變黃色
        // }
        // $('.star').not(this).attr("src", "img/prd_in_img/star_en.png");
            // console.log(this); 
        });

    

    });

// --檢舉-----------
$(document).ready(function(){
    $('.report').click(function(){
        $('.reportboxbody').css('display','block');
        

    });
    $('#report_cancel').click(function(){
        $('.reportboxbody').css('display','none');

    });
    $('.report_sure').click(function(){
        $('.reportsend').css('display','block');
        $('.reportboxbody').css('display','none');

        setTimeout(function(){
            $('.reportsend').css('display','none');
        },700);

    });
});


function sure(){
    var xhr=new XMLHttpRequest();
    xhr.open("Post","../php/sendRep.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data_info=`repNo=${repNo}&repTo=${to}`;
    xhr.send(data_info);
    xhr.onload=function(){
        if(xhr.responseText=='success'){

            alertBox('感謝您的檢舉，將由管理員進行審核。')
        }else(xhr.responseText=='already2'){

            alertBox('您已經檢舉過這則留言了。')
        }
        $('.report').attr('disable',false);  
    }

}






// alert($('#star').attr("alt"));