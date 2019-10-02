(function () {
    statusApple = [];

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            data = JSON.parse(xhr.responseText);

            data.forEach(function (e) {
                if (e) {
                    if (e.grp_count >= 30) {
                        e.grp_img = "img/product/RedCard_Level.png";
                        e.grp_limit = 30;
                    }
                    else if (e.grp_count >= 20) {
                        e.grp_img = "img/product/GreenCard_Level.png";
                        e.grp_limit = 30;
                    }
                    else if (e.grp_count >= 10) {
                        e.grp_img = "img/product/BlueCard_Level.png";
                        e.grp_limit = 20;
                    }
                    else {
                        e.grp_img = "img/product/GrayCard_Level.png";
                        e.grp_limit = 10;
                    }
                    e.grp_status = Math.ceil(e.grp_count / e.grp_limit * 100);
                    if (e.grp_status > 100) e.grp_status = 100;

                    statusApple.push(e.grp_status);
                }
            });
            
            var itemsHTML = data.map(getItemHTML).join('');
            // console.log(itemsHTML)
            // var $items = $(itemsHTML);

            $('.buytoghter_cards').html(itemsHTML);
        }
    }

    var itemTemplateSrc = $('#templateTest').html();

    function getItemHTML(photo) {
        return microTemplate(itemTemplateSrc, photo);
    }

    function microTemplate(src, data) {
        return src.replace(/\{\{([\w\-_\.]+)\}\}/gi, function (match, key) {
            var value = data;
            key.split('.').forEach(function (part) {
                value = value[part];
            });
            return value;
        });
    }

    var url = "php/indexGroupCard.php";
    xhr.open("get", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(null);

})();