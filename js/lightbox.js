function init() {
    let collects = document.querySelectorAll('.collect')
    for (let i = 0; i < collects.length; i++) {
        collects[i].addEventListener('click', showLightBox)
    }

    console.log(111)
    let cancelImg = document.querySelector('.btnLoginCancel img')
    cancelImg.onclick = hideLightBox
}

function showLightBox() {
    let lightBox = document.querySelector('.lightBox')
    lightBox.style.display = 'block'
    this.setAttribute('src', 'img/prod/collected.png')
    let btnLogin = $id('btnLogin')
    btnLogin.onclick = sendForm
    console.log(333)
}

function hideLightBox() {
    let lightBox = document.querySelector('.lightBox')
    lightBox.style.display = 'none'
    console.log(222)
}

function sendForm() {
    var memId = document.getElementById('memId').value
    var memPsw = document.getElementById('memPsw').value
    console.log(444)
        //使用Ajax回server端檢查是否已登入
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf('sysError') != -1) {
                alert('系統異常,請通知系統維護人員')
            } else if (xhr.responseText.indexOf('loginError') != -1) {
                alert('帳密錯誤')

                memId.value = ''
                memPsw.value = ''
                console.log(666)
            } else {
                //登入成功
                alert('登入成功!')
                let lightBox = document.querySelector('.lightBox')
                lightBox.style.display = 'none'
                lightBox.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                console.log(lightBox.style.backgroundColor)
                    //   sendToSession(xhr.responseText);
                console.log('xhr回傳的文字:', xhr.responseText)
                console.log(555)
                    //   let storage = sessionStorage;

                //   console.log(xhr.responseText);
                let dataObject = JSON.parse(xhr.responseText)
                storage['member'] = dataObject.mem_name
                storage['memberData'] = xhr.responseText
            }
        } else {
            alert(xhr.status)
        }
    }

    xhr.open('post', 'php/login/Login.php', true)
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

    var data_info = `memId=${memId}&memPsw=${memPsw}`
    xhr.send(data_info)
}

window.addEventListener('load', init)