function doFirst() {
    //讓篩選器按按鈕後可以跳出來,按X藏起來
    let filterBtn = document.querySelector('.filterBtn')
    let cancel = document.getElementsByClassName('cancel')[0]
    let cancelBtn = document.querySelector('.cancelBtn')
    filterBtn.onclick = showFilter
    cancel.onclick = hideRWDFilter
    cancelBtn.onclick = hideRWDFilter
        // console.log(filterBtn);
        // console.log(cancel);
        // console.log(cancelBtn);
}

function showFilter() {
    let filterForm = document.querySelector('.filterForm')
    filterForm.classList.remove('hide')
    filterForm.classList.add('show')
        // let flavor=document.querySelector('.filter_flavor');
    let base = document.querySelector('.filter_base')
    let ingredient = document.querySelector('.filter_ingredient')
    let deco = document.querySelector('.filter_deco')

    base.onclick = showItem
    ingredient.onclick = showItem
}

function hideRWDFilter() {
    //桌機畫面時要秀桌基版的filter
    let filterForm = document.querySelector('.filterForm')

    if (window.innerWidth <= 767) {
        filterForm.classList.remove('show')
        filterForm.classList.add('hide')
    } else if (window.innerWidth > 768) {
        filterForm.classList.remove('hide')
        filterForm.classList.add('show')
    }
}

//點開filter時，預設每一品項的li都是打開的，
//當選完一個品項的li時點該品項ul，則ul底下的li可以藏起來(方便看下一項目),並且點ul要藏起來的時候，右邊的箭頭會轉朝上

let opts = document.getElementsByClassName('filterbox')

function showItem() {
    let filterBaseTitle = document.querySelector('.filter_base >.filter_title')
    filterBaseTitle.addEventListener('click', hideBaseOpts)
    let filterIngrTitle = document.querySelector('.filter_ingredient >.filter_title')
    filterIngrTitle.addEventListener('click', hideIngrOpts)
}

function hideBaseOpts() {
    let baseOptBox = document.querySelector('.filter_base .boxes')
    baseOptBox.classList.toggle('hide')
        // console.log(baseOptBox);
    document.querySelectorAll('.arrow')[1].classList.toggle('rotate')
}

function hideIngrOpts() {
    let ingrOptBox = document.querySelector('.filter_ingredient .boxes')
    ingrOptBox.classList.toggle('hide')
        // console.log(ingrOptBox);
    document.querySelectorAll('.arrow')[2].classList.toggle('rotate')
}

//選到的li用不同顏色標示，並且雙擊可取消
for (let i = 3; i < 6; i++) {
    opts[i].addEventListener('click', changeColor)

    function changeColor(e) {
        e.target.classList.toggle('toggleColor')
    }
}

for (let i = 6; i < 12; i++) {
    opts[i].addEventListener('click', changeColor)

    function changeColor(e) {
        e.target.classList.toggle('toggleColor')
    }
}

//選完之後按套用btn即可動態新增商品,按取消btn則全部清除
let confirmBtn = document.querySelector('.confirmBtn')
confirmBtn.addEventListener('click', prodAdd)

function prodAdd() {
    let filterForm = document.querySelector('.filterForm')
    filterForm.classList.remove('show')
    filterForm.classList.add('hide')
    checkboxes = document.getElementsByName('prod')
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', userSelected)
        checkboxes[i].addEventListener('click', getProd)
    }
}

window.addEventListener('load', doFirst)