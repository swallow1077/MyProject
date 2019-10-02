$(document).ready(function(){

    // loading default values;
    $('#input_base').val(2);    // for formData
    $('#input_selectIngred_1').val("");
    $('#input_selectIngred_2').val("");
    $('#input_selectDecor_1').val("");
    $('#input_selectDecor_2').val("");
    $('#input_selectDecor_3').val("");
    $('#cust_price').val(parseInt($('.favor_box:nth-child(2) .cust_base_price').val()));
    $('.price_box').children('p').children('span').text(parseInt($('.favor_box:nth-child(2) .cust_base_price').val()));
    $('.favor_details').html($('.favor_box:nth-child(2)').children('.favor_title').html());
    $('.favor_box:nth-child(2) .favor_img').attr('src',$('.favor_box:nth-child(2) .favor_img').attr('src').replace('style','style_select'));

    var price = parseInt($('.favor_box:nth-child(2) .cust_base_price').val());
    var last_favorPrice = price;
    var last_ingrPrice_1 = 0;
    var last_ingrPrice_2 = 0;
    var last_decoPrice_1 = 0;
    var last_decoPrice_2 = 0;
    var last_decoPrice_3 = 0;


    // mark whick one is selected. modifying the image source.
    $('.favor_box').click(function(){
        // check current favor img src.
        var this_favorSrc = $(this).children('.favor_img').attr('src');
        var this_favorSrc_name = this_favorSrc.substring(this_favorSrc.lastIndexOf('.'),this_favorSrc.lastIndexOf('/')+1);  // get 000

        if(this_favorSrc_name != 'style_select'){
            $(this).children('.favor_img').attr('src',$(this).children('.favor_img').attr('src').replace('style','style_select'));
            $('.favor_box').not(this).children('.favor_img').attr('src','img/cust/style.png');        

            // pie change in show pie area
            var pieSelect = $(this).children('.pie_img').attr('src');   // img/cust/xxx.png
            var pieSelect_name = pieSelect.substring(pieSelect.lastIndexOf('.'),pieSelect.lastIndexOf('/')+1);  // xxx
            var pieChange = $('.pie').attr('src');
            var pieChange_name = pieChange.substring(pieChange.lastIndexOf('.'),pieChange.lastIndexOf('/')+1);
            pieChange = pieChange.replace(pieChange_name,pieSelect_name);
            $('.pie').attr('src', pieChange);

            // mascot change in show pie area
            var mascotSelect = $(this).children('.mascot').attr('src');     // img/cust/xxx.png
            var mascotSelect_name = mascotSelect.substring(mascotSelect.lastIndexOf('.'),mascotSelect.lastIndexOf('/')+1);  // xxx
            var mascotChange = $('.prople').attr('src');
            var mascotChange_name = mascotChange.substring(mascotChange.lastIndexOf('.'),mascotChange.lastIndexOf('/')+1);
            mascotChange = mascotChange.replace(mascotChange_name,mascotSelect_name);
            $('.prople').attr('src', mascotChange);
            // mascot change in pop area.
            var pop_mascotChange = $('.lot_mascot').children('img').attr('src');
            var pop_mascotChange_name = pop_mascotChange.substring(pop_mascotChange.lastIndexOf('.'),pop_mascotChange.lastIndexOf('/')+1);
            pop_mascotChange = pop_mascotChange.replace(pop_mascotChange_name,mascotSelect_name);
            $('.lot_mascot').children('img').attr('src', pop_mascotChange);

            // Changing List details.
            var list_favor = $(this).children('h3').html();
            $('.favor_details').text(list_favor);

            // Changing Price details.
            var favorPrice = parseInt( $(this).children('.cust_base_price').val());
            price -= last_favorPrice;
            price += favorPrice;
            last_favorPrice = favorPrice;
            $('.price_box').children('p').children('span').text(price);

            // formData value
            $('#input_base').val($(this).children('.base_no').val());
            $('#cust_price').val(price);
        }

    });

    var cust_item_ingred_length = $('.cust_item_ingred').length;
    // var selectIngred_length = $('.selectIngred').length;
    for(let i=0; i<cust_item_ingred_length; i++){
        $('.cust_item_ingred').eq(i).click(function(){
            var ingred_1 = $('.selectIngred_1').children('img').attr('src');    // img/small/000.png
            var ingred_1_name = ingred_1.substring(ingred_1.lastIndexOf('.'),ingred_1.lastIndexOf('/')+1);  // get 000

            var ingred_2 = $('.selectIngred_2').children('img').attr('src');
            var ingred_2_name = ingred_2.substring(ingred_2.lastIndexOf('.'),ingred_2.lastIndexOf('/')+1);

            var ingred_src = $('.cust_item_ingred').eq(i).children('img').attr('src');  // img/big/xxx.png
            var ingred_name = ingred_src.substring(ingred_src.lastIndexOf('.'),ingred_src.lastIndexOf('/')+1);  // get xxx
            ingred_src = ingred_src.replace('big','small').replace('000',ingred_name); // big to small, 000 to xxx

            if(ingred_1_name === '000'){
                if(ingred_2_name != ingred_name){
                    // adding img on pie
                    $(".selectIngred_1").children('img').attr("src", ingred_src);

                    // adding list details
                    $('.list_ingred_box ul').append(
                        $('<li>').text($(this).children('span').text())
                    );

                    // changing price
                    var ingred_1_price = parseInt($(this).children('.ingr_price').val());
                    price += ingred_1_price;
                    last_ingrPrice_1 = ingred_1_price;
                    $('.price_box').children('p').children('span').text(price);

                    // for formData
                    $('#input_selectIngred_1').val(parseInt($(this).children('.ingr_no').val()));
                    $('#cust_price').val(price);
                }
                else{
                    alert('您已經選取嘍');
                }
            }
            else if( (ingred_1_name != '000') && (ingred_2_name === '000')){
                if(ingred_1_name != ingred_name){
                    // adding img on pie
                    $(".selectIngred_2").children('img').attr("src", ingred_src);

                    // adding list details
                    $('.list_ingred_box ul').append(
                        $('<li>').text($(this).children('span').text())
                    );

                    // changing price
                    var ingred_2_price = parseInt($(this).children('.ingr_price').val());
                    price += ingred_2_price;
                    last_ingrPrice_2 = ingred_2_price;
                    $('.price_box').children('p').children('span').text(price);

                    // for formData
                    $('#input_selectIngred_2').val(parseInt($(this).children('.ingr_no').val()));
                    $('#cust_price').val(price);
                }
                else{
                    alert('您已經選取嘍');
                }
            }
            else{
                alert('最多只能選兩種配料喔~~');
            }
        });
    }

    var cust_item_decor_length = $('.cust_item_decor').length;
    var selectDecor_length = $('.selectDecor').length;
    for(let i=0; i<cust_item_decor_length; i++){
        $('.cust_item_decor').eq(i).click(function(){
            var decor_src = $('.cust_item_decor').eq(i).children('img').attr('src');  // img/big/xxx.png

            for(var selectDecor_count=0; selectDecor_count<selectDecor_length; selectDecor_count++){
                if($('.selectDecor').eq(selectDecor_count).children('img').attr('src') === 'img/cust/small/000.png'){
                    // adding img on pie
                    $(".selectDecor").eq(selectDecor_count).children('img').attr("src", decor_src);

                    // adding list details
                    $('.list_decor_box ul').append(
                        $('<li>').text($('.cust_item_decor').eq(i).children('span').text())
                    );

                    // changing price
                    var decoPrice = parseInt($('.cust_item_decor').eq(i).children('.deco_price').val());
                    switch(selectDecor_count){
                        case 0:
                            last_decoPrice_1 = decoPrice;
                            break;
                        case 1:
                            last_decoPrice_2 = decoPrice;
                            break;
                        case 2:
                            last_decoPrice_3 = decoPrice;
                            break;
                    }
                    price += decoPrice;
                    
                    
                    // last_decoPrice_1

                    $('.price_box').children('p').children('span').text(price);
                    
                    // for formData
                    $('.input_selectDecor').eq(selectDecor_count).val(parseInt($('.cust_item_decor').eq(i).children('.deco_no').val()));
                    $('#cust_price').val(price);
                    break;
                }
                else if(selectDecor_count==2 && $('.selectDecor').eq(selectDecor_length-1).children('img').attr('src') != 'img/cust/small/000.png'){
                    alert('最多只能選三個喔');
                }
            }
        });
    }
    $(".selectDecor_1").draggable({
        containment: ".selectDecor_box",
        cursor: 'move'
    });
    $(".selectDecor_2").draggable({
        containment: ".selectDecor_box",
        cursor: 'move'
    });
    $(".selectDecor_3").draggable({
        containment: ".selectDecor_box",
        cursor: 'move'
    });

    // clear btns.
    $('#clearIngr').on('click',clearIngrediens);
    $('#RWD_clearIngr').on('click',clearIngrediens);
    $('#clearDeco').on('click',clearDecorations);
    $('#RWD_clearDeco').on('click',clearDecorations);

    function clearIngrediens(){
        // remove list details.
        $('li').remove('.list_ingred_box > ul > li');

        if(last_ingrPrice_1 != 0){
            // remove img on pie
            $('.selectIngred_1').children('img').attr('src', 'img/cust/small/000.png');
            // change price
            price -= last_ingrPrice_1;
            last_ingrPrice_1 = 0;
            $('.price_box').children('p').children('span').text(price);
            // for formData
            $('#input_selectIngred_1').val("");
            $('#cust_price').val(price);

        if(last_ingrPrice_2 != 0){
            // remove img on pie
            $('.selectIngred_2').children('img').attr('src', 'img/cust/small/000.png');
            // change price
            price -= last_ingrPrice_2;
            last_ingrPrice_2 = 0;
            $('.price_box').children('p').children('span').text(price);
            // for formData
            $('#input_selectIngred_2').val("");
            $('#cust_price').val(price);
        }}
    }

    function clearDecorations(){
        // remove list details.
        $('li').remove('.list_decor_box > ul > li');

        if(last_decoPrice_1 != 0){
            // remove img on pie
            $('.selectDecor_1').children('img').attr('src', 'img/cust/small/000.png');
            // change price
            price -= last_decoPrice_1;
            last_decoPrice_1 = 0;
            $('.price_box').children('p').children('span').text(price);
            // for formData
            $('#input_selectDecor_1').val("");
            $('#cust_price').val(price);

        if(last_decoPrice_2 != 0){
            // remove img on pie
            $('.selectDecor_2').children('img').attr('src', 'img/cust/small/000.png');
            // change price
            price -= last_decoPrice_2;
            last_decoPrice_2 = 0;
            $('.price_box').children('p').children('span').text(price);
            // for formData
            $('#input_selectDecor_2').val("");
            $('#cust_price').val(price);


        if(last_decoPrice_3 != 0){
            // remove img on pie
            $('.selectDecor_3').children('img').attr('src', 'img/cust/small/000.png');
            // change price
            price -= last_decoPrice_3;
            last_decoPrice_3 = 0;
            $('.price_box').children('p').children('span').text(price);
            // for formData
            $('#input_selectDecor_3').val("");
            $('#cust_price').val(price);
        }}}
    }

});