$(document).ready(function(){
    $('#custCanvas').width($('#selectFavor_pie').width());
    $('#custCanvas').height($('#selectFavor_pie').height());
    
    $('#submitContent').click(function(){

        let btnloglout = document.getElementById('btnloglout');
        let btnlogloutRwd = document.getElementById('btnlogloutRwd');
        if((btnloglout.innerHTML != "登出") || (btnlogloutRwd.innerHTML != "登出")){
            $('.loginRemind').css('display','block');
            $('#loginRemind_wantLongin').click(function(){
                $('.lightBox').css('display','');
                $('.loginRemind').css('display','none');
            });
            $('#loginRemind_cancelLongin').click(function(){
                $('.loginRemind').css('display','none');
            });
        }
    
        else{
            var canvas = document.getElementById("custCanvas");
            var context = canvas.getContext("2d");

            var img = document.getElementById("selectFavor_pie");
            var img2 = document.getElementById("selectIngred_1");
            var img3 = document.getElementById("selectIngred_2");
            var img4 = document.getElementById("selectDecor_1");
            var img5 = document.getElementById("selectDecor_2");
            var img6 = document.getElementById("selectDecor_3");

            var imgW = $('#selectFavor_pie').width();
            var imgH = $('#selectFavor_pie').height();

            var img2W = $('#selectIngred_1').width();
            var img2H = $('#selectIngred_1').height();
            var img3W = $('#selectIngred_2').width();
            var img3H = $('#selectIngred_2').height();

            var imgT = $('#selectFavor_pie').offset().top;
            var imgL = $('#selectFavor_pie').offset().left;

            var img4W = $('#selectDecor_1').width();
            var img4H = $('#selectDecor_1').height();
            var img4T = $('#selectDecor_1').offset().top;
            var img4L = $('#selectDecor_1').offset().left;
            
            var img5W = $('#selectDecor_2').width();
            var img5H = $('#selectDecor_2').height();
            var img5T = $('#selectDecor_2').offset().top;
            var img5L = $('#selectDecor_2').offset().left;

            var img6W = $('#selectDecor_3').width();
            var img6H = $('#selectDecor_3').height();
            var img6T = $('#selectDecor_3').offset().top;
            var img6L = $('#selectDecor_3').offset().left;
            
            context.drawImage(img, 0, 0,imgW/1.78,imgH/2.15);
            context.drawImage(img2, (imgW-img2W)/3.56, 0, img2W/1.78, img2H/2.15);
            context.drawImage(img3, (imgW-img3W)/3.56, 0,img3W/1.78,img3H/2.15);
            context.drawImage(img4, (img4L-imgL)/1.78, (img4T-imgT)/2.15,img4W/1.78,img4H/2.15);
            context.drawImage(img5, (img5L-imgL)/1.78, (img5T-imgT)/2.15,img5W/1.78,img5H/2.15);
            context.drawImage(img6, (img6L-imgL)/1.78, (img6T-imgT)/2.15,img6W/1.78,img6H/2.15);

            saveImage();
        }
    });

    
    function saveImage(){
        var cvs = document.getElementById("custCanvas");
        var dataURL = cvs.toDataURL('image/png');
        document.getElementById('hidden_data').value = dataURL; // this for send to php
        
        // print the pie on pop.
        var cust_printPNG = document.getElementById('cust_printPNG');
        cust_printPNG.src = dataURL;

        var formData = new FormData(document.getElementById("custForm"));
        var xhr = new XMLHttpRequest();
        
        xhr.onload = function(){
            console.log( "xhr.status : ", xhr.status )
            console.log( "xhr.responseText : ", xhr.responseText )
        }
        // xhr.onload = function(){
        //     if( xhr.status == 200){
        //         if(xhr.responseText == "error"){
        //             alert("Error");
        //         }else{
        //             alert('Succesfully uploaded');  
        //             console.log(xhr.responseText);
        //         }
        //     }else{
        //         alert(xhr.status)
        //     }
        // }
        xhr.open('POST', 'php/cust_imgSave.php', true);
        var temp = "";
        // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        for(let i of formData.values())
        {
            if(i>0)
                console.log(i)
            temp += i;
            
        }
        xhr.send(formData);
        console.log("====length:",temp.length);

        // for(let i of formData.values())
        // {
        //     console.log(i)
        // }
        // formData=JSON.stringify(formData)
        // xhr.open('get', ('php/cust_imgSave.php?formData='+formData), true);


        $('#cust_pop').css('display','block');
    }
});