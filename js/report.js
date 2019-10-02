function $id(id) {
    return document.getElementById(id);
  };

// --檢舉-----------
$(document).ready(function(){ 
    $('.report').click(function(){
        if($('#spanLoginText').text()!='登出' || $('#spanLoginTextRwd').text()!='登出'){ 
            $('#alertBoxBody').css('display','block');
        };
    });
    $('#report_cancel').click(function(){
        $('#alertBoxBody').css('display','none');

    });
    $('.report_sure').click(function(){
        $('.reportsend').css('display','block');
        $('#alertBoxBody').css('display','none');

        // setTimeout(function(){
        //     $('.reportsend').css('display','none');
        // },700);


    });
});


function repBtnAdd(){
    $('.report').click(function(e){
        $('.report').attr('disable',true);
        // console.log($(this).attr('repno'));
        if($('#btnloglout').text()=='登出'){
            var msg_no=$(this).attr('msgNo');  
            //  repNo=$(this).attr('repno');
            //  to=$(this).attr('to');

            confirmBox2("確定要檢舉這則言論嗎?",sure,no);
            function sure(){
                var xhr=new XMLHttpRequest();
                xhr.open("Post","php/sendRep.php",true);
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                let storage = sessionStorage;
                var data_info=`msg_no=${msg_no}&memId=${storage['member']}`;
                xhr.send(data_info);
                xhr.onload=function(){
                    if(xhr.status == 200){
                        console.log("responseText:"+xhr.responseText);
                        if(xhr.responseText=='success'){
                            alertBox('感謝您的檢舉，將由管理員進行審核。');
                        }else{
                            alertBox('您已經檢舉過這則留言了。');
                        }
                    }
                    else{
                        alert(xhr.status);
                    }  
                }
            }
            function no(){
                $('.report').attr('disable',false);  
                
            }
        }else{
            alertBox('登入會員後才能進行檢舉');
            $('#sure').click(showLoginForm) ;    
            $('.report').attr('disable',false);          
        }
    });
}

// =============告知登入燈箱======================
function alertBox(msg){
    var boxBody = document.createElement('div');
    boxBody.id = 'alertBoxBody';
    var box = document.createElement('div');
    box.id = 'alertBox';
    var p = document.createElement('p');
    p.innerText = msg;
    var sureBtn = document.createElement('button');
    sureBtn.id = 'sure';
    sureBtn.innerText = '確定';
    box.appendChild(p);
    box.appendChild(sureBtn);
    boxBody.appendChild(box);
    document.getElementsByTagName('body')[0].appendChild(boxBody);
    sureBtn.addEventListener('click', function (){
        document.getElementsByTagName('body')[0].removeChild(boxBody);    
    });
    document.getElementById('alertBoxBody').addEventListener('click', function (e){
        if(e.target.id == 'alertBoxBody'){
            document.getElementsByTagName('body')[0].removeChild(boxBody);    
        }
    })
}

// =============顯示登入燈箱&送出留言清空內容======================
function showLoginForm(){
    let btnloglout = document.getElementById('btnloglout');
    let btnlogloutRwd = document.getElementById('btnlogloutRwd');
    if(btnloglout.innerHTML != "登出" || btnlogloutRwd.innerHTML != "登出"){
        $('.loginRemind').css('display','block');
        $('#loginRemind_wantLongin').click(function(){
            $('.lightBox').css('display','');
            $('.loginRemind').css('display','none');
        });
        $('#loginRemind_cancelLongin').click(function(){
            $('.loginRemind').css('display','none');
            window.location.reload();
        });
        
    }else{
        alert("留言已送出!")
        $id('comment_content').innerHTML = "";
        let comment_stars = $('#rankStar').children('.star');
        comment_stars.attr("src", "img/prd_in_img/star_en.png")
        console.log(comment_stars);
    }
};



// =============判斷是否確定檢舉function======================
function confirmBox(msg, sureFunc){
    var boxBody = document.createElement('div');
    boxBody.id = 'alertBoxBody';
    var box = document.createElement('div');
    box.id = 'alertBox';
    var p = document.createElement('p');
    p.innerText = msg;
    var sureBtn = document.createElement('button');
    sureBtn.id = 'sure';
    sureBtn.innerText = '確定';
    var noBtn = document.createElement('button');
    noBtn.id = 'hellNo';
    noBtn.innerText = '取消';
    box.appendChild(p);
    box.appendChild(noBtn);
    box.appendChild(sureBtn);
    boxBody.appendChild(box);
    document.getElementsByTagName('body')[0].appendChild(boxBody);
    sureBtn.addEventListener('click', function () {
        sureFunc();
        document.getElementsByTagName('body')[0].removeChild(boxBody);
    }); 
    noBtn.addEventListener('click', function () {
        document.getElementsByTagName('body')[0].removeChild(boxBody);
    })
    document.getElementById('alertBoxBody').addEventListener('click', function (e) {
        if (e.target.id == 'alertBoxBody') {
            document.getElementsByTagName('body')[0].removeChild(boxBody);
        }
    })
}
function confirmBox2(msg, sureFunc,noFunc){
    var boxBody = document.createElement('div');
    boxBody.id = 'alertBoxBody';
    var box = document.createElement('div');
    box.id = 'alertBox';
    var p = document.createElement('p');
    p.innerText = msg;
    var sureBtn = document.createElement('button');
    sureBtn.id = 'sure';
    sureBtn.innerText = '確定';
    var noBtn = document.createElement('button');
    noBtn.id = 'hellNo';
    noBtn.innerText = '取消';
    box.appendChild(p);
    box.appendChild(noBtn);
    box.appendChild(sureBtn);
    boxBody.appendChild(box);
    document.getElementsByTagName('body')[0].appendChild(boxBody);
    sureBtn.addEventListener('click', function () {
        sureFunc();
        document.getElementsByTagName('body')[0].removeChild(boxBody);
    }); 
    noBtn.addEventListener('click', function () {
        noFunc();
        document.getElementsByTagName('body')[0].removeChild(boxBody);
    })
    document.getElementById('alertBoxBody').addEventListener('click', function (e) {
        if (e.target.id == 'alertBoxBody') {
            document.getElementsByTagName('body')[0].removeChild(boxBody);
        }
    })
}


window.addEventListener("load", repBtnAdd);
$id('msn_btn').addEventListener('click',showLoginForm);

