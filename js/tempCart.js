(function () {
    var storage = sessionStorage;
    var bodyTop;
    var cartRWD = true;
    var subAllTotal = 0;

    function getScrollTop() {
        bodyTop = document.body.clientWidth;
    }

    function cartList() {

        var old_element = document.getElementById('prevStep');
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        var old_element = document.getElementById('nextStep')
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById('nextStep').onclick = function () {
            if (parseInt(document.getElementById('subtotal').innerText) == 0) {
                Swal.fire({
                    type: 'error',
                    text: '尚未選購商品~!',
                })
            }
            else if (!storage['member'] || storage['member'] == "") {
                let lightBox = document.querySelector('.lightBox');
                lightBox.style.display = 'block';
            }
            else {
                nextStep();
            }
        };

        var cartList = document.getElementById('cart_list').getElementsByTagName('tbody')[0];

        if (storage['P_List']) {
            let itemString = storage['P_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');

            // 每購買一個品項，就呼叫函數createCartList動態新增一個<tr>
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);
            }
        }
        if (storage['G_List']) {
            let itemString = storage['G_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');

            // 每購買一個品項，就呼叫函數createCartList動態新增一個<tr>
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);

            }
        }
        if (storage['D_List']) {
            let itemString = storage['D_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');

            // 每購買一個品項，就呼叫函數createCartList動態新增一個<tr>
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);
            }
        }

        //-------------------購物車第一步----------------------)
        function createCartList(itemId, itemValue = "") {

            let itemImage = itemValue.split('|')[0];
            let itemName = itemValue.split('|')[1];
            let itemPrice = parseInt(itemValue.split('|')[2]);
            let itemQuantity = parseInt(itemValue.split('|')[3]);
            let subtotal = document.getElementById('subtotal');

            if (bodyTop <= 767) {

                if (cartRWD) {
                    let cartViewTh = document.getElementById('cart_list').children[0].firstElementChild;

                    if (cartViewTh.hasChildNodes()) {
                        while (cartViewTh.childNodes.length >= 1) {
                            cartViewTh.removeChild(cartViewTh.firstChild);
                        }
                    }

                    let cartThImg = document.createElement('th');
                    let cartThName = document.createElement('th');

                    cartThImg.innerText = "商品圖片"
                    cartThName.innerText = "商品名稱";
                    cartThImg.style.width = '50%';
                    cartThName.style.width = '50%';

                    cartViewTh.appendChild(cartThImg);
                    cartViewTh.appendChild(cartThName);

                    cartRWD = false;
                }
                else {
                    let cartViewThClone = document.getElementById('cart_list').children[0].firstElementChild.cloneNode(true);
                    cartList.insertBefore(cartViewThClone, cartList.lastElementChild);
                }


                // Tr 1
                let trItemList = document.createElement('tr');
                // Tr 2
                let priceTr = document.createElement('tr');
                // Tr 3
                let controlTr = document.createElement('tr');

                trItemList.className = 'item';
                trItemList.id = itemId;
                cartList.insertBefore(trItemList, cartList.lastElementChild);
                cartList.insertBefore(priceTr, cartList.lastElementChild);
                cartList.insertBefore(controlTr, cartList.lastElementChild);

                //商品圖片
                let tdImage = document.createElement('td');
                let image = document.createElement('img');

                image.src = itemImage;
                image.height = 90;
                image.width = 140;
                tdImage.style.width = '50%';

                tdImage.appendChild(image);
                trItemList.appendChild(tdImage);

                //商品名稱
                let tdName = document.createElement('td');
                let name = document.createElement('p');

                name.innerText = itemName;
                tdName.style.width = '50%';

                tdName.appendChild(name);
                trItemList.appendChild(tdName);

                //商品單價
                let tdPrice = document.createElement('td');
                let price = document.createElement('p');
                let priceTitle = document.createElement('p');

                price.innerText = itemPrice;
                priceTitle.innerText = "單價: ";
                tdPrice.style.width = '50%';

                tdPrice.appendChild(priceTitle);
                tdPrice.appendChild(price);
                priceTr.appendChild(tdPrice);

                //商品數量
                let tdQuantity = document.createElement('td');
                let quantity = document.createElement('p');
                let controlBar = document.createElement('div');
                let optionPlus = document.createElement('span');
                let optionMinus = document.createElement('span');
                let valueView = document.createElement('input');

                controlBar.classList.add('quantity_control');
                optionPlus.classList.add('quantity_plus');
                optionMinus.classList.add('quantity_minus');
                valueView.classList.add('quantity');

                optionPlus.innerText = '+';
                optionMinus.innerText = '-';
                valueView.type = 'number';
                valueView.min = 1;
                valueView.max = 99;
                valueView.value = itemQuantity;
                tdQuantity.style.width = '50%';

                optionPlus.addEventListener('click', quantityPlus);
                optionMinus.addEventListener('click', quantityMinus);
                valueView.addEventListener('change', checkQuantity);

                controlBar.appendChild(optionMinus);
                controlBar.appendChild(valueView);
                controlBar.appendChild(optionPlus);
                tdQuantity.appendChild(controlBar);
                priceTr.appendChild(tdQuantity);

                //商品金額
                let tdTotal = document.createElement('td');
                let totlaTitle = document.createElement('p');
                let total = document.createElement('p');

                total.innerText = valueView.value * itemPrice;
                totlaTitle.innerText = '小計: ';
                tdTotal.style.width = '50%';

                tdTotal.appendChild(totlaTitle);
                tdTotal.appendChild(total);
                controlTr.appendChild(tdTotal);

                //操作選項
                let tdDelete = document.createElement('td');
                tdDelete.style.width = '50%';
                // tdDelete.id = itemId;

                let btn = document.createElement('p');
                btn.innerText = "刪除";

                btn.addEventListener('click', deleteItem);

                tdDelete.appendChild(btn);
                controlTr.appendChild(tdDelete);

                subtotal = this.subtotal;
                subtotal.innerText = parseInt(subtotal.innerText) + parseInt(total.innerText);

            }
            else {
                //建立TableRow
                let trItemList = document.createElement('tr');
                trItemList.className = 'item';
                trItemList.id = itemId;
                cartList.insertBefore(trItemList, cartList.lastElementChild);

                //商品圖片
                let tdImage = document.createElement('td');
                let image = document.createElement('img');

                image.src = itemImage;
                image.height = 90;
                image.width = 140;

                tdImage.appendChild(image);
                trItemList.appendChild(tdImage);

                //商品名稱
                let tdName = document.createElement('td');
                let name = document.createElement('p');

                name.innerText = itemName;

                tdName.appendChild(name);
                trItemList.appendChild(tdName);


                //商品單價
                let tdPrice = document.createElement('td');
                let price = document.createElement('p');

                price.innerText = itemPrice;

                tdPrice.appendChild(price);
                trItemList.appendChild(tdPrice);


                //商品數量
                let tdQuantity = document.createElement('td');
                let quantity = document.createElement('p');
                let controlBar = document.createElement('div');
                let optionPlus = document.createElement('span');
                let optionMinus = document.createElement('span');
                let valueView = document.createElement('input');

                controlBar.classList.add('quantity_control');
                optionPlus.classList.add('quantity_plus');
                optionMinus.classList.add('quantity_minus');
                valueView.classList.add('quantity');

                optionPlus.innerText = '+';
                optionMinus.innerText = '-';
                valueView.type = 'number';
                valueView.min = 1;
                valueView.max = 99;
                valueView.value = itemQuantity;

                optionPlus.addEventListener('click', quantityPlus);
                optionMinus.addEventListener('click', quantityMinus);
                valueView.addEventListener('change', checkQuantity);

                controlBar.appendChild(optionMinus);
                controlBar.appendChild(valueView);
                controlBar.appendChild(optionPlus);
                tdQuantity.appendChild(controlBar);
                trItemList.appendChild(tdQuantity);

                //商品金額
                let tdTotal = document.createElement('td');
                let total = document.createElement('p');

                total.innerText = document.getElementById(`${itemId}`).getElementsByTagName('input')[0].value * itemPrice;

                tdTotal.appendChild(total);
                trItemList.appendChild(tdTotal);

                //操作選項
                let tdDelete = document.createElement('td');
                // tdDelete.id = itemId;

                let btn = document.createElement('p');
                btn.innerText = "刪除";

                btn.addEventListener('click', deleteItem);

                tdDelete.appendChild(btn);
                trItemList.appendChild(tdDelete);

                subtotal = this.subtotal;
                subtotal.innerText = parseInt(subtotal.innerText) + parseInt(total.innerText);
            }


        }

        function deleteItem() {
            var itemId;

            if (bodyTop >= 768) {
                itemId = this.parentNode.parentNode.getAttribute('id');
            }
            else {
                itemId = this.parentNode.parentNode.previousSibling.previousSibling.getAttribute('id');
            }

            let itemValue = storage.getItem(itemId);
            let itemPrice = parseInt(itemValue.split('|')[2]);

            if (bodyTop >= 768)
                subtotal.innerText = parseInt(subtotal.innerText) - document.getElementById(itemId).getElementsByTagName('input')[0].value * itemPrice;
            else
                subtotal.innerText = parseInt(subtotal.innerText) - document.getElementById(itemId).nextSibling.getElementsByTagName('input')[0].value * itemPrice;

            //2.清除storage的資料
            storage.removeItem(itemId);
            if (storage['P_List'] && storage['P_List'].indexOf(itemId) != -1) {
                storage['P_List'] = storage['P_List'].replace(itemId + ',', '');
                while( storage['sum_List'].indexOf(itemId)!=-1){
                    storage['sum_List'] = storage['sum_List'].replace(`${itemId},`, '');
                }
                
                console.log("=====in");
            }
            else if (storage['G_List'] && storage['G_List'].indexOf(itemId) != -1) {
                storage['G_List'] = storage['G_List'].replace(itemId + ',', '');
                
                while( storage['sum_List'].indexOf(itemId)!=-1){
                    storage['sum_List'] = storage['sum_List'].replace(`${itemId},`, '');
                }
            }
            else if (storage['D_List'] && storage['D_List'].indexOf(itemId) != -1) {
                storage['D_List'] = storage['D_List'].replace(itemId + ',', '');
                while( storage['sum_List'].indexOf(itemId)!=-1){
                    storage['sum_List'] = storage['sum_List'].replace(`${itemId},`, '');
                }
            }

            //3.刪除該筆tr
            if (bodyTop >= 768)
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
            else {
                if (this.parentNode.parentNode.parentNode.children.length > 5)
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.previousSibling.previousSibling.previousElementSibling);
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.previousSibling.previousSibling);
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.previousSibling);
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
            }
        }
        function quantityPlus() {
            if (parseInt(this.previousSibling.value) < parseInt(this.previousSibling.max)) {
                if (bodyTop >= 768) {
                    let itemPrice = this.parentNode.parentNode.previousSibling.getElementsByTagName('p')[0].innerText;
                    let itemTotal = this.parentNode.parentNode.nextSibling.getElementsByTagName('p')[0];

                    subtotal.innerText = parseInt(subtotal.innerText) - this.previousSibling.value * itemPrice;

                    this.previousSibling.value = parseInt(this.previousSibling.value) + 1;
                    itemTotal.innerText = this.previousSibling.value * itemPrice;

                    subtotal.innerText = parseInt(subtotal.innerText) + this.previousSibling.value * itemPrice;

                    //更新storage
                    let itemId = this.parentNode.parentNode.parentNode.getAttribute('id');
                    let storageValue = storage.getItem(itemId);
                    let storageImage = storageValue.split('|')[0];
                    let storageName = storageValue.split('|')[1];
                    let storagePrice = parseInt(storageValue.split('|')[2]);
                    let storageQuantity = parseInt(storageValue.split('|')[3]);
                    storageQuantity++;
                    let item = storageImage + "|" + storageName + "|" + storagePrice + "|" + storageQuantity;
                    storage[itemId] = item;
                }
                else {
                    let itemPrice = this.parentNode.parentNode.previousSibling.getElementsByTagName('p')[1].innerText;
                    let itemTotal = this.parentNode.parentNode.parentNode.nextSibling.childNodes[0].children[1];

                    subtotal.innerText = parseInt(subtotal.innerText) - this.previousSibling.value * itemPrice;

                    this.previousSibling.value = parseInt(this.previousSibling.value) + 1;
                    itemTotal.innerText = this.previousSibling.value * itemPrice;

                    subtotal.innerText = parseInt(subtotal.innerText) + this.previousSibling.value * itemPrice;

                    //更新storage
                    let itemId = this.parentNode.parentNode.parentNode.previousSibling.getAttribute('id');
                    let storageValue = storage.getItem(itemId);
                    let storageImage = storageValue.split('|')[0];
                    let storageName = storageValue.split('|')[1];
                    let storagePrice = parseInt(storageValue.split('|')[2]);
                    let storageQuantity = parseInt(storageValue.split('|')[3]);
                    storageQuantity++;
                    let item = storageImage + "|" + storageName + "|" + storagePrice + "|" + storageQuantity;
                    storage[itemId] = item;
                }
            }
        }
        function quantityMinus() {
            if (parseInt(this.nextSibling.value) > parseInt(this.nextSibling.min)) {
                if (bodyTop >= 768) {
                    let itemPrice = this.parentNode.parentNode.previousSibling.getElementsByTagName('p')[0].innerText;
                    let itemTotal = this.parentNode.parentNode.nextSibling.getElementsByTagName('p')[0];

                    subtotal.innerText = parseInt(subtotal.innerText) - this.nextSibling.value * itemPrice;

                    this.nextSibling.value = this.nextSibling.value - 1;
                    itemTotal.innerText = this.nextSibling.value * itemPrice;

                    subtotal.innerText = parseInt(subtotal.innerText) + this.nextSibling.value * itemPrice;

                    //更新storage
                    let itemId = this.parentNode.parentNode.parentNode.getAttribute('id');
                    let storageValue = storage.getItem(itemId);
                    let storageImage = storageValue.split('|')[0];
                    let storageName = storageValue.split('|')[1];
                    let storagePrice = parseInt(storageValue.split('|')[2]);
                    let storageQuantity = parseInt(storageValue.split('|')[3]);
                    storageQuantity--;
                    let item = storageImage + "|" + storageName + "|" + storagePrice + "|" + storageQuantity;
                    storage[itemId] = item;
                }
                else {
                    let itemPrice = this.parentNode.parentNode.previousSibling.getElementsByTagName('p')[1].innerText;
                    let itemTotal = this.parentNode.parentNode.parentNode.nextSibling.childNodes[0].children[1];

                    subtotal.innerText = parseInt(subtotal.innerText) - this.nextSibling.value * itemPrice;

                    this.nextSibling.value = this.nextSibling.value - 1;
                    itemTotal.innerText = this.nextSibling.value * itemPrice;

                    subtotal.innerText = parseInt(subtotal.innerText) + this.nextSibling.value * itemPrice;

                    // //更新storage
                    let itemId = this.parentNode.parentNode.parentNode.previousSibling.getAttribute('id');
                    let storageValue = storage.getItem(itemId);
                    let storageImage = storageValue.split('|')[0];
                    let storageName = storageValue.split('|')[1];
                    let storagePrice = parseInt(storageValue.split('|')[2]);
                    let storageQuantity = parseInt(storageValue.split('|')[3]);
                    storageQuantity--;
                    let item = storageImage + "|" + storageName + "|" + storagePrice + "|" + storageQuantity;
                    storage[itemId] = item;
                }
            }
        }
        function checkQuantity() {
            if (parseInt(this.value) > 99) this.value = 99;
            else if (parseInt(this.value) < 1) this.value = 1;
        }
    }

    //--------------------購物車第二步回第一步--------------------
    function preView() {

        cartRWD = true;

        let view = document.getElementsByClassName('cart_view')[0];
        if (view.hasChildNodes()) {
            while (view.childNodes.length >= 1) {
                view.removeChild(view.firstChild);
            }
        }

        view.innerHTML = "<table id='cart_list' class='cart_list'><tr><th>商品圖片</th><th>商品名稱</th><th>單價</th><th>數量</th><th>金額</th><th>操作</th></tr><tr><td rowspan='6'><span>小計:</span><span id='subtotal'>0</span></td></tr></table>";

        let trade_stepoint = document.getElementsByClassName('trade_stepoint');
        let trade_step = document.getElementsByClassName('trade_step');

        for (let i = 0; i < trade_stepoint.length; i++) {
            if (trade_stepoint[i].classList.contains('active_step')) {
                if (bodyTop <= 767) {
                    trade_step[0].style.marginLeft = "0%";
                }
                trade_stepoint[i--].classList.remove('active_step');
                trade_stepoint[i].classList.add('active_step');
                break;
            }
        }

        document.getElementById('nextStep').innerText = "繼續購物";
        document.getElementById('prevStep').innerText = "進行結帳";

        cartList();

        document.getElementById('prevStep').onclick = function () {
            location.href = "buy.html";
        }
    }

    function complete() {
        let view = document.getElementsByClassName('cart_view')[0];
        if (view.hasChildNodes()) {
            while (view.childNodes.length >= 1) {
                view.removeChild(view.firstChild);
            }
        }

        let trade_stepoint = document.getElementsByClassName('trade_stepoint');
        let trade_step = document.getElementsByClassName('trade_step');

        for (let i = 0; i < trade_stepoint.length; i++) {
            if (trade_stepoint[i].classList.contains('active_step')) {
                if (bodyTop <= 767) {
                    trade_step[0].style.marginLeft = "-300%";
                }
                trade_stepoint[i++].classList.remove('active_step');
                trade_stepoint[i].classList.add('active_step');
                break;
            }
        }

        let operating = document.getElementsByClassName('cart_operating')[0];
        if (operating.hasChildNodes()) {
            while (operating.childNodes.length > 2) {
                operating.removeChild(operating.firstChild);
            }
        }

        var old_element = document.getElementById('nextStep')
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById('nextStep').innerText = "繼續購物";

        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            let hintBox = document.createElement('table');
            let hintTr = document.createElement('tr');
            let hintTh = document.createElement('th');
            let hint = document.createElement('p');

            hint.innerText = "處理中，請稍後";

            hint.style.fontSize = "24px";
            hint.style.fontWeight = "bold";
            hintBox.classList.add("cart_hint");

            hintTh.appendChild(hint);
            hintTr.appendChild(hintTh);
            hintBox.appendChild(hintTr);

            view.appendChild(hintBox);

            if (xhr.status == 200) {

                if (xhr.responseText != "點數不足") {
                    if (storage['P_List']) {
                        let itemString = storage['P_List'];
                        let items = itemString.substr(0, itemString.length - 1).split(',');
                        for (let key in items) {
                            storage.removeItem(items[key]);
                        }
                        storage.removeItem('P_List');
                    }
                    if (storage['G_List']) {
                        let itemString = storage['G_List'];
                        let items = itemString.substr(0, itemString.length - 1).split(',');
                        for (let key in items) {
                            storage.removeItem(items[key]);
                        }
                        storage.removeItem('G_List');
                    }
                    if (storage['D_List']) {
                        let itemString = storage['D_List'];
                        let items = itemString.substr(0, itemString.length - 1).split(',');
                        for (let key in items) {
                            storage.removeItem(items[key]);
                        }
                        storage.removeItem('D_List');
                    }
                    if (storage['sum_List']) {
                        storage.removeItem('sum_List');
                    }
                }

                setTimeout(() => {
                    hint.innerText = xhr.responseText;
                    // hint.innerText = '已下單完成，訂單編號為AAAAAAAAA';

                    document.getElementById('nextStep').onclick = function () {
                        location.href = "buy.html";
                    }
                }, 1000);


            } else {
                Swal.fire({
                    type: 'error',
                    text: '發生錯誤，請稍後重試',
                })
            }
        }

        var url = "php/orderProduct.php";
        xhr.open("Post", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        let P_List = "";
        let P_Info = "[";
        let G_List = "";
        let G_Info = "[";
        let D_List = "";
        let D_Info = "[";

        if (storage['P_List']) {
            let listString = storage['P_List'];
            let listItems = listString.substr(0, listString.length - 1).split(',');

            for (let key in listItems) {
                let itemInfo = storage.getItem(listItems[key]);

                if (key == listItems.length - 1) {
                    P_List += listItems[key];
                    P_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"}');
                }
                else {
                    P_List += listItems[key] + ",";
                    P_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"},');
                }
            }
            P_Info += "]";
        }

        if (storage['G_List']) {
            let listString = storage['G_List'];
            let listItems = listString.substr(0, listString.length - 1).split(',');

            for (let key in listItems) {
                let itemInfo = storage.getItem(listItems[key]);

                if (key == listItems.length - 1) {
                    G_List += listItems[key];
                    G_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"}');
                }
                else {
                    G_List += listItems[key] + ",";
                    G_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"},');
                }
            }
            G_Info += "]";
        }

        if (storage['D_List']) {
            let listString = storage['D_List'];
            let listItems = listString.substr(0, listString.length - 1).split(',');

            for (let key in listItems) {
                let itemInfo = storage.getItem(listItems[key]);

                if (key == listItems.length - 1) {
                    D_List += listItems[key];
                    D_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"}');
                }
                else {
                    D_List += listItems[key] + ",";
                    D_Info += ('{"' + listItems[key] + '":"' + itemInfo + '"},');
                }
            }
            D_Info += "]";
        }

        let mem_id = JSON.parse(storage.getItem('memberData')).mem_id;
        //送出資料
        var data_info = "mem_id=" + mem_id + "&recipient=" + storage['recipient'];
        if (storage['P_List']) {
            data_info += "&P_List=" + P_List;
            data_info += "&P_Info=" + P_Info;
        }
        if (storage['G_List']) {
            data_info += "&G_List=" + G_List;
            data_info += "&G_Info=" + G_Info;
        }
        if (storage['D_List']) {
            data_info += "&D_List=" + D_List;
            data_info += "&D_Info=" + D_Info;
        }
        data_info += `&subTotal=${subAllTotal}`;
        console.log(data_info)
        xhr.send(data_info);

    }

    //--------------------購物車第三步--------------------
    function confirm() {

        let recipient = "";
        setStorageData = false;
        recipient += document.getElementById('recipientName').value;
        recipient += "|";
        recipient += document.getElementById('recipientTel').value;
        recipient += "|";
        recipient += document.getElementById('recipientAddr').value;

        storage['recipient'] = recipient;

        if (storage['recipient']) {
            setStorageData = true;
            confirmData = storage.getItem('recipient');
        }

        let view = document.getElementsByClassName('cart_view')[0];

        if (view.hasChildNodes()) {
            while (view.childNodes.length >= 1) {
                view.removeChild(view.firstChild);
            }
        }

        let trade_stepoint = document.getElementsByClassName('trade_stepoint');
        let trade_step = document.getElementsByClassName('trade_step');

        for (let i = 0; i < trade_stepoint.length; i++) {
            if (trade_stepoint[i].classList.contains('active_step')) {
                if (bodyTop <= 767) {
                    trade_step[0].style.marginLeft = "-200%";
                }
                trade_stepoint[i++].classList.remove('active_step');
                trade_stepoint[i].classList.add('active_step');
                break;
            }
        }

        let confirmTable = document.createElement('table');
        let confirmTr = document.createElement('tr');
        let confirmTh = document.createElement('th');

        confirmTh.rowSpan = "5";
        confirmTh.innerText = "請確認收件人資料及訂單明細";

        confirmTr.appendChild(confirmTh);
        confirmTable.appendChild(confirmTr);

        let confirmNameTr = document.createElement('tr');
        let confirmNameTh = document.createElement('th');
        let confirmNameTd = document.createElement('td');
        let confirmName = document.createElement('p');

        confirmNameTh.innerText = "收件人姓名";
        confirmNameTh.rowSpan = "2";
        confirmName.id = "confirmName";
        confirmNameTd.rowSpan = "3";
        if (setStorageData) confirmName.innerText = confirmData.split('|')[0];

        confirmNameTd.appendChild(confirmName);
        confirmNameTr.appendChild(confirmNameTh);
        confirmNameTr.appendChild(confirmNameTd);
        confirmTable.appendChild(confirmNameTr);

        let confirmTelTr = document.createElement('tr');
        let confirmTelTh = document.createElement('th');
        let confirmTelTd = document.createElement('td');
        let confirmTel = document.createElement('p');

        confirmTelTh.innerText = "收件人電話";
        confirmTelTh.rowSpan = "2";
        confirmTel.id = 'confirmTel';
        confirmTelTd.rowSpan = "3";
        if (setStorageData) confirmTel.innerText = confirmData.split('|')[1];

        confirmTelTd.appendChild(confirmTel);
        confirmTelTr.appendChild(confirmTelTh);
        confirmTelTr.appendChild(confirmTelTd);
        confirmTable.appendChild(confirmTelTr);

        let confirmAddrTr = document.createElement('tr');
        let confirmAddrTh = document.createElement('th');
        let confirmAddrTd = document.createElement('td');
        let confirmAddr = document.createElement('p');

        confirmAddrTh.innerText = "收件人地址";
        confirmAddrTh.rowSpan = "2";
        confirmAddr.id = 'confirmAddr';
        confirmAddrTd.rowSpan = "3";
        if (setStorageData) confirmAddr.innerText = confirmData.split('|')[2];

        confirmAddrTd.appendChild(confirmAddr);
        confirmAddrTr.appendChild(confirmAddrTh);
        confirmAddrTr.appendChild(confirmAddrTd);
        confirmTable.appendChild(confirmAddrTr);

        confirmTable.classList.add('cart_confirm');

        let confirmItemTr = document.createElement('tr');
        let confirmItemTh = document.createElement('th');

        confirmItemTh.rowSpan = "5";
        confirmItemTh.innerText = "購物車清單";

        confirmItemTr.appendChild(confirmItemTh);
        confirmTable.appendChild(confirmItemTr);

        let confirmItemTT = document.createElement('tr');
        let confirmItemTh1 = document.createElement('th');
        let confirmItemTh2 = document.createElement('th');
        let confirmItemTh3 = document.createElement('th');
        let confirmItemTh4 = document.createElement('th');
        let confirmItemTh5 = document.createElement('th');

        confirmItemTh1.innerText = "圖片";
        confirmItemTh2.innerText = "名稱";
        confirmItemTh3.innerText = "單價";
        confirmItemTh4.innerText = "數量";
        confirmItemTh5.innerText = "小計";

        confirmItemTT.appendChild(confirmItemTh1);
        confirmItemTT.appendChild(confirmItemTh2);
        confirmItemTT.appendChild(confirmItemTh3);
        confirmItemTT.appendChild(confirmItemTh4);
        confirmItemTT.appendChild(confirmItemTh5);
        confirmTable.appendChild(confirmItemTT);

        if (storage['P_List']) {
            let itemString = storage['P_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);
            }
        }
        if (storage['G_List']) {
            let itemString = storage['G_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);
            }
        }
        if (storage['D_List']) {
            let itemString = storage['D_List'];
            let items = itemString.substr(0, itemString.length - 1).split(',');
            for (let key in items) {
                let itemInfo = storage.getItem(items[key]);
                createCartList(items[key], itemInfo);
            }
        }

        //-------------------購物車第三步重建商品清單----------------------
        function createCartList(itemId, itemValue = "") {
            let itemImage = itemValue.split('|')[0];
            let itemName = itemValue.split('|')[1];
            let itemPrice = parseInt(itemValue.split('|')[2]);
            let itemQuantity = parseInt(itemValue.split('|')[3]);

            //商品圖片
            let itemTr = document.createElement('tr');
            let tdImage = document.createElement('td');
            let image = document.createElement('img');

            image.src = itemImage;
            image.height = 45;
            image.width = 70;

            tdImage.appendChild(image);
            itemTr.appendChild(tdImage);

            //商品名稱
            let tdName = document.createElement('td');
            let name = document.createElement('p');

            name.innerText = itemName;

            tdName.appendChild(name);
            itemTr.appendChild(tdName);


            //商品單價
            let tdPrice = document.createElement('td');
            let price = document.createElement('p');

            price.innerText = itemPrice;

            tdPrice.appendChild(price);
            itemTr.appendChild(tdPrice);

            //商品數量
            let tdQuantity = document.createElement('td');
            let quantity = document.createElement('p');

            quantity.innerText = itemQuantity;

            tdQuantity.appendChild(quantity);
            itemTr.appendChild(tdQuantity);

            //商品金額
            let tdTotal = document.createElement('td');
            let total = document.createElement('p');

            total.innerText = itemQuantity * itemPrice;
            subAllTotal += parseInt(total.innerText);

            tdTotal.appendChild(total);
            itemTr.appendChild(tdTotal);

            confirmTable.appendChild(itemTr)
        }

        let itemTotalTr = document.createElement('tr');
        let itemTotalTh = document.createElement('th');
        let itemTotalTd = document.createElement('th');

        itemTotalTr.rowSpan = "5";
        itemTotalTh.innerText = "總計";
        itemTotalTd.innerText = subAllTotal;


        itemTotalTr.appendChild(itemTotalTh);
        itemTotalTr.appendChild(itemTotalTd);

        confirmTable.appendChild(itemTotalTr);

        view.appendChild(confirmTable);

        var old_element = document.getElementById('prevStep');
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        var old_element = document.getElementById('nextStep')
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById('nextStep').innerText = "確認下單";
        document.getElementById('prevStep').innerText = "重填資料";

        document.getElementById('nextStep').onclick = complete;
        document.getElementById('prevStep').onclick = reData;
    }

    //-------------------購物車第三步回第二步----------------------
    function reData() {
        let trade_stepoint = document.getElementsByClassName('trade_stepoint');

        for (let i = 0; i < trade_stepoint.length; i++) {
            if (trade_stepoint[i].classList.contains('active_step')) {
                if (bodyTop <= 767) {
                    let trade_step = document.getElementsByClassName('trade_step');
                    console.log(trade_step)
                    trade_step[0].style.marginLeft = "-100%";
                }
                trade_stepoint[i].classList.remove('active_step');
                i -= 2;
                trade_stepoint[i].classList.add('active_step');
                break;
            }
        }

        nextStep();
    }

    function nextStep() {
        let setStorageData = false;
        let recipientData = "";
        let view = document.getElementsByClassName('cart_view')[0];

        if (view.hasChildNodes()) {
            while (view.childNodes.length >= 1) {
                view.removeChild(view.firstChild);
            }
        }

        if (storage['recipient']) {
            setStorageData = true;
            recipientData = storage.getItem('recipient');
        }

        let recipient = document.createElement('table');
        let tableTr = document.createElement('tr');
        let tableTh = document.createElement('th');

        tableTh.rowSpan = "2";
        tableTh.innerText = "請填寫收件人資料";

        tableTr.appendChild(tableTh);
        recipient.appendChild(tableTr);

        let recipientNameTr = document.createElement('tr');
        let recipientNameTh = document.createElement('th');
        let recipientNameTd = document.createElement('td');
        let recipientName = document.createElement('input');

        recipientNameTh.innerText = "姓名";
        recipientName.type = "text";
        recipientName.id = "recipientName";
        if (setStorageData) recipientName.value = recipientData.split('|')[0];

        recipientNameTd.appendChild(recipientName);
        recipientNameTr.appendChild(recipientNameTh);
        recipientNameTr.appendChild(recipientNameTd);
        recipient.appendChild(recipientNameTr);

        let recipientTelTr = document.createElement('tr');
        let recipientTelTh = document.createElement('th');
        let recipientTelTd = document.createElement('td');
        let recipientTel = document.createElement('input');

        recipientTelTh.innerText = "電話";
        recipientTel.type = 'tel';
        recipientTel.id = 'recipientTel';
        if (setStorageData) recipientTel.value = recipientData.split('|')[1];

        recipientTelTd.appendChild(recipientTel);
        recipientTelTr.appendChild(recipientTelTh);
        recipientTelTr.appendChild(recipientTelTd);
        recipient.appendChild(recipientTelTr);

        let recipientAddrTr = document.createElement('tr');
        let recipientAddrTh = document.createElement('th');
        let recipientAddrTd = document.createElement('td');
        let recipientAddr = document.createElement('input');

        recipientAddrTh.innerText = "地址";
        recipientAddr.type = 'text';
        recipientAddr.id = 'recipientAddr';
        if (setStorageData) recipientAddr.value = recipientData.split('|')[2];

        recipientAddrTd.appendChild(recipientAddr);
        recipientAddrTr.appendChild(recipientAddrTh);
        recipientAddrTr.appendChild(recipientAddrTd);
        recipient.appendChild(recipientAddrTr);

        recipient.classList.add('cart_recipient');

        view.appendChild(recipient);

        let trade_stepoint = document.getElementsByClassName('trade_stepoint');
        let trade_step = document.getElementsByClassName('trade_step');

        for (let i = 0; i < trade_stepoint.length; i++) {
            if (trade_stepoint[i].classList.contains('active_step')) {
                if (bodyTop <= 767) {
                    trade_step[0].style.marginLeft = "-100%";
                }
                trade_stepoint[i++].classList.remove('active_step');
                trade_stepoint[i].classList.add('active_step');
                break;
            }
        }

        var old_element = document.getElementById('prevStep');
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        var old_element = document.getElementById('nextStep')
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById('nextStep').innerText = "填寫完畢";
        document.getElementById('prevStep').innerText = "修改商品";

        document.getElementById('nextStep').onclick = confirm;
        document.getElementById('prevStep').onclick = preView;
    }

    window.onload = function () {
        getScrollTop();
        cartList();
        document.getElementById('nextStep').onclick = function () {
            if (parseInt(document.getElementById('subtotal').innerText) == 0) {
                Swal.fire({
                    type: 'error',
                    text: '尚未選購商品',
                })
            }
            else if (!storage['member'] || storage['member'] == "") {
                let lightBox = document.querySelector('.lightBox');
                lightBox.style.display = 'block';
            }
            else {
                nextStep();
            }
        };
        document.getElementById('prevStep').onclick = function () {
            location.href = "buy.html";
        };
        window.addEventListener('resize', function () {
            getScrollTop();
            if (bodyTop >= 768) {
                let trade_step = document.getElementsByClassName('trade_step');
                trade_step[0].style.marginLeft = "0%";
            }
        }, false)
    }
    // document.getElementById('next_step').addEventListener('click',nextStep,false)

})();