$(document).ready(function(){
    $('.price_box').children('p').children('span').text(parseInt($('.favor_box:nth-child(2) .cust_base_price').val()));
    $('.favor_details').html($('.favor_box:nth-child(2)').children('.favor_title').html());
    $('.favor_box:nth-child(2) .favor_img').attr('src',$('.favor_box:nth-child(2) .favor_img').attr('src').replace('style','style_select'));
    var price = parseInt($('.favor_box:nth-child(2) .cust_base_price').val());
    var last_favorPrice = price;

    // mark whick one is selected. modifying the image source.
    $('.favor_box').click(function(){
        // check current favor img src.
        var this_favorSrc = $(this).children('.favor_img').attr('src');
        var this_favorSrc_name = this_favorSrc.substring(this_favorSrc.lastIndexOf('.'),this_favorSrc.lastIndexOf('/')+1);  // get 000

        if(this_favorSrc_name != 'style_select'){
            $(this).children('.favor_img').attr('src',$(this).children('.favor_img').attr('src').replace('style','style_select'));
            $('.favor_box').not(this).children('.favor_img').attr('src','img/cust/style.png');
            
            // Changing List details.
            var list_favor = $(this).children('h3').html();
            $('.favor_details').text(list_favor);

            // Changing Price details.
            var favorPrice = parseInt( $(this).children('.cust_base_price').val());
            price -= last_favorPrice;
            price += favorPrice;
            last_favorPrice = favorPrice;
            $('.price_box').children('p').children('span').text(price);
        }

    });
});