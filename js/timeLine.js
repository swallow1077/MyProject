$(function() {
    window.sr = ScrollReveal()

    sr.reveal('.js_fadeInLeft', {
        origin: 'left',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800
    })

    sr.reveal('.js_fadeInRight', {
        origin: 'right',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800
    })
})

function doSecond(theServerAns) {
    var theJson = JSON.parse(theServerAns)
    let dateNow = new Date()
    if ((dateNow.getMonth() + 1).toString.length == 1) {
        carNowMonth = '0' + (dateNow.getMonth() + 1)
    }
    let carNow = dateNow.getFullYear() + '-' + carNowMonth + '-' + dateNow.getDate()
    for (let i = 0; i < 5; i++) {
        if (
            Date.parse(carNow).valueOf() >= Date.parse(theJson[i].event_cdate).valueOf() &&
            Date.parse(carNow).valueOf() <= Date.parse(theJson[i].event_edate).valueOf()
        ) {
            let gg = theJson[i].event_exactLocation
            document.querySelector('.local_info').innerHTML =
                theJson[i].car_eventName + ' --- ' + '(' + theJson[i].event_exactLocation + ')'
            document.getElementById('carlocal_info_hidden').value = theJson[i].car_eventName
            document.querySelector('.car_days').innerHTML = theJson[i].event_cdate + '~' + theJson[i].event_edate
            document.querySelector('.car_locatinfo').innerHTML =
                theJson[i].event_text + '（胖卡車電話：' + theJson[0].event_tel + '）'
            document.getElementById('googlemap').src =
                'https://www.google.com/maps?output=embed&q=' + theJson[i].event_exactLocation
            document.getElementById('mapSrc').value = theJson[i].event_exactLocation
        }
    }

    for (let i = 0; i < 5; i++) {
        document.querySelectorAll('.story_title')[i].innerHTML = theJson[i].car_eventName
        document.querySelectorAll('.story_date')[i].innerHTML = theJson[i].event_cdate + '~' + theJson[i].event_edate
        document.querySelectorAll('.story_info')[i].innerHTML = theJson[i].event_text
    }
}

function doFirst() {
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
        if (xhr.status == 200) {
            doSecond(xhr.responseText)
        } else {
            alert(xhr.status)
        }
    }
    var link = 'php/carTimeline.php'
    xhr.open('Get', link, true)
    xhr.send(null)
}
window.addEventListener('load', doFirst, false)