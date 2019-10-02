09-21 測試

# sixInOneProject

專題說明文件=>有問題麻煩發 issues

# G2 專題

---

如果有要起 json-server 可以問我在沒有 iis php 環境下還是可以做作業

---

## 時間進度流程

1. git 採取直接推 dev 模式
   使用方式在製作上 pull => coommit => push

2. 目前後台採取
   看有誰可以先認領功能就可以先做了

3. 前台畫面目前有做的功能
   小黑 => 購物車
   青 => 會員區域
   ０=> 客製化頁面呈現

4. 有畫面資料顯示可以參考
   vue 老師上課講的 vue => axios 呈現方式
   不建議用純 js 寫如果打回來是一整包的會比較難操作

---

SELECT w.`cust_no`, c.`cust_name` , count(\*) 'vote' FROM `wish_pool_vote` w JOIN `custom_product` c ON w.cust_no = c.cust_no GROUP BY w.cust_no ORDER BY vote DESC

引入倒數第二隻克制

\$dsn="mysql:host=localhost;port=3306;dbname=sql_dd102g2;charset=utf8"
