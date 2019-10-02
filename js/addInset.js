(function () {
    window.addEventListener('load', function () {
        document.getElementsByClassName('btn_cart')[0].onclick = function (e) {
            e.preventDefault();

            let storage = sessionStorage;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    let data = JSON.parse(xhr.responseText);
                    let prodInfo = `${data[0].prod_img}|${data[0].prod_name}|${data[0].prod_price}|`;

                    if (storage[`P_${storage['dataInfoId']}`]) {
                        itemInfo = storage[`P_${storage['dataInfoId']}`];
                        itemInfo = itemInfo.split('|');
                        storage[`P_${storage['dataInfoId']}`] = `${itemInfo[0]}|${itemInfo[1]}|${itemInfo[2]}|${parseInt(itemInfo[3]) + 1}`;
                    }
                    else {
                        prodInfo += 1;
                        storage[`P_${storage['dataInfoId']}`] = prodInfo;
                        if (!storage['P_List']) storage['P_List'] = "";
                        storage['P_List'] += `P_${storage['dataInfoId']},`;
                    }
                    Swal.fire({
                        type: 'success',
                        title: '感謝您的惠顧',
                        text: '您的商品已加入購物車囉~!',
                    })
                }
            }

            data_info = `prod_no=${storage['dataInfoId']}`;

            var url = "php/getProductInfo.php";
            xhr.open("Post", url, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data_info);
        }
    }, false);
})();