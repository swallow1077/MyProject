(function () {
    window.addEventListener('load', function () {
        document.getElementsByClassName('btn_cart')[0].onclick = function (e) {
            e.preventDefault();

            let storage = sessionStorage;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    console.log(xhr.responseText)
                    let data = JSON.parse(xhr.responseText);
                    let prodInfo = `${data[0].deco_img}|${data[0].deco_name}|${data[0].deco_price}|`;

                    if (storage[`D_${storage['dataInfoId']}`]) {
                        itemInfo = storage[`D_${storage['dataInfoId']}`];
                        itemInfo = itemInfo.split('|');
                        storage[`D_${storage['dataInfoId']}`] = `${itemInfo[0]}|${itemInfo[1]}|${itemInfo[2]}|${parseInt(itemInfo[3]) + 1}`;
                    }
                    else {
                        prodInfo += 1;
                        storage[`D_${storage['dataInfoId']}`] = prodInfo;
                        if (!storage['D_List']) storage['D_List'] = "";
                        storage['D_List'] += `D_${storage['dataInfoId']},`;
                    }
                    Swal.fire({
                        type: 'success',
                        title: '感謝您的惠顧',
                        text: '您的商品已加入購物車囉~!',
                    })
                }
            }

            data_info = `deco_no=${storage['dataInfoId']}`;

            var url = "php/getProductInfo_deco.php";
            xhr.open("Post", url, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data_info);
        }
    }, false);
})();