<?php
function get_all_card_list()
{
    $data = array();

    $sql = "SELECT * FROM `car_event`";

    $query = mysqli_query($_SESSION['link'], $sql);

    if ($query) {
        //執行成功
        if (mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = $row;
            }
        }
    } else {
        //執行失敗
        echo "{$sql}語法請求失敗：<br/>" . mysqli_error($_SESSION['link']);
    }
    return $data;

};
function add_article($inputbigen_d, $inputend_d, $inputend_info, $inputend_local_begin, $inputend_local_end)
{$result = null;
    $add_date = date('Y-m-d H:i:s');
    $sql = "INSERT INTO `car_event` (`event_cdate`, `event_edate`, `event_text`, `event_slocation`, `event_elocation` ) VALUE ('{$inputbigen_d}', {$inputend_d}, {$inputend_info}, {$inputend_local_begin}, '{$inputend_local_end}')";
    //echo $sql."\n";
    $query = mysqli_query($_SESSION['link'], $sql);
    if ($query) {
        if (mysqli_affected_rows($_SESSION['link']) == 1) {
            $result = true;
        }
    } else {
        echo "{$sql}錯誤訊息：<br/>" . mysqli_error($_SESSION['link']);
    }
    return $result;
}
