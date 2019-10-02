(function () {
    var storage =  sessionStorage;

    function addItem() {
        item = "G_1";
        item+= ",";
        item+= "G_2";
        item+= ","

        storage['G_List'] = item;
        storage['G_1'] = "img/product/product.png|竹炭黑黑|200|1";
        storage['G_2'] = "img/product/product.png|南瓜好吃|250|2";

        item = "D_1";
        item+= ",";
        item+= "D_2";
        item+= ","

        storage['D_List'] = item;
        storage['D_1'] = "img/product/product.png|手指餅乾|50|2";
        storage['D_2'] = "img/product/product.png|蟲蟲軟糖|10|1";

        item = "P_1";
        item+= ",";
        item+= "P_2";
        item+= ","

        storage['P_List'] = item;
        storage['P_1'] = "img/product/product.png|經典南瓜|100|2";
        storage['P_2'] = "img/product/product.png|經典抹茶|100|1";

        location.href = ('cart.html');
    }

    function init() {
        document.getElementById('add').addEventListener('click', addItem, false);
    }

    window.addEventListener('load', init, false);
})()