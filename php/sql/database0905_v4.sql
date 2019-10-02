create database IF NOT EXISTS sql_database ;

use sql_database;

# NOT NULL AUTO_INCREMENT;

#客製化按讚紀錄
create table like_record ( cust_no int not null primary key , mem_id varchar(20) );
#許願池檢舉
create table wish_pool_report ( rept_no int not null AUTO_INCREMENT primary key , mem_id varchar(20) , cust_no int , proc_stat char(2) not null default '啟用' );
#許願池投票牆
create table wish_pool_vote ( vot_no int not null AUTO_INCREMENT primary key , mem_id varchar(20) , cust_no int );
#裝飾品
create table deco_item ( deco_no int not null AUTO_INCREMENT primary key , deco_name varchar(20) not null , deco_img varchar(100) not null , deco_stat char(2) not null default '上架' , deco_price int not null , deco_bitter_lv int not null , deco_sweet_lv int not null , deco_salty_lv int not null );
#配料
create table ingredients ( ingr_no int not null AUTO_INCREMENT primary key , ingr_name varchar(20) not null , ingr_img int not null , ingr_stat char(2) not null default '上架' , ingr_price int not null , ingr_bitter_lv int not null , ingr_sweet_lv int not null , ingr__salty_lv int not null );
#機器人
create table robot ( pr_no int not null AUTO_INCREMENT primary key , keyword varchar(20) not null , quest varchar(100) not null , answer varchar(200) not null );
#收藏清單
-- create table collect_list ( mem_id varchar(20) primary key , prod_no int primary key );
create table collect_list ( mem_id varchar(20) , prod_no int );
#會員
create table member ( mem_no int not null AUTO_INCREMENT primary key , mem_id varchar(20) unique not null , mem_psw varchar(20) not null , mem_name varchar(10) not null , mem_tel varchar(10) not null , mem_addr varchar(100) not null , mem_stat char(2) not null default '啟用' , mem_img varchar(100) default null , mem_point int default 0 );
#客製商品
create table custom_product ( cust_no int not null AUTO_INCREMENT primary key , mem_no varchar(20) , base_no int , ingr_no_1 int not null , ingr_no_2 int not null , cust_img varchar(100) not null , cust_name varchar(10) not null , cust_price int not null, like_qty int , deco_item_no_1 int not null , deco_item_no_2 int not null );
#基底
create table base ( base_no int not null AUTO_INCREMENT primary key , base_name varchar(10) not null , base_img varchar(100) not null , base_stat char(2) not null default '上架' , base_price int not null , base_bitter_lv int not null , base_sweet_lv int not null , base_salty_lv int not null );
#留言評價
create table message_comment ( msg_no int not null AUTO_INCREMENT primary key , prod_no int , mem_id varchar(20) , msg_cdate date not null, mem_eva int not null , msg_text varchar(200) not null );
#一般商品
create table official_product ( prod_no int not null AUTO_INCREMENT primary key , prod_name varchar(20) not null , base_no int , ingr_no int , deco_no_1 int not null , deco_no_2 int not null , deco_stat char(2) not null default '上架' , prod_price int not null , prod_desc varchar(50) not null , prod_img varchar(100) not null , prod_eva int not null default 0 , prod_eva_count int not null default 0 );
#管理員
create table employee ( emp_no int not null AUTO_INCREMENT primary key , emp_id varchar(20) not null , emp_psw varchar(20) not null , emp_name varchar(10) not null , emp_stat char(2) not null default '在職' , permission varchar(1) not null default 0 );
#團購
create table group_shopping ( grp_no int not null AUTO_INCREMENT primary key , cust_no int , grp_stat char(2) not null default '上架' , grp_cdate date not null , grp_condit varchar(10) not null , grp_edate date not null , grp_limt int not null , grp_price int not null );
#團購訂單
create table group_order ( grp_no int primary key , grp_order_no int not null , mem_id int , grp_order_stat char(3) not null default '已出貨' , grp_order_cdate date not null , grp_order_compted int not null , reci_name varchar(6) not null , reci_tel varchar(10) not null , reci_addr varchar(100) not null , order_list_no int );
#訂單
create table official_order ( offi_order_no int not null AUTO_INCREMENT primary key , mem_id int , offi_order_stat char(3) not null default '已下單' , offi_order_cdate date , offi_order_compted date , reci_name varchar(6) not null , reci_tel varchar(10) not null , reci_addr varchar(100) not null , order_list_no int );
#訂單項目
create table order_list ( order_list_no int not null AUTO_INCREMENT primary key , order_no int not null , prod_no int , order_num int );
#評價檢舉
create table comment_report ( rept_no int not null AUTO_INCREMENT primary key , mem_id int , rept_stat int , msg_no int );
#胖卡活動
create table car_event ( event_no int not null AUTO_INCREMENT primary key , event_cdate date not null , event_edate date not null , event_text varchar(200) not null , event_locatio varchar(20) not null );



-- show tables;
-- select * from member;

insert into member 
( mem_id , mem_psw , mem_name , mem_tel , mem_addr )
value
( "apple" , "111" , "小明" , "0912345678" , "台北市信義區忠孝東路五段289號" ),
( "candy" , "222" , "小花" , "0912345678" , "台北市信義區忠孝東路五段289號" );

-- select * from member where mem_id = 'candy';
select * from member;