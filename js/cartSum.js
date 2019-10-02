// var storage =  sessionStorage;
//從filterAdd.js這支的htmlStr+=`<a class='card_cart' id="P_${prods[i].prod_no}")>加入購物車 ->接過來


//購物車icon的數量變更
let prodCount=document.querySelector('.prodCount');
let prodCountRwd=document.querySelector('.prodCountRwd');

console.log("111111111",prodCount);
 let sum;
 


function addItem(prodId,prodInfo){

    console.log(prodId , prodInfo)

    if(storage[prodId])
    {
        let item = storage[prodId].split("|");
        let num = parseInt(item[3]);
        num++;
        storage[prodId] = `${item[0]}|${item[1]}|${item[2]}|${num}`;
    }
    else{
        if(prodId.match('P_')){
            storage['P_List'] += prodId + ',';
            storage[prodId] = prodInfo;
        }else if(prodId.match('D_')){
            storage['D_List'] += prodId + ',';
            storage[prodId] = prodInfo;
        }
    }

    

    storage['sum_List'] += prodId + ',';
    console.log("storage['sum_List']:",storage['sum_List'])
    

    totalProd=storage['P_List'].substr(0,storage['P_List'].length-2).split(",");
    totalDeco=storage['D_List'].substr(0,storage['D_List'].length-2).split(",");
    
    //購物車產品數量計算
    totalSum=storage['sum_List'].substr(0,storage['sum_List'].length-2).split(",");
    sum=totalSum.length;

    prodCount.onload=addQty(sum);
    prodCountRwd.onload=addQty(sum)

    
}
    addQty(sum);
    console.log("sum11111:",sum);



// //購物車產品數量計算
function addQty(sum){
    totalSum=storage['sum_List'].substr(0,storage['sum_List'].length-2).split(",");
    sum=totalSum.length;
    
    console.log("產品加總個數:",sum);

    if(!totalSum||totalSum.length==0){
        sum=0;
    }else if(totalSum.length>=1){
        prodCount.style.setProperty('display','block');
        prodCountRwd.style.setProperty('display','block');
        prodCount.innerText=sum;
        prodCountRwd.innerText=sum;
        let goCartShow=document.querySelector("#goCartShow a");
        console.log("購物車icon:",goCartShow);
        // e?e.preventDefault():event.returnValue()=false;
        goCartShow.addEventListener("click", function(){
            checkOut(sum);
        });

    }
    //購物車數量累加
    // if(prodId.search(this)!==-1){
        
    // }


}
console.log(checkOut(sum));


function checkOut(sum){
    console.log("--------------",sum);
    if(sum>=1){
        
        location.href = ('cart.html');
      
    }else if(sum=0){
        e?e.preventDefault():event.returnValue()=false;
        alert("尚未加入商品哦~");
    }
}    






    
    
    



    

 