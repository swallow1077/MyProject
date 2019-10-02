function init() {
    function carsCloseAlert(e) {
        if (e.target == document.getElementsByClassName('product_alert_bg')[0]) {
            document.getElementsByClassName('product_alert_bg')[0].style.display = 'none'
        } else if (e.target == document.querySelector('.car_alertclose')) {
            document.getElementsByClassName('product_alert_bg')[0].style.display = 'none'
        }
    }

    function carsOpenAlert() {
        document.getElementsByClassName('product_alert_bg')[0].style.display = 'block'
    }

    document.querySelector('.product_alert_bg').onclick = carsCloseAlert
    document.querySelector('.car_alertclose').onclick = carsCloseAlert
    document.querySelector('.cars_pie_img').onclick = carsOpenAlert
}

window.addEventListener('load', init)