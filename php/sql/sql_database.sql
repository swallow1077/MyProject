-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 
-- 伺服器版本： 8.0.16
-- PHP 版本： 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `sql_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `base`
--

CREATE TABLE `base` (
  `base_no` int(11) NOT NULL,
  `base_name` varchar(10) NOT NULL,
  `base_img` varchar(100) NOT NULL,
  `base_stat` char(2) NOT NULL DEFAULT '上架',
  `base_price` int(11) NOT NULL,
  `base_health_lv` int(11) NOT NULL DEFAULT '0',
  `base_sweet_lv` int(11) NOT NULL DEFAULT '0',
  `base_salty_lv` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `base`
--

INSERT INTO `base` (`base_no`, `base_name`, `base_img`, `base_stat`, `base_price`, `base_health_lv`, `base_sweet_lv`, `base_salty_lv`) VALUES
(1, '基底的蛋', 'img/cust/small/egg.png', '上架', 666, 31, 41, 51),
(2, '基底火腿', 'img/cust/small/ham.png', '上架', 333, 66, 76, 86);

-- --------------------------------------------------------

--
-- 資料表結構 `car_event`
--

CREATE TABLE `car_event` (
  `event_no` int(11) NOT NULL,
  `event_cdate` date NOT NULL,
  `event_edate` date NOT NULL,
  `event_text` varchar(200) NOT NULL,
  `event_slocation` varchar(20) NOT NULL,
  `event_elocation` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `car_event`
--

INSERT INTO `car_event` (`event_no`, `event_cdate`, `event_edate`, `event_text`, `event_slocation`, `event_elocation`) VALUES
(1, '2020-01-01', '2020-01-31', '前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財前端發大財', '中壢', '台北'),
(2, '2019-10-01', '2019-10-31', '派對發大財派對發大財派對發大財派對發大財派對發大財派對發大財派對發大財派對發大財派對發大財派對發大財', '高雄', '台北');

-- --------------------------------------------------------

--
-- 資料表結構 `collect_list`
--

CREATE TABLE `collect_list` (
  `mem_id` varchar(20) NOT NULL,
  `prod_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `comment_report`
--

CREATE TABLE `comment_report` (
  `rept_no` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `msg_no` int(11) NOT NULL,
  `rept_stat` char(4) NOT NULL DEFAULT '未處理'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `custom_product`
--

CREATE TABLE `custom_product` (
  `cust_no` int(11) NOT NULL,
  `cust_name` varchar(10) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `base_no` int(11) NOT NULL,
  `ingr_no_1` int(11) NOT NULL,
  `ingr_no_2` int(11) NOT NULL,
  `deco_no_1` int(11) DEFAULT NULL,
  `deco_no_2` int(11) DEFAULT NULL,
  `cust_stat` char(2) NOT NULL DEFAULT '上架',
  `cust_price` int(11) NOT NULL,
  `cust_img` varchar(100) NOT NULL,
  `like_qty` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `custom_product`
--

INSERT INTO `custom_product` (`cust_no`, `cust_name`, `mem_id`, `base_no`, `ingr_no_1`, `ingr_no_2`, `deco_no_1`, `deco_no_2`, `cust_stat`, `cust_price`, `cust_img`, `like_qty`) VALUES
(1, '黑眼派派', 'apple', 1, 1, 1, 1, 1, '上架', 666, '/canves/用可能會變不見', 33),
(2, '白眼派派', 'candy', 2, 2, 2, 2, 2, '上架', 333, '/canvans專用', 555);

-- --------------------------------------------------------

--
-- 資料表結構 `decoration`
--

CREATE TABLE `decoration` (
  `deco_no` int(11) NOT NULL,
  `deco_name` varchar(10) NOT NULL,
  `deco_img` varchar(100) NOT NULL,
  `deco_stat` char(2) NOT NULL DEFAULT '上架',
  `deco_price` int(11) NOT NULL,
  `deco_health_lv` int(11) NOT NULL DEFAULT '0',
  `deco_sweet_lv` int(11) NOT NULL DEFAULT '0',
  `deco_salty_lv` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `decoration`
--

INSERT INTO `decoration` (`deco_no`, `deco_name`, `deco_img`, `deco_stat`, `deco_price`, `deco_health_lv`, `deco_sweet_lv`, `deco_salty_lv`) VALUES
(1, '手指餅乾', 'img/prod/fingercookie.png', '上架', 666, 22, 22, 22),
(2, '毛毛蟲糖', 'img/prod/wormcandy.png', '上架', 44, 41, 44, 46);

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

CREATE TABLE `employee` (
  `emp_no` int(11) NOT NULL,
  `emp_id` varchar(20) NOT NULL,
  `emp_psw` varchar(20) NOT NULL,
  `emp_name` varchar(10) NOT NULL,
  `emp_stat` char(2) NOT NULL DEFAULT '在職',
  `permission` char(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `employee`
--

INSERT INTO `employee` (`emp_no`, `emp_id`, `emp_psw`, `emp_name`, `emp_stat`, `permission`) VALUES
(1, 'tibame01', 'tibame01', '粽寶貝', '在職', '0'),
(2, 'tibame02', 'tibame02', '粽88', '在職', '0');

-- --------------------------------------------------------

--
-- 資料表結構 `group_order`
--

CREATE TABLE `group_order` (
  `grp_order_no` int(11) NOT NULL,
  `grp_no` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `grp_order_num` int(11) NOT NULL,
  `grp_order_stat` char(3) NOT NULL DEFAULT '已下單',
  `grp_order_cdate` date NOT NULL,
  `grp_order_compted` int(11) DEFAULT NULL,
  `reci_name` varchar(10) NOT NULL,
  `reci_tel` varchar(10) NOT NULL,
  `reci_addr` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `group_order`
--

INSERT INTO `group_order` (`grp_order_no`, `grp_no`, `mem_id`, `grp_order_num`, `grp_order_stat`, `grp_order_cdate`, `grp_order_compted`, `reci_name`, `reci_tel`, `reci_addr`) VALUES
(1, 2, 'apple', 66, '已出貨', '2019-09-30', NULL, '林哪位', '0977111222', '台中市中區中山路42號'),
(2, 1, 'apple', 33, '已出貨', '2019-09-30', NULL, '林哪位', '0977111222', '台中市中區中山路42號'),
(3, 1, 'candy', 67, '已出貨', '2019-09-22', NULL, '莓有這', '0999111333', '台中市中區中山路47號');

-- --------------------------------------------------------

--
-- 資料表結構 `group_shopping`
--

CREATE TABLE `group_shopping` (
  `grp_no` int(11) NOT NULL,
  `cust_no` int(11) NOT NULL,
  `grp_stat` char(3) NOT NULL DEFAULT '進行中',
  `grp_cdate` date NOT NULL,
  `grp_condit` char(2) NOT NULL DEFAULT '日期',
  `grp_edate` date NOT NULL,
  `grp_limt` int(11) DEFAULT NULL,
  `grp_price` int(11) NOT NULL,
  `grp_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `group_shopping`
--

INSERT INTO `group_shopping` (`grp_no`, `cust_no`, `grp_stat`, `grp_cdate`, `grp_condit`, `grp_edate`, `grp_limt`, `grp_price`, `grp_count`) VALUES
(1, 2, '上架', '2019-10-01', '日期', '2019-10-31', 50, 99, 30),
(2, 1, '上架', '2019-10-08', '日期', '2019-10-30', 40, 88, 40);

-- --------------------------------------------------------

--
-- 資料表結構 `ingredients`
--

CREATE TABLE `ingredients` (
  `ingr_no` int(11) NOT NULL,
  `ingr_name` varchar(10) NOT NULL,
  `ingr_img` varchar(100) NOT NULL,
  `ingr_stat` char(2) NOT NULL DEFAULT '上架',
  `ingr_price` int(11) NOT NULL,
  `ingr_health_lv` int(11) NOT NULL DEFAULT '0',
  `ingr_sweet_lv` int(11) NOT NULL DEFAULT '0',
  `ingr_salty_lv` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `ingredients`
--

INSERT INTO `ingredients` (`ingr_no`, `ingr_name`, `ingr_img`, `ingr_stat`, `ingr_price`, `ingr_health_lv`, `ingr_sweet_lv`, `ingr_salty_lv`) VALUES
(1, '鳳梨', 'img/cust/small/pineapple.png', '上架', 44, 42, 68, 65),
(2, '青蔥', 'img/cust/small/springOnion.png', '上架', 11, 41, 46, 48);

-- --------------------------------------------------------

--
-- 資料表結構 `like_record`
--

CREATE TABLE `like_record` (
  `mem_id` varchar(20) NOT NULL,
  `cust_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `like_record`
--

INSERT INTO `like_record` (`mem_id`, `cust_no`) VALUES
('apple', 1),
('candy', 1),
('candy', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `mem_no` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `mem_psw` varchar(20) NOT NULL,
  `mem_name` varchar(10) NOT NULL,
  `mem_tel` varchar(10) NOT NULL,
  `mem_email` varchar(30) NOT NULL,
  `mem_addr` varchar(100) NOT NULL,
  `mem_stat` char(2) NOT NULL DEFAULT '啟用',
  `mem_img` varchar(100) DEFAULT NULL,
  `mem_point` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`mem_no`, `mem_id`, `mem_psw`, `mem_name`, `mem_tel`, `mem_email`, `mem_addr`, `mem_stat`, `mem_img`, `mem_point`) VALUES
(1, 'apple', '111', '小明', '0912345678', 'aa@a.com', '台北市信義區忠孝東路五段289號', '啟用', NULL, 0),
(2, 'candy', '222', '小花', '0912345678', 'aa@a.com', '台北市信義區忠孝東路五段289號', '啟用', NULL, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `message_comment`
--

CREATE TABLE `message_comment` (
  `msg_no` int(11) NOT NULL,
  `prod_no` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `msg_cdate` date NOT NULL,
  `mem_eva` int(11) NOT NULL,
  `msg_text` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `message_comment`
--

INSERT INTO `message_comment` (`msg_no`, `prod_no`, `mem_id`, `msg_cdate`, `mem_eva`, `msg_text`) VALUES
(6, 1, 'apple', '2019-10-25', 0, '難吃'),
(7, 1, 'candy', '2019-10-26', 2, '難吃+1'),
(8, 2, 'apple', '2019-10-31', 5, '好吃好吃');

-- --------------------------------------------------------

--
-- 資料表結構 `official_order`
--

CREATE TABLE `official_order` (
  `offi_order_no` int(11) NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  `offi_order_stat` char(3) NOT NULL DEFAULT '已下單',
  `offi_order_cdate` date NOT NULL,
  `offi_order_compted` date DEFAULT NULL,
  `reci_name` varchar(10) NOT NULL,
  `reci_tel` varchar(10) NOT NULL,
  `reci_addr` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `official_order`
--

INSERT INTO `official_order` (`offi_order_no`, `mem_id`, `offi_order_stat`, `offi_order_cdate`, `offi_order_compted`, `reci_name`, `reci_tel`, `reci_addr`) VALUES
(1, 'apple', '已下單', '2019-09-17', '2019-09-26', '粽寶貝', '0988666333', '台中市西區西屯路999號'),
(2, 'candy', '已下單', '2019-09-24', '2019-09-27', '粽大尾', '0987878787', '台中市西區西屯路1000號');

-- --------------------------------------------------------

--
-- 資料表結構 `official_order_list`
--

CREATE TABLE `official_order_list` (
  `offi_order_no` int(11) NOT NULL,
  `prod_no` int(11) NOT NULL,
  `order_num` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `official_order_list`
--

INSERT INTO `official_order_list` (`offi_order_no`, `prod_no`, `order_num`) VALUES
(1, 1, 20),
(1, 2, 10),
(2, 2, 5);

-- --------------------------------------------------------

--
-- 資料表結構 `official_product`
--

CREATE TABLE `official_product` (
  `prod_no` int(11) NOT NULL,
  `prod_name` varchar(20) NOT NULL,
  `base_no` int(11) NOT NULL,
  `ingr_no_1` int(11) DEFAULT NULL,
  `ingr_no_2` int(11) DEFAULT NULL,
  `deco_no_1` int(11) DEFAULT NULL,
  `deco_no_2` int(11) DEFAULT NULL,
  `prod_stat` char(2) NOT NULL DEFAULT '上架',
  `prod_price` int(11) NOT NULL,
  `prod_desc` varchar(50) NOT NULL,
  `prod_img` varchar(100) NOT NULL,
  `prod_eva` int(11) NOT NULL DEFAULT '0',
  `prod_eva_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `official_product`
--

INSERT INTO `official_product` (`prod_no`, `prod_name`, `base_no`, `ingr_no_1`, `ingr_no_2`, `deco_no_1`, `deco_no_2`, `prod_stat`, `prod_price`, `prod_desc`, `prod_img`, `prod_eva`, `prod_eva_count`) VALUES
(1, '素顏派', 1, 2, NULL, 2, 2, '上架', 555, '好吃又營養的素顏派', 'img/product/product.png', 66, 666),
(2, '網美派', 2, 1, NULL, 1, 1, '上架', 688, '漂亮不營養的的網美派', 'img/product/product.png', 99, 333);

-- --------------------------------------------------------

--
-- 資料表結構 `robot`
--

CREATE TABLE `robot` (
  `pr_no` int(11) NOT NULL,
  `keyword` varchar(20) NOT NULL,
  `quest` varchar(100) NOT NULL,
  `answer` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `robot`
--

INSERT INTO `robot` (`pr_no`, `keyword`, `quest`, `answer`) VALUES
(1, '發大財', '請問你想發大財嗎', '我的前端發大財了'),
(2, 'gulp', '請問你用gulp開發嗎', '不我用webpack666');

-- --------------------------------------------------------

--
-- 資料表結構 `wish_pool_vote`
--

CREATE TABLE `wish_pool_vote` (
  `mem_id` varchar(20) NOT NULL,
  `cust_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `wish_pool_vote`
--

INSERT INTO `wish_pool_vote` (`mem_id`, `cust_no`) VALUES
('candy', 1),
('apple', 2),
('candy', 2);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `base`
--
ALTER TABLE `base`
  ADD PRIMARY KEY (`base_no`);

--
-- 資料表索引 `car_event`
--
ALTER TABLE `car_event`
  ADD PRIMARY KEY (`event_no`);

--
-- 資料表索引 `collect_list`
--
ALTER TABLE `collect_list`
  ADD PRIMARY KEY (`mem_id`,`prod_no`),
  ADD KEY `prod_no` (`prod_no`);

--
-- 資料表索引 `comment_report`
--
ALTER TABLE `comment_report`
  ADD PRIMARY KEY (`rept_no`),
  ADD KEY `mem_id` (`mem_id`),
  ADD KEY `msg_no` (`msg_no`);

--
-- 資料表索引 `custom_product`
--
ALTER TABLE `custom_product`
  ADD PRIMARY KEY (`cust_no`),
  ADD KEY `mem_id` (`mem_id`),
  ADD KEY `base_no` (`base_no`),
  ADD KEY `ingr_no_1` (`ingr_no_1`),
  ADD KEY `ingr_no_2` (`ingr_no_2`),
  ADD KEY `deco_no_1` (`deco_no_1`),
  ADD KEY `deco_no_2` (`deco_no_2`);

--
-- 資料表索引 `decoration`
--
ALTER TABLE `decoration`
  ADD PRIMARY KEY (`deco_no`);

--
-- 資料表索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_no`);

--
-- 資料表索引 `group_order`
--
ALTER TABLE `group_order`
  ADD PRIMARY KEY (`grp_order_no`),
  ADD KEY `grp_no` (`grp_no`),
  ADD KEY `mem_id` (`mem_id`);

--
-- 資料表索引 `group_shopping`
--
ALTER TABLE `group_shopping`
  ADD PRIMARY KEY (`grp_no`),
  ADD KEY `cust_no` (`cust_no`);

--
-- 資料表索引 `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingr_no`);

--
-- 資料表索引 `like_record`
--
ALTER TABLE `like_record`
  ADD PRIMARY KEY (`mem_id`,`cust_no`),
  ADD KEY `cust_no` (`cust_no`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mem_no`),
  ADD UNIQUE KEY `mem_id` (`mem_id`);

--
-- 資料表索引 `message_comment`
--
ALTER TABLE `message_comment`
  ADD PRIMARY KEY (`msg_no`),
  ADD KEY `mem_id` (`mem_id`),
  ADD KEY `prod_no` (`prod_no`);

--
-- 資料表索引 `official_order`
--
ALTER TABLE `official_order`
  ADD PRIMARY KEY (`offi_order_no`),
  ADD KEY `mem_id` (`mem_id`);

--
-- 資料表索引 `official_order_list`
--
ALTER TABLE `official_order_list`
  ADD PRIMARY KEY (`offi_order_no`,`prod_no`),
  ADD KEY `prod_no` (`prod_no`);

--
-- 資料表索引 `official_product`
--
ALTER TABLE `official_product`
  ADD PRIMARY KEY (`prod_no`),
  ADD KEY `base_no` (`base_no`),
  ADD KEY `ingr_no_1` (`ingr_no_1`),
  ADD KEY `ingr_no_2` (`ingr_no_2`),
  ADD KEY `deco_no_1` (`deco_no_1`),
  ADD KEY `deco_no_2` (`deco_no_2`);

--
-- 資料表索引 `robot`
--
ALTER TABLE `robot`
  ADD PRIMARY KEY (`pr_no`);

--
-- 資料表索引 `wish_pool_vote`
--
ALTER TABLE `wish_pool_vote`
  ADD PRIMARY KEY (`mem_id`,`cust_no`),
  ADD KEY `cust_no` (`cust_no`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `base`
--
ALTER TABLE `base`
  MODIFY `base_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `car_event`
--
ALTER TABLE `car_event`
  MODIFY `event_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comment_report`
--
ALTER TABLE `comment_report`
  MODIFY `rept_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `custom_product`
--
ALTER TABLE `custom_product`
  MODIFY `cust_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `decoration`
--
ALTER TABLE `decoration`
  MODIFY `deco_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `group_order`
--
ALTER TABLE `group_order`
  MODIFY `grp_order_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `group_shopping`
--
ALTER TABLE `group_shopping`
  MODIFY `grp_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingr_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `mem_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `message_comment`
--
ALTER TABLE `message_comment`
  MODIFY `msg_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `official_order`
--
ALTER TABLE `official_order`
  MODIFY `offi_order_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `official_product`
--
ALTER TABLE `official_product`
  MODIFY `prod_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `robot`
--
ALTER TABLE `robot`
  MODIFY `pr_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `collect_list`
--
ALTER TABLE `collect_list`
  ADD CONSTRAINT `collect_list_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `collect_list_ibfk_2` FOREIGN KEY (`prod_no`) REFERENCES `official_product` (`prod_no`);

--
-- 資料表的限制式 `comment_report`
--
ALTER TABLE `comment_report`
  ADD CONSTRAINT `comment_report_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `comment_report_ibfk_2` FOREIGN KEY (`msg_no`) REFERENCES `message_comment` (`msg_no`);

--
-- 資料表的限制式 `custom_product`
--
ALTER TABLE `custom_product`
  ADD CONSTRAINT `custom_product_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `custom_product_ibfk_2` FOREIGN KEY (`base_no`) REFERENCES `base` (`base_no`),
  ADD CONSTRAINT `custom_product_ibfk_3` FOREIGN KEY (`ingr_no_1`) REFERENCES `ingredients` (`ingr_no`),
  ADD CONSTRAINT `custom_product_ibfk_4` FOREIGN KEY (`ingr_no_2`) REFERENCES `ingredients` (`ingr_no`),
  ADD CONSTRAINT `custom_product_ibfk_5` FOREIGN KEY (`deco_no_1`) REFERENCES `decoration` (`deco_no`),
  ADD CONSTRAINT `custom_product_ibfk_6` FOREIGN KEY (`deco_no_2`) REFERENCES `decoration` (`deco_no`);

--
-- 資料表的限制式 `group_order`
--
ALTER TABLE `group_order`
  ADD CONSTRAINT `group_order_ibfk_1` FOREIGN KEY (`grp_no`) REFERENCES `group_shopping` (`grp_no`),
  ADD CONSTRAINT `group_order_ibfk_2` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`);

--
-- 資料表的限制式 `group_shopping`
--
ALTER TABLE `group_shopping`
  ADD CONSTRAINT `group_shopping_ibfk_1` FOREIGN KEY (`cust_no`) REFERENCES `custom_product` (`cust_no`);

--
-- 資料表的限制式 `like_record`
--
ALTER TABLE `like_record`
  ADD CONSTRAINT `like_record_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `like_record_ibfk_2` FOREIGN KEY (`cust_no`) REFERENCES `custom_product` (`cust_no`);

--
-- 資料表的限制式 `message_comment`
--
ALTER TABLE `message_comment`
  ADD CONSTRAINT `message_comment_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `message_comment_ibfk_2` FOREIGN KEY (`prod_no`) REFERENCES `official_product` (`prod_no`);

--
-- 資料表的限制式 `official_order`
--
ALTER TABLE `official_order`
  ADD CONSTRAINT `official_order_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`);

--
-- 資料表的限制式 `official_order_list`
--
ALTER TABLE `official_order_list`
  ADD CONSTRAINT `official_order_list_ibfk_1` FOREIGN KEY (`offi_order_no`) REFERENCES `official_order` (`offi_order_no`),
  ADD CONSTRAINT `official_order_list_ibfk_2` FOREIGN KEY (`prod_no`) REFERENCES `official_product` (`prod_no`);

--
-- 資料表的限制式 `official_product`
--
ALTER TABLE `official_product`
  ADD CONSTRAINT `official_product_ibfk_1` FOREIGN KEY (`base_no`) REFERENCES `base` (`base_no`),
  ADD CONSTRAINT `official_product_ibfk_2` FOREIGN KEY (`ingr_no_1`) REFERENCES `ingredients` (`ingr_no`),
  ADD CONSTRAINT `official_product_ibfk_3` FOREIGN KEY (`ingr_no_2`) REFERENCES `ingredients` (`ingr_no`),
  ADD CONSTRAINT `official_product_ibfk_4` FOREIGN KEY (`deco_no_1`) REFERENCES `decoration` (`deco_no`),
  ADD CONSTRAINT `official_product_ibfk_5` FOREIGN KEY (`deco_no_2`) REFERENCES `decoration` (`deco_no`);

--
-- 資料表的限制式 `wish_pool_vote`
--
ALTER TABLE `wish_pool_vote`
  ADD CONSTRAINT `wish_pool_vote_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  ADD CONSTRAINT `wish_pool_vote_ibfk_2` FOREIGN KEY (`cust_no`) REFERENCES `custom_product` (`cust_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
