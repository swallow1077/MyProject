$(document).on("click",".card_cart",function(){
    
        Swal.fire({
            position: 'center end',
            width:'100%',
            padding:'300px 0px',
            html: `<p style='font-size:28px;color:#fff; margin-top:25px;font-weight:800;'>已加入購物車囉~</p>`,
            showConfirmButton: false,
            animation:false,
            customClass:{
                popup:'animated zoomIn'
            },
            timer: 2000,
            background:"url('../../../img/index/shop_2.png') no-repeat 50% 48%",
            backdrop:`
                rgba(0,0,0,.3)
                center center
            `,

        })
    
});
