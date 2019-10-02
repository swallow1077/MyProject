(function () {
    window.addEventListener('load', function () {

        let storage = sessionStorage;

        if (storage['member'] && storage['member'] != "") {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    if (xhr.responseText == "true") {
                        document.getElementsByClassName('btn_heart')[0].getElementsByTagName('img')[0].src = "img/prod/collected.png";
                    }
                }
            }

            data_info = `mem_id=${storage['member']}&prod_no=${storage['dataInfoId']}`;

            var url = "php/ifCollected.php";
            xhr.open("Post", url, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data_info);
        }



        document.getElementsByClassName('btn_heart')[0].onclick = function (e) {
            e.preventDefault();

            let storage = sessionStorage;

            if (!storage['member'] || storage['member'] == "") {
                let lightBox = document.querySelector('.lightBox');
                lightBox.style.display = 'block';
                document.getElementById('btnLogin').addEventListener('click', function () {

                    setTimeout(() => {
                        let storage = sessionStorage;
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (xhr.status == 200) {
                                if (xhr.responseText == "true") {
                                    document.getElementsByClassName('btn_heart')[0].getElementsByTagName('img')[0].src = "img/prod/collected.png";
                                }
                            }
                        }

                        data_info = `mem_id=${storage['member']}&prod_no=${storage['dataInfoId']}`;

                        var url = "php/ifCollected.php";
                        xhr.open("Post", url, true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                        xhr.send(data_info);
                    }, 500);

                }, false);
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        if (xhr.responseText == "true") {
                            Swal.fire({
                                type: 'success',
                                text: '選擇的商品已加入收藏囉~!',
                            })
                            document.getElementsByClassName('btn_heart')[0].getElementsByTagName('img')[0].src = "img/prod/collected.png";
                        }
                        else if (xhr.responseText == "false") {
                            Swal.fire({
                                type: 'success',
                                text: '選擇的商品已取消收藏囉~!',
                            })
                            document.getElementsByClassName('btn_heart')[0].getElementsByTagName('img')[0].src = "img/prod/collect.png";
                        }
                        else {
                            Swal.fire({
                                type: 'error',
                                text: '資料錯誤，請重試',
                            })
                        }
                    }
                }

                data_info = `mem_id=${storage['member']}&prod_no=${storage['dataInfoId']}`;
                console.log(data_info)

                var url = "php/addCollect.php";
                xhr.open("Post", url, true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr.send(data_info);
            }

        }
    }, false);
})();