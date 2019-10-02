var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var month_name = [
    // 'January',
    // 'Febrary',
    // 'March',
    // 'April',
    // 'May',
    // 'June',
    // 'July',
    // 'Auguest',
    // 'September',
    // 'October',
    // 'November',
    // 'December'
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
]
var holder = document.getElementById('days')
var prev = document.getElementById('prev')
var next = document.getElementById('next')
var ctitle = document.getElementById('calendar_title')
var cyear = document.getElementById('calendar_year')
var my_date = new Date() //現在的時間
var my_year = my_date.getFullYear() //今年
var my_month = my_date.getMonth() //今月
var my_day = my_date.getDate() //今日
var checkEvent
prev.onclick = function(e) {
    e.preventDefault()
    my_month--
    if (my_month < 0) {
        my_year--
        my_month = 11
    }
    refreshDate()
}
next.onclick = function(e) {
    e.preventDefault()
    my_month++
    if (my_month > 11) {
        my_year++
        my_month = 0
    }
    refreshDate()
}

function eventChange(e) {
    checkEvent = 0
    for (var i = 0; i < document.querySelectorAll('.calendar_activity').length; i++) {
        if (document.querySelectorAll('.calendar_activity')[i].classList.contains('focus') == true) {
            document.querySelectorAll('.calendar_activity')[i].classList.remove('focus')
        } else if (document.querySelectorAll('.calendar_activity')[i].classList.contains('todaybox') == true) {
            document.querySelectorAll('.calendar_activity')[i].classList.remove('todaybox')
        }
    }
    var obj = e ? e.target : event.srcElement
    obj.classList.add('focus')

    let checkDay = obj.innerHTML
    let CheckMonth = document.querySelector('#calendar_title').innerHTML
    let reg = /[\u4e00-\u9fa5]/g
    let checkNumMonth = CheckMonth.replace(reg, '')

    let CheckYear = document.querySelector('#calendar_year').innerHTML

    checkEvent = CheckYear + '-' + checkNumMonth + '-' + checkDay

    clickEventGet()
}

function carinfoChangeBackGround() {
    function rgba(Cmin, Cmax) {
        var r = Math.round(Math.random() * (Cmax - Cmin) + Cmin)
        var g = Math.round(Math.random() * (Cmax - Cmin) + Cmin)
        var b = Math.round(Math.random() * (Cmax - Cmin) + Cmin)
        var color = r + ',' + g + ',' + b
        return color
    }
    document.querySelector('.car_location').style.backgroundColor = 'rgba' + '(' + rgba(210, 255) + ')'
}

function refreshDate() {
    var str = ''
    var totalDay = daysMonth(my_month, my_year) //获取该月总天数
    var firstDay = dayStart(my_month, my_year) //获取该月第一天是星期几
    var myclass = 'calendar_activity'
    var date_color

    if (firstDay === 0) {
        for (var i = 0; i < 6; i++) {
            str += '<li></li>'
        }
    } else {
        for (var i = 1; i < firstDay; i++) {
            str += '<li></li>' //为起始日之前的日期创建空白节点
        }
    }

    for (var i = 1; i <= totalDay; i++) {
        if (
            (i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) ||
            my_year < my_date.getFullYear() ||
            (my_year == my_date.getFullYear() && my_month < my_date.getMonth())
        ) {
            date_color = 'lightgrey' //当该日期在今天之前时，以浅灰色字体显示
        } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
            date_color = 'green todaybox' //当该日期是当天时，以绿色背景突出显示
        } else {
            date_color = 'darkgrey' //当该日期在今后之后时，以深灰字体显示
        }
        str += `<li class="${myclass} ${date_color} li_style">${i}</li>`
    }
    str += `<div class="clearfix"></div>`
    holder.innerHTML = str //设置日期显示
    ctitle.innerHTML = month_name[my_month] //设置英文月份显示
    cyear.innerHTML = my_year //设置年份显示

    let clickDate = document.querySelectorAll('.calendar_activity')
    for (var i = 0; i < clickDate.length; i++) {
        clickDate[i].onclick = eventChange
    }
}

//获取某年某月第一天是星期几
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1)
    return tmpDate.getDay()
}

//计算某年是不是闰年，通过求年份除以4的余数即可
function daysMonth(month, year) {
    var tmp = year % 4
    if (tmp == 0) {
        return month_olympic[month] //2月為29天
    } else {
        return month_normal[month] //2月為28天
    }
}

function dateEventInfo(theServerAns) {
    if (theServerAns == '222') {
        document.querySelector('.local_info').innerHTML = '籌備中'
        document.querySelector('.car_days').innerHTML = '歡迎來電洽詢'
        document.querySelector('.car_localtitle').innerHTML = '連絡電話'
        document.querySelector('.car_locatinfo').innerHTML = '0988168168'
    } else {
        document.querySelector('.car_localtitle').innerHTML = '活動內容'
        theJson = JSON.parse(theServerAns)
        console.log(theJson)
        let hiddenText = document.querySelector('#carlocal_info_hidden').value
        if (hiddenText != theJson[0].car_eventName) {
            carinfoChangeBackGround()
        }

        if (document.getElementById('mapSrc').value != theJson[0].event_exactLocation) {
            document.getElementById('googlemap').src =
                'https://www.google.com/maps?output=embed&q=' + theJson[0].event_exactLocation
        }
        document.querySelector('.local_info').innerHTML =
            theJson[0].car_eventName + ' --- ' + '(' + theJson[0].event_exactLocation + ')'
        document.getElementById('carlocal_info_hidden').value = theJson[0].car_eventName
        document.querySelector('.car_days').innerHTML = theJson[0].event_cdate + '~' + theJson[0].event_edate
        document.querySelector('.car_locatinfo').innerHTML =
            theJson[0].event_text + '或來電：' + theJson[0].event_tel + '！'
        document.getElementById('mapSrc').value = theJson[0].event_exactLocation
    }
}

function clickEventGet() {
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
        if (xhr.status == 200) {
            dateEventInfo(xhr.responseText)
        } else {
            alert(xhr.status)
        }
    }
    var link = 'php/ajaxCalendar.php?checkEvent=' + checkEvent
    xhr.open('Get', link, true)
    xhr.send(null)
}

function backAlertArea(theBackInfo) {
    var theAlert = JSON.parse(theBackInfo)
    if ((theAlert[0].ingr_name = 'null')) {
        theAlert[0].ingr_name = '任選二樣'
    }
    document.querySelector('.carproduct_desc').innerHTML = theAlert[0].prod_name + '：' + theAlert[0].prod_desc
    document.getElementById('carpd_base').innerText = theAlert[0].base_name
    document.getElementById('carpd_ingr').innerText = theAlert[0].ingr_name
    document.getElementById('carpd_praise').innerText = theAlert[0].prod_eva
    document.getElementById('carpd_price').innerText = theAlert[0].prod_price + '元'
    document.getElementById('carpd_img').src = theAlert[0].prod_img
    document.getElementById('carpdinfo_img').src = theAlert[0].prod_img
}

function carAlertInfo() {
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
        if (xhr.status == 200) {
            backAlertArea(xhr.responseText)
        } else {
            alert(xhr.status)
        }
    }
    var link = 'php/carAlertInfo.php'
    xhr.open('Get', link, true)
    xhr.send(null)
}

window.addEventListener('load', refreshDate, false)
window.addEventListener('load', carAlertInfo, false)