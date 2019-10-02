function $id(id) {
    return document.getElementById(id);
};

(function () {
    //會員
    let memName = document.querySelector('#memName');
    //帳號
    let memId = document.querySelector('#memId');
    //密碼
    let memPsw = document.querySelector('#memPsw');
    //取消燈箱
    let btnCancel = document.querySelector('#btnLoginCancel');
    //選到燈箱區域
    let lightBox = document.querySelector('.lightBox');
    //登入按鈕
    let btnLogin = document.querySelector('#btnLogin');
    //登入狀態
    let spanLogin = document.querySelector('#spanLogin');
    let spanLoginRwd = document.querySelector('#spanLoginRwd');

    //登出按鈕
    let btnloglout = document.querySelector('#btnloglout');
    let btnlogloutRwd = document.querySelector('#btnlogloutRwd');

    



    // 顯示登入燈箱======================================
    function showLoginForm() {
        //檢查登入bar面版上 spanLogin 的字是登入或登出
        //如果是登入，就顯示登入用的燈箱(lightBox)
        console.log($id('spanLoginText').innerText);
        if ($id('spanLoginText').innerText == '登入') { //登出狀態
            lightBox.style.display = 'block';
            console.log(111)
        } else {
            lightBox.style.display = 'none';
            spanLogin.href = "member.php";
            spanLoginRwd.href = "member.php";
            console.log(222)
        }
    } //showLoginForm

    // 顯示註冊燈箱========================================
    function showsignBox() {
        lightBox.style.display = 'none';
        var sign_box = document.getElementById('sign_box');
        sign_box.style.display = "block";
    }
    // 關閉註冊燈箱========================================
    function closesignBox() {
        var sign_box = document.getElementById('sign_box');
        sign_box.style.display = "none";
    }
    //===========================================//
    //             這是登入程式                    //
    //===========================================//
    function sendForm() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                if (xhr.responseText.indexOf('sysError') != -1) {
                    // console.log('aa');
                    alert('系統異常,請通知系統維護人員');
                } else if (xhr.responseText.indexOf('loginError') != -1) {
                    alert('帳密錯誤');
                    memId.value = '';
                    memPsw.value = '';
                } else { //登入成功顯示“登出”
                    alert("登入成功!");
                    $id('spanLoginText').innerText = '登出';//判斷登出入文字是否存在的隱藏標籤
                    lightBox.style.display = 'none';

                    //navbar會員專區左邊出現登出文字
                    $id('btnloglout').innerText = '登出';
                    $id("btnloglout").style.cursor = 'pointer';
                    $id('btnlogloutRwd').innerText = '登出';
                    $id("btnlogloutRwd").style.cursor = 'pointer';

                    let storage = sessionStorage;

                    // console.log(xhr.responseText);
                    let dataObject = JSON.parse(xhr.responseText);
                    storage['member'] = dataObject.mem_id;
                    storage['memberData'] = xhr.responseText;
                }
            } else {
                alert(xhr.status);
            }
        };
        xhr.open('post', 'php/login/Login.php', true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        var data_info = `memId=${memId.value}&memPsw=${memPsw.value}`;
        // console.log(data_info);
        xhr.send(data_info);
    }


    //===========================================//
    //             這是登出程式                    //
    //===========================================//
    function logout() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {

            location.reload();
            btnloglout.innerHTML = "&nbsp";
            btnloglout.style.cursor = 'auto';
            btnlogloutRwd.innerHTML = "&nbsp";
            btnlogloutRwd.style.cursor = 'auto';
            $id('spanLoginText').innerText = '登入';//登出狀態

            let storage = sessionStorage;
            storage['member'] = '';
            storage['memberData'] = '';
            memId.value = '';
            memPsw.value = '';

        }
        xhr.open("get", "php/login/Logout.php", true);
        xhr.send(null);
    }

    //===========================================//
    //             這是註冊程式                    //
    //===========================================//

    // --檢查註冊驗證----------------------------------
    function register() {
        // alert("ok");
        var memberId = $id("memId2"); //帳號
        var password = $id("memPsw2");
        var confirmPsw = $id("confirmPsw");
        var email = $id("mem_email2");

        console.log(memberId.value);
        if (memberId.value == "") {
            alert("請填寫帳號");
            memberId.focus();
            return;
        }

        if (memberId.value.length < 2) { //檢查帳號不得低於2碼
            alert("帳號不得低於2碼");
            memberId.focus();
            return;
        }

        if (password.value == "") {
            alert("請填寫密碼");
            password.select();
            return;
        }

        if (password.value.length < 4) { //檢查密碼不得低於4碼
            alert("密碼不得低於4碼");
            password.select();
            return;
        }

        if (confirmPsw.value == "") {
            alert("請填寫確認密碼");
            confirmPsw.select();
            return;
        }

        if (confirmPsw.value.length < 4) {
            alert("確認密碼不得低於4碼");
            confirmPsw.select();
            return;
        }

        if (password.value != confirmPsw.value) {
            alert("密碼與確認密碼不符");
            confirmPsw.select();
            return;
        }

        if (email.value == "") {
            alert("請填寫email");
            email.focus();
            return;
        }

        if (!validateEmail(email.value)) {
            alert("請填寫正確的email格式");
            email.focus();
            return;
        }
        //正確就寫入資料庫
        addmember();
    }

    // --偵測帳號是否有重複------------------------------
    function checkmemID() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log("onload : ", xhr.readyState);
            if (xhr.status == 200) {
                if (xhr.responseText == "error") {
                    alert(xhr.responseText);
                } else {
                    document.getElementById("idMsg").innerHTML = xhr.responseText;
                }
            } else {
                alert(xhr.status);
            }
        }
        //設定好所要連結的程式
        var url = "php/login/checkmemID.php";
        xhr.open("post", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //送出資料
        var memId2 = document.getElementById("memId2");
        // var data_info = `memId=${memId.value}&memPsw=${memPsw.value}`;
        var data_info = `memId2=${memId2.value}`;
        xhr.send(data_info);
        console.log(data_info);
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --註冊寫入資料庫----------------------------------
    function addmember() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.responseText == "error") {
                    alert(xhr.responseText);
                }
                else {
                    alert("註冊成功");
                    //關閉燈箱，並將註冊表單上的資料清空
                    var formRegister = document.getElementById('sign_box');
                    formRegister.style.display = "none";
                    document.getElementById('memId2').value = "";
                    document.getElementById('memPsw2').value = "";
                    document.getElementById('confirmPsw').value = "";
                    document.getElementById('mem_name2').value = "";
                    document.getElementById('mem_email2').value = "";
                }

            } else {
                alert(xhr.status);
            }
        }

        var dataObj = {};
        dataObj.mem_id = $id("memId2").value;
        dataObj.mem_psw = $id("memPsw2").value;
        dataObj.mem_email = $id("mem_email2").value;
        dataObj.mem_name = $id("mem_name2").value;
        console.log(dataObj);

        var data_info = "dataInfo=" + JSON.stringify(dataObj);
        xhr.open('post', 'php/login/register.php', true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);
    }


    //----------------------------檢查使用者是否已登入
    // function getLoginInfo() {
    //   var xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     if (xhr.status == 200) {
    //       if (xhr.responseText.indexOf('notLogin') == -1) { //已登入
    //         // memName.innerText = xhr.responseText;
    //         $id('spanLoginText').innerText = '登出';
    //       }
    //     } else {
    //       alert(xhr.status);
    //     }
    //   };
    //   xhr.open('get', 'php/login/getLoginInfo.php', true);
    //   xhr.send(null);
    // }

    //將登入表單上的資料清空，並將燈箱隱藏起來
    function cancelLoginHandler() {
        memId.value = '';
        memPsw.value = '';
        lightBox.style.display = 'none';
    }


    //註冊事件發生
    window.addEventListener(
        'load',
        () => {
            let storage = sessionStorage;
            spanLogin.onclick = showLoginForm; //顯示登入燈箱
            spanLoginRwd.onclick = showLoginForm; //顯示登入燈箱


            if (storage['member']) { //登入的狀態//
                $id('spanLoginText').innerText = '登出';//判斷登出入文字是否存在的隱藏標籤
                lightBox.style.display = 'none';
                spanLogin.style.color = '#f33';
                spanLoginRwd.style.color = '#f33';


                //navbar會員專區左邊出現登出文字
                $id('btnloglout').innerText = '登出';
                $id("btnloglout").style.cursor = 'pointer';
                btnloglout.onclick = logout;
                $id('btnlogloutRwd').innerText = '登出';
                $id("btnlogloutRwd").style.cursor = 'pointer';
                btnlogloutRwd.onclick = logout;
            }
            else { //登出的狀態//
                storage['memberData'] = '';
                btnLogin.onclick = sendForm; //登入
                btnCancel.onclick = cancelLoginHandler;

                // -----註冊行為-------------------------------------------------
                $id("register").onclick = showsignBox; //點擊顯示註冊燈箱
                $id("btnSignCancel").onclick = closesignBox; //點擊關閉註冊燈箱
                $id("btn_register").onclick = register; //點擊驗證註冊
                $id("btn_sign_check").onclick = checkmemID; //點擊檢查帳號

            }

        },
        false,
    );
})();
