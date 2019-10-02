(function () {

    countExecuteTime()
    var statusApple = [];

    //-----------------JS Base-------------------

    function colorLog(msg, color = "#FAA", tag = false) {
        if (tag) console.log("%c" + msg, "color:" + color + "; background-color:" + tag + ";");
        else console.log("%c" + msg, "color:" + color);
    }
    function tableLog(item) {
        console.table(item);
    }
    function countExecuteTime() {
        console.time('ExecuteTime');
    }
    function viewExecuteTime() {
        console.timeEnd('ExecuteTime');
    }

    //-------------------------------------------

    //-----------------Animate-------------------

    let activeCard = 0;
    let activeBar = 1;
    let activeLine;

    function getScrollTop() {
        let bodyTop = 0;

        if (typeof window.pageYOffset != "undefined") {
            bodyTop = window.pageYOffset;
        }
        else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
            bodyTop = document.documentElement.scrollTop;
        }
        else if (typeof document.body != "undefined") {
            bodyTop = document.body.scrollTop;
        }
        return bodyTop;
    }

    function getActiveLine() {
        // console.log(bodyTop)
        if (window.innerWidth <= 630) {
            activeLine = 1600;
            // Controller = Math.ceil(active / 2);
        }
        else if (window.innerWidth <= 767) {
            activeLine = 1600;
            // Controller = Math.ceil(active / 2);
        }
        else {
            activeLine = 600;
        }

        window.addEventListener('scroll', setStatus, false);
    }

    function getActive() {
        return $(`.products_card:eq(${activeCard})`).find('.bar:eq()').parents('.a')
    }
    function getStatis() {

    }

    function setStatus() {
        if (getScrollTop() >= activeLine) {
            colorLog('active')
        }
    }

    // window.addEventListener('load' , getActiveLine , false);

    //-------------------------------------------


    let filterActive = "";
    let control = false;

    function filter(e) {
        if (e) e.stopPropagation();

        let cardList = document.getElementsByClassName('products_cardList')[0];
        let card = cardList.getElementsByClassName('products_card');
        let setControl = false;

        if (this.id) {
            if (filterActive.indexOf(this.id) == -1) {
                filterActive += this.id;
                filterActive += ",";
                control = true;
            }
            else {
                filterActive = filterActive.replace((this.id + ","), "");
                control = false;
            }
        }
        else {
            let filterOption = document.getElementsByClassName('products_filterOption');
            Object.keys(filterOption).map(function (i) {
                if (i > 2 && filterOption[i].checked) {
                    filterActive += filterOption[i].id;
                    filterActive += ',';
                }
            })
        }

        option = filterActive.split(',');

        if (control) {
            for (let i = 0; i < card.length; i++) {
                for (let j = 0; j < option.length - 1; j++) {
                    if (!card[i].classList.contains(option[j]) && !card[i].classList.contains('filt')) {
                        card[i].classList.add('filt');
                        break;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < card.length; i++) {
                if (option.length > 1) {
                    for (let j = 0; j < option.length - 1; j++) {
                        if (!card[i].classList.contains(option[j]) && !card[i].classList.contains('filt')) {
                            card[i].classList.add('filt');
                            break;
                        }
                        else
                            if (card[i].classList.contains(option[j])) setControl = true;
                            else {
                                setControl = false;
                                break;
                            }
                        if (!setControl && j == option.length - 2) {
                            card[i].classList.add('filt');
                        }
                        else {
                            card[i].classList.remove('filt');
                        }
                    }
                }
                else
                    for (let j = 0; j < option.length; j++) {
                        card[i].classList.remove('filt');
                    }
            }
        }
        console.log(filter)
    }

    let filterOption = document.getElementsByClassName('products_filterOption');

    Object.keys(filterOption).map(function (i) {
        if (i > 2)
            filterOption[i].getElementsByTagName('input')[0].addEventListener('click', filter, false);
    })


    //----------------If Filter------------------

    var filterSelect = document.getElementById('filterOrder').value;
    let y;

    function filterData() {
        filterSelect = document.getElementById('filterOrder').value;

        // x.map(function(e){
        //     console.log(e)
        // })

        // console.log(document.getElementById('filterOrder').value)
        // filterSelect = filterData();
        y = dataOringin.concat();

        if (filterSelect == 'hot') {
            y.sort(function (a, b) {
                return parseInt(a.grp_count) < parseInt(b.grp_count) ? 1 : -1;
            });
        }
        else if (filterSelect == 'new') {
            y.sort(function (a, b) {
                if (a.g_dt < b.g_dt) {
                    return 1;
                } else if (a.g_dt > b.g_dt) {
                    return -1;
                } else {
                    return parseInt(a.g_no) - parseInt(b.g_no);
                }
            });
        }

        let list = document.getElementsByClassName('products_cardList')[0];
        while (list.children.length > 1) {
            list.removeChild(list.lastElementChild);
        }

        var itemsHTML = y.map(getItemHTML).join('');
        var $items = $(itemsHTML);
        $container.infiniteScroll('appendItems', $items);

        test();
        console.log('filterData')
    }


    //----------------Taste Sort-----------------


    let sweet_lv = document.getElementById('sweet_lv');
    let health_lv = document.getElementById('health_lv');
    let salty_lv = document.getElementById('salty_lv');
    let checked = 0;
    let z;

    function filterTaste(e) {

        if (this == sweet_lv) sweet_lv.checked ? (checked++) : (checked--);
        if (this == health_lv) health_lv.checked ? (checked++) : (checked--);
        if (this == salty_lv) salty_lv.checked ? (checked++) : (checked--);

        filterSelect = document.getElementById('filterOrder').value;

        if (checked > 1) {
            this.checked = false;
            checked--;
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: '一次只能選一種口味哦',
            })
        }
        else if (checked == 1) {
            document.getElementById('filterOrder').value = "null";

            z = dataOringin.concat();

            switch (this) {
                case sweet_lv:
                    z.sort(function (a, b) {
                        return parseInt(a.sweet_lv) < parseInt(b.sweet_lv) ? 1 : -1;
                    });
                    break;
                case health_lv:
                    z.sort(function (a, b) {
                        return parseInt(a.health_lv) < parseInt(b.health_lv) ? 1 : -1;
                    });
                    break;
                case salty_lv:
                    z.sort(function (a, b) {
                        return parseInt(a.salty_lv) < parseInt(b.salty_lv) ? 1 : -1;
                    });
                    break;
            }

            let list = document.getElementsByClassName('products_cardList')[0];
            while (list.children.length > 1) {
                list.removeChild(list.lastElementChild);
            }

            var itemsHTML = z.map(getItemHTML).join('');
            var $items = $(itemsHTML);
            $container.infiniteScroll('appendItems', $items);
        }
        else {
            z = dataOringin.concat();

            let list = document.getElementsByClassName('products_cardList')[0];
            while (list.children.length > 1) {
                list.removeChild(list.lastElementChild);
            }

            var itemsHTML = z.map(getItemHTML).join('');
            var $items = $(itemsHTML);
            $container.infiniteScroll('appendItems', $items);
        }

        test();
        console.log()
    }

    sweet_lv.addEventListener('click', filterTaste, false);
    health_lv.addEventListener('click', filterTaste, false);
    salty_lv.addEventListener('click', filterTaste, false);


    //-------------------------------------------

    var set = false;
    var num = -1;

    function test() {

        var storage = sessionStorage;
        // storage['grp_List'] = "";
        // storage['G_6'] = "";
        // storage['G_2'] = "";
        // if(!storage['grp_List']) storage['grp_List'] = "";


        function addCart(e) {
            let grp_no = `G_${this.id}`;

            if (storage['G_List']) {
                let itemString = storage['G_List'];
                let items = itemString.substr(0, itemString.length - 1).split(',');

                for (let key in items) {  //use items[key]
                    if (items[key] == grp_no && storage[grp_no]) {
                        storage[grp_no] = $(this).parents(".products_card").find(".products_img img").attr('src') + "|" + $(this).parents(".products_card").find(".products_Pname p").text() + "|" + this.parentNode.children[0].innerText.split(' ')[1].replace('$', "") + "|" + (parseInt(storage[grp_no].split('|')[3]) + parseInt(this.parentNode.getElementsByTagName('input')[0].value));
                        if (storage['sum_List']) {
                            for (let i = 0; i < parseInt(this.parentNode.getElementsByTagName('input')[0].value); i++) {
                                storage['sum_List'] += items[key];
                                storage['sum_List'] += ",";
                            }
                        }
                        else storage['sum_List'] = `${items[key]},`;
                    }
                    else if (!storage[grp_no]) {
                        storage['G_List'] += `${grp_no},`;
                        storage[grp_no] = $(this).parents(".products_card").find(".products_img img").attr('src') + "|" + $(this).parents(".products_card").find(".products_Pname p").text() + "|" + this.parentNode.children[0].innerText.split(' ')[1].replace('$', "") + "|" + this.parentNode.getElementsByTagName('input')[0].value;
                        if (storage['sum_List']) {
                            for (let i = 0; i < parseInt(this.parentNode.getElementsByTagName('input')[0].value); i++) {
                                storage['sum_List'] += grp_no;
                                storage['sum_List'] += ",";
                            }
                        }
                        else storage['sum_List'] = `${grp_no},`;
                    }
                }
            }
            else {
                storage['G_List'] = "";
                storage['G_List'] += `${grp_no},`;
                storage[grp_no] = $(this).parents(".products_card").find(".products_img img").attr('src') + "|" + $(this).parents(".products_card").find(".products_Pname p").text() + "|" + this.parentNode.children[0].innerText.split(' ')[1].replace('$', "") + "|" + this.parentNode.getElementsByTagName('input')[0].value;
                if (storage['sum_List']) {
                    for (let i = 0; i < parseInt(this.parentNode.getElementsByTagName('input')[0].value); i++) {
                        storage['sum_List'] += grp_no;
                        storage['sum_List'] += ",";
                    }
                }
                else storage['sum_List'] = `${grp_no},`;
            }
            Swal.fire({
                type: 'success',
                title: '感謝您的惠顧',
                text: '您的商品已加入購物車囉~!',
            })
        }

        function addCartEvent() {
            let btn = document.getElementsByClassName('grp_addCart');

            Object.keys(btn).map(function (e) {
                btn[e].addEventListener('click', addCart, false);
            })

        }

        // if(set)
        // {
        //     set = false
        addCartEvent()
        // }
        // window.addEventListener('load', addCartEvent, false);
    };


    //----------------Load Data------------------

    var pageNow = -1;
    var dataOringin = [];
    let x;

    var $container = $('.products_cardList').infiniteScroll({
        path: function () {
            pageNow = this.pageIndex;
            return 'php/groupping.php?pageID=' + this.pageIndex + '&filter=' + filterSelect;
        },
        responseType: 'text',
        status: '.scroll-status',
        history: false,
        pixelsFromNavToBottom: 30,
    });

    // $container.on( 'load.infiniteScroll', test );

    $container.on('load.infiniteScroll', function (event, response) {
        if (response != "查無資料") {
            var data = JSON.parse(response);

            // tableLog(data);
            // data.sort(function(a,b){
            //    return a.sweet_lv > b.sweet_lv ? 1:-1; 
            // });
            // tableLog(data);

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

            dataOringin = dataOringin.concat(data);
            x = dataOringin.concat();

            // filterSelect = document.getElementById('filterOrder').value;

            // if (filterSelect == 'hot') {
            //     x.sort(function (a, b) {
            //         return parseInt(a.grp_count) < parseInt(b.grp_count) ? 1 : -1;
            //     });
            // }
            // else {
            //     x.sort(function (a, b) {
            //         if (a.g_dt < b.g_dt) {
            //             return 1;
            //         } else if (a.g_dt > b.g_dt) {
            //             return -1;
            //         } else {
            //             return parseInt(a.g_no) - parseInt(b.g_no);
            //         }
            //     });
            // }

            let list = document.getElementsByClassName('products_cardList')[0];
            while (list.children.length > 1) {
                list.removeChild(list.lastElementChild);
            }

            var itemsHTML = x.map(getItemHTML).join('');
            var $items = $(itemsHTML);
            $container.infiniteScroll('appendItems', $items);
            console.log('normal')

            // console.log(document.getElementsByClassName('products_cardList')[0].getElementsByClassName('products_card').length)
            if (num != document.getElementsByClassName('products_cardList')[0].getElementsByClassName('products_card').length) {
                num = document.getElementsByClassName('products_cardList')[0].getElementsByClassName('products_card').length;
                test()
            }
            document.getElementById('filterOrder').addEventListener('change', filterData, false);

            if (pageNow != this.pageIndex) {
                pageNow = this.pageIndex;
                filter();
            }
        }
    });

    // load initial page
    $container.infiniteScroll('loadNextPage');

    //------------------//

    var itemTemplateSrc = $('#photo-item-template').html();

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

    //-------------------------------------------
    viewExecuteTime()

})()