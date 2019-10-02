create database IF NOT EXISTS sql_database;
use sql_database;
show tables;
select * from official_product;
INSERT INTO `official_product` (`prod_no`,`prod_name`,`base_no`,`ingr_no_1`,`ingr_no_2`,`deco_no_1`,`deco_no_2`,`prod_stat`,`prod_price`,`prod_desc`,`prod_img`,`prod_eva`,`prod_eva_count`) VALUES
(1,"宇治金時",2,1,1,1,1,"上架",210,"抹茶與紅豆的完美結合",'img/prod/pie.png',0,0);

#管理員 (原型)
create table employees ( 
emp_no int not null AUTO_INCREMENT , 
emp_id varchar(20) not null , 
emp_psw varchar(20) not null , 
emp_name varchar(10) not null , 
emp_stat char(2) not null default '在職' , 
permission char(1) not null default 0 ,
primary key ( emp_no )
);
#會員 (原型)
create table members ( 
mem_no int not null AUTO_INCREMENT , 
mem_id varchar(20) unique not null , 
mem_psw varchar(20) not null , 
mem_name varchar(10) not null , 
mem_tel varchar(10) not null , 
mem_email varchar(30) not null ,
mem_addr varchar(100) not null , 
mem_stat char(2) not null default '啟用' , 
mem_img varchar(100) default null , 
mem_point int not null default 0 ,
primary key ( mem_no )
);
#基底 (原型)
create table base ( 
base_no int not null AUTO_INCREMENT , 
base_name varchar(10) not null , 
base_img varchar(100) not null , 
base_stat char(2) not null default '上架' , 
base_price int not null , 
base_health_lv int not null default 0 , 
base_sweet_lv int not null default 0 , 
base_salty_lv int not null default 0 ,
primary key ( base_no )
);
select * from base;
INSERT INTO `base` (`base_name`,`base_stat`,`base_price`,`base_img`) VALUES
("南瓜","上架",300,'00');
#配料 (原型)

select * from official_product;
INSERT INTO `official_product` (`prod_name`,`base_no`,`ingr_no_1`,`ingr_no_2`,`deco_no_1`,`deco_no_2`,`prod_stat`,`prod_price`,`prod_desc`,`prod_img`,`prod_eva`,`prod_eva_count`) VALUES
('214',2,1,4,1,1,'上架',210,'抹茶+杏仁+鳳梨','img/cust/jp_pie.png',0,0);
#配料 (原型)
create table ingredients ( 
ingr_no int not null AUTO_INCREMENT , 
ingr_name varchar(10) not null , 
ingr_img varchar(100) not null , 
ingr_stat char(2) not null default '上架' , 
ingr_price int not null , 
ingr_health_lv int not null default 0 , 
ingr_sweet_lv int not null default 0 , 
ingr_salty_lv int not null default 0 ,
primary key ( ingr_no )
);
select * from ingredients;
INSERT INTO `ingredients` (`ingr_name`,`ingr_stat`,`ingr_price`,`ingr_img`) VALUES
("火腿","上架",60,'06');
#配料 (原型)

#裝飾品 (原型)
create table decoration ( 
deco_no int not null AUTO_INCREMENT , 
deco_name varchar(10) not null , 
deco_img varchar(100) not null , 
deco_stat char(2) not null default '上架' , 
deco_price int not null , 
deco_health_lv int not null default 0 , 
deco_sweet_lv int not null default 0 , 
deco_salty_lv int not null default 0 ,
primary key ( deco_no )
);
#胖卡活動 (原型!?)
create table car_event ( 
event_no int not null AUTO_INCREMENT , 
event_cdate date not null , 
event_edate date not null , 
event_text varchar(200) not null , 
event_slocation varchar(20) not null , 
event_elocation varchar(20) not null , 
primary key ( event_no )
);
#一般商品
drop table official_product;
select * from official_product;
create table official_product ( 
prod_no int not null AUTO_INCREMENT , 
prod_name varchar(20) not null , 
base_no int not null , #FK
ingr_no_1 int , #FK
ingr_no_2 int , #FK
deco_no_1 int , #FK
deco_no_2 int , #FK
prod_stat char(2) not null default '上架' , 
prod_price int not null , 
prod_desc varchar(50) not null , 
prod_img varchar(100) not null , 
prod_eva int not null default 0 , 
prod_eva_count int not null default 0 , 
primary key ( prod_no ) 
-- foreign key ( base_no ) references base( base_no ) ,
-- foreign key ( ingr_no_1 ) references ingredients( ingr_no ) , 
-- foreign key ( ingr_no_2 ) references ingredients( ingr_no ) ,
-- foreign key ( deco_no_1 ) references decoration( deco_no ) , 
-- foreign key ( deco_no_2 ) references decoration( deco_no )
);
#客製商品
create table custom_product ( 
cust_no int not null AUTO_INCREMENT , 
cust_name varchar(10) not null , 
mem_id varchar(20) not null , #FK
base_no int not null , #FK
ingr_no_1 int not null , #FK
ingr_no_2 int not null , #FK
deco_no_1 int , #FK
deco_no_2 int , #FK
cust_stat char(2) not null default '上架' , 
cust_price int not null , 
cust_img varchar(100) not null , 
like_qty int not null default 0 , 
primary key ( cust_no ) , 
foreign key ( mem_id ) references members( mem_id ) , 
foreign key ( base_no ) references base( base_no ) , 
foreign key ( ingr_no_1 ) references ingredients( ingr_no ) , 
foreign key ( ingr_no_2 ) references ingredients( ingr_no ) , 
foreign key ( deco_no_1 ) references decoration( deco_no ) , 
foreign key ( deco_no_2 ) references decoration( deco_no )
);
#許願池投票牆
create table wish_pool_vote (  
mem_id varchar(20) not null , #FK
cust_no int not null , #FK
primary key ( mem_id , cust_no ) ,
foreign key ( mem_id ) references members( mem_id ) ,
foreign key ( cust_no ) references custom_product( cust_no )
);
#客製化按讚紀錄
create table like_record ( 
mem_id varchar(20) not null , #FK
cust_no int not null , #FK
primary key ( mem_id , cust_no ) ,
foreign key ( mem_id ) references members( mem_id ) ,
foreign key ( cust_no ) references custom_product( cust_no )
);
#收藏清單 
drop table collect_list;
select * from collect_list;
create table collect_list ( 
mem_id varchar(20) not null , #FK 
prod_no int not null , #FK 
primary key ( mem_id , prod_no ) 
-- foreign key ( mem_id ) references members( mem_id ) ,
-- foreign key ( prod_no ) references official_product( prod_no )
);
#留言評價 
drop table message_comment;
create table message_comment ( 
msg_no int not null AUTO_INCREMENT , 
prod_no int not null , #FK
mem_id varchar(20) not null , #FK
msg_cdate date not null , 
mem_eva int not null , 
msg_text varchar(200) , 
primary key ( msg_no ) 
-- foreign key ( mem_id ) references members( mem_id ) ,
-- foreign key ( prod_no ) references official_product( prod_no )
);
#團購 ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
create table group_shopping (
grp_no int not null AUTO_INCREMENT , 
cust_no int not null , #FK
grp_stat char(3) not null default '進行中' , 
grp_cdate date not null , 
grp_condit char(2) not null default '日期' , #沒人數限制?
grp_edate date not null , 
grp_limt int , #存在意義?
grp_price int not null , 
grp_count int not null default 0 , 
primary key ( grp_no ) , 
foreign key ( cust_no ) references custom_product( cust_no )
);
#一般訂單
create table official_order ( 
offi_order_no int not null AUTO_INCREMENT , 
mem_id varchar(20) not null , #FK 
offi_order_stat char(3) not null default '已下單' , 
offi_order_cdate date not null , 
offi_order_compted date , 
reci_name varchar(10) not null , 
reci_tel varchar(10) not null , 
reci_addr varchar(100) not null , 
primary key ( offi_order_no ) , 
foreign key ( mem_id ) references members( mem_id )
);
#團購訂單
create table group_order ( 
grp_order_no int not null AUTO_INCREMENT , 
grp_no int not null , #FK
mem_id varchar(20) not null , #FK
grp_order_num int not null , 
grp_order_stat char(3) not null default '已下單' , 
grp_order_cdate date not null , 
grp_order_compted int , 
reci_name varchar(10) not null , 
reci_tel varchar(10) not null , 
reci_addr varchar(100) not null , 
primary key ( grp_order_no ) ,
foreign key ( grp_no ) references group_shopping( grp_no ) , 
foreign key ( mem_id ) references members( mem_id )
);
#訂單項目 (原型)
drop table official_order_list;
create table official_order_list ( 
offi_order_no int not null , #FK
prod_no int not null , #FK
order_num int , 
primary key ( offi_order_no , prod_no ) 
-- foreign key ( offi_order_no ) references official_order( offi_order_no ) , 
-- foreign key ( prod_no ) references official_product ( prod_no )
);
#評價檢舉 
drop table comment_report;
select * from comment_report;
create table comment_report ( 
rept_no int not null AUTO_INCREMENT , 
mem_id varchar(20) not null , #FK
msg_no int not null , #FK
rept_stat char(4) not null default '未處理' , 
primary key ( rept_no ) 
-- foreign key ( mem_id ) references members( mem_id ) , 
-- foreign key ( msg_no ) references message_comment( msg_no )
);
#機器人 (原型)
create table robot ( 
pr_no int not null AUTO_INCREMENT , 
keyword varchar(20) not null , 
quest varchar(100) not null , 
answer varchar(200) not null , 
primary key ( pr_no )
);

-- INSERT INTO `custom_product` (`cust_no`, `cust_name`, `mem_id`, `base_no`, `ingr_no_1`, `ingr_no_2`, `deco_no_1`, `deco_no_2`, `cust_price`, `cust_img`, `like_qty`) VALUES
-- (1, '黑眼派派', '', 1, 1, 1, 1, 1, 666, '/canves/用可能會變不見', 33);