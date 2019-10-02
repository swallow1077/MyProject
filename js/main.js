(function () {

    // var filterBG_lg, filterBG_md;
    // let Controller = 1; // Control Row In md Size Screen
    // let activeNow = 0; // Row Number Record
    // let active = 1; //Active Row Number

    //------------------Set BG-------------------

    function resetBackground() {
        if (window.innerWidth >= 768) {
            filterBG_md.style.display = 'none';
            filterBG_lg.style.display = 'block';
        }
        else {
            filterBG_lg.style.display = 'none';
            filterBG_md.style.display = 'block';
        }
    }

    //-------------------------------------------


    //------------------Filter-------------------

    let filterActive = "";
    let control = false;

    function filter(e) {
        e.stopPropagation();

        let cardList = document.getElementsByClassName('products_cardList')[0];
        let card = cardList.getElementsByClassName('products_card');
        let setControl = false;

        if (filterActive.indexOf(this.id) == -1) {
            filterActive += this.id;
            filterActive += ",";
            control = true;
        }
        else {
            filterActive = filterActive.replace((this.id + ","), "");
            control = false;
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
    }

    //-------------------------------------------

    // function setStatus() {
    //     let statusActive, statistics;
    //     let active = 1; //Active Row Number
    //     // let activeNow = 0; // Row Number Record
    //     let runStatus = 1; // Card Bar Select Number
    //     let runRecord = 1; // Number Of People Record Bar
    //     let activeLine = 0; // Anometion Active Line
    //     let controllerRecord = Controller;
    //     var bodyTop = 0;
    //     var setWidth = false;
    //     var firstTime = firstTime2 = true;
    //     // ceil

    //     function getScrollTop() {
    //         // var bodyTop = 0;
    //         if (typeof window.pageYOffset != "undefined") {
    //             bodyTop = window.pageYOffset;

    //         } else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
    //             bodyTop = document.documentElement.scrollTop;

    //         } else if (typeof document.body != "undefined") {
    //             bodyTop = document.body.scrollTop;
    //         }
    //     }
    //     function getActiveLine() {
    //         console.log(bodyTop)
    //         if (window.innerWidth <= 630) {
    //             activeLine = 1600;
    //             active = Math.floor((bodyTop - 1674) / 426);
    //             Controller = Math.ceil(active / 2);
    //         }
    //         else if (window.innerWidth <= 767) {
    //             activeLine = 1600;
    //             active = Math.floor((bodyTop - 1174) / 426);
    //             Controller = Math.ceil(active / 2);
    //         }
    //         else {
    //             activeLine = 600;
    //             // active = Math.floor((bodyTop - 174) / 426);
    //         }
    //     }
    //     function watchActive() {
    //         if (bodyTop >= activeLine) {
    //             if (active != activeNow) {
    //                 activeNow = active;
    //                 setInjection();
    //             }
    //             else {
    //                 // console.log('#')
    //                 setWidth = false;
    //             }
    //         }
    //         else {
    //             // console.log('$')
    //             setWidth = false;
    //         }
    //     }
    //     function getActive() {
    //         if (window.innerWidth <= 767) return $(`.products_row:nth-of-type(${Controller}) .products_levelBar:nth-of-type(${runStatus++}) .bar_set`);
    //         else return $(`.products_card:nth-of-type(${active}) .products_levelBar:nth-of-type(${runStatus++}) .bar_set`);
    //     }
    //     function getStatis() {
    //         if (window.innerWidth <= 767) return $(`.products_row:nth-of-type(${Controller}) .products_statusBar:nth-of-type(${runRecord++}) .bar_set`);
    //         else return $(`.products_card:nth-of-type(${active}) .products_statusBar:nth-of-type(${runRecord++}) .bar_set`);
    //     }
    //     function setInjection() {
    //         if (window.innerWidth <= 767) {
    //             statusActive = getActive();

    //             if (statusActive.length > 0 || runStatus != 1) {
    //                 if (window.getComputedStyle(statusActive[((active + 1) % 2)], null).getPropertyValue("width") == "0px") {
    //                     console.log('if in')
    //                     let rand = Math.floor(Math.random() * 101);
    //                     statusActive[(active + 1) % 2].style.width = `${rand}%`;
    //                 }
    //             }



    //             if (runRecord == 1) {
    //                 if (firstTime2 || active % 3 == 0) {
    //                     firstTime2 = false;
    //                     statistics = getStatis();
    //                 }

    //                 if (window.getComputedStyle(statistics[(active + 3) % 2], null).getPropertyValue("width") == "0px") {
    //                     let rand = Math.floor(Math.random() * 101);
    //                     statistics[(active + 1) % 2].style.width = `${rand}%`;
    //                 }
    //             }
    //             console.log(((active + 1) % 2), Controller, runStatus)

    //             if (runStatus != 1) {
    //                 setTimeout(() => {
    //                     if (runStatus == 4) runStatus = 0;
    //                     else setInjection();
    //                 }, 200);
    //             }
    //         }
    //         else {

    //             statusActive = getActive();

    //             for (let i = 0; i < statusActive.length; i++) {
    //                 if (window.getComputedStyle(statusActive[i], null).getPropertyValue("width") == "0px") {
    //                     let rand = Math.floor(Math.random() * 101);
    //                     statusActive[i].style.width = `${rand}%`;
    //                 }
    //             }

    //             if (runRecord == 1) {
    //                 let statistics = getStatis();

    //                 for (let i = 0; i < statistics.length; i++) {
    //                     if (window.getComputedStyle(statistics[i], null).getPropertyValue("width") == "0px") {
    //                         let rand = Math.floor(Math.random() * 101);
    //                         statistics[i].style.width = `${rand}%`;
    //                     }
    //                 }
    //             }

    //             if (runStatus != 0) {
    //                 setTimeout(() => {
    //                     if (runStatus == 4) {
    //                         runStatus = 0;
    //                         if (active % 2 != 0)
    //                             active++;
    //                     }
    //                     else setInjection()
    //                 }, 200);
    //             }
    //         }
    //     }

    //     getScrollTop();
    //     getActiveLine();
    //     watchActive();
    // }

    // function loadMore() {
    //     var dataRow = [];

    //     function getScrollTop() {
    //         if (typeof window.pageYOffset != "undefined") {
    //             bodyTop = window.pageYOffset;

    //         }
    //         else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
    //             bodyTop = document.documentElement.scrollTop;

    //         }
    //         else if (typeof document.body != "undefined") {
    //             bodyTop = document.body.scrollTop;
    //         }
    //     }

    //     function getData() {
    //         var xhr = new XMLHttpRequest();
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 var member = JSON.parse(xhr.responseText);
    //                 console.log(member)
    //             } else {
    //                 alert(xhr.status);
    //             }
    //         }
    //         var url = "Join.php?dataTable=member&condition=mem_id&keyWord=apple";
    //         xhr.open("Get", url, true);
    //         xhr.send(null);
    //     }

    //     getScrollTop();

    // }

    function init() {

        filterBG_lg = document.getElementById('filter_bg_lg');
        filterBG_md = document.getElementById('filter_bg_md');

        resetBackground();

        let filterOption = document.getElementsByClassName('products_filterOption');

        Object.keys(filterOption).map(function (i) {
            if(i > 2)
            filterOption[i].getElementsByTagName('input')[0].addEventListener('click', filter, false);
        })
        window.addEventListener('resize', resetBackground, false);
    }

    window.addEventListener('load', init, false);

})();
