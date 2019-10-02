var storage =  sessionStorage;
//從filterAdd.js這支的htmlStr+=`<a class='card_cart' id="P_${prods[i].prod_no}")>加入購物車 ->接過來


//購物車icon的數量變更
let prodCount=document.querySelector('.prodCount');
let prodCountRwd=document.querySelector('.prodCountRwd');

console.log("111111111",prodCount);
 let sum;
 let totalSum;
 
function findCartBtn(prodId){
    //一般商品的session storage list
    if(storage['P_List'] == null){
        storage['P_List'] = ''; 
    }

    //裝飾品的 session storage list
    if(storage['D_List'] == null){
        storage['D_List'] = ''; 
    }

    //to sum up 
    if(storage['sum_List'] == null){
        storage['sum_List'] = ''; 
    }



    console.log("prodInfo:",window.event.srcElement.firstElementChild.value)
    console.log("span:",window.event.srcElement.lastElementChild.value)
    
   
    prodInfo = window.event.srcElement.firstElementChild.value;
    prodInfoData = prodInfo.split("|");
    console.log(prodInfoData[prodInfoData.length - 1])
    console.log("prodId:",prodId,"prodInfo:",prodInfo);

    addItem(prodId,prodInfo);


}  


//商品資訊寫入session

//一般商品:
    // item+= "P_2";
    // item+= ",";
    // storage['P_List'] = item;
    // storage['P_2'] = "img/prod/prod_A02.png|頂瓜瓜|310|1";

//裝飾品:
    // item+= "D_2";
    //img/prod/eyeballchco .png|眼球巧克力|100|1
    // storage['D_List'] = item;
    // storage['D_2'] = "img/prod/prod_A02.png|頂瓜瓜|310|1";

function addItem(prodId,prodInfo){

    console.log(prodId , prodInfo)

    if(storage[prodId])
    {
        let item = storage[prodId].split("|");
        let num = parseInt(item[3]);
        num++;
        storage[prodId] = `${item[0]}|${item[1]}|${item[2]}|${num}`;
        console.log("111111---prodId:",storage[prodId])
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

    // if(storage['sum_List']=""){
    //     prodCount.style.setProperty('display','none');
    //     prodCountRwd.style.setProperty('display','none');

    // }

    storage['sum_List'] += prodId + ',';
    

    totalProd=storage['P_List'].substr(0,storage['P_List'].length-2).split(",");
    totalDeco=storage['D_List'].substr(0,storage['D_List'].length-2).split(",");
    
    //購物車產品數量計算
    totalSum=storage['sum_List'].substr(0,storage['sum_List'].length-2).split(",");
    sum=totalSum.length;

   
    prodCount.onload=addQty(sum);
    prodCountRwd.onload=addQty(sum)
   
   

    
}
    addQty(sum);
    
    console.log("storage['sum_List']:",totalSum);



// //購物車產品數量計算
function addQty(sum){
    // console.log("我進來了嗎??",addQty(sum))
    if(totalSum==''){
        sum=0;
        prodCount.innerText='1';
        prodCountRwd.innerText='1';
        prodCount.style.setProperty('display','none');
        prodCountRwd.style.setProperty('display','none');
    }
    totalSum=storage['sum_List'].substr(0,storage['sum_List'].length-2).split(",");
    sum=totalSum.length;
    // console.log("totalSum.length:",totalSum.length)
 
    
    console.log("產品加總個數:",sum);

    if(totalSum.length==1){
        sum=1;
        prodCount.style.setProperty('display','block');
        prodCountRwd.style.setProperty('display','block');
        prodCount.innerText='1';
        prodCountRwd.innerText='1';
        console.log(prodCount);
        if(totalSum.includes('')){
            prodCount.style.setProperty('display','none');
            prodCountRwd.style.setProperty('display','none');
        }
        
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

    }else if(totalSum.includes(this)){
        totalSum.splice(this);
    }
   

}
// console.log(checkOut(sum));


function checkOut(sum){
    console.log("--------------",sum);
    if(sum>=1){
        
        location.href = ('cart.html');
      
    }else if(sum=0){
        e?e.preventDefault():event.returnValue()=false;
        alert("尚未加入商品哦~");
    }
}    





    
    
    



    

 