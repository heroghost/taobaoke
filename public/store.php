<?php

if ($_SERVER['HTTP_HOST'] === 'www.taobaoke.com') {
    $host = 'http://www.taobaoke.com/';
} else {
    $host = 'http://vstimes.my.phpcloud.com/taoke/';
}
if ($host === 'http://www.taobaoke.com/') {
    $link = mysql_connect('127.0.0.1', 'root', '');
    $ret = mysql_select_db('vstimes', $link);
} else {
    $link = mysql_connect('vstimes-db.my.phpcloud.com', 'vstimes', '5225076');
    $ret = mysql_select_db('vstimes', $link);
}

foreach ($_POST['items'] as $item) {
    $data = $item;
    $data['update'] = date('Y-m-d H:i:s');
    foreach ($item as &$val) {
        $val = mysql_real_escape_string($val);
    }
    $result = mysql_query("SELECT id FROM items_convert WHERE email = '{$_POST['email']}' AND num_iid = '{$item['num_iid']}'");
    $row = mysql_fetch_assoc($result);
    if ($row) {
        die('had');
    }
    $time = date('Y-m-d H:i:s');
    $sql .= "INSERT INTO items_convert(`email`, `click_url`,`commission`,`commission_num`,`commission_rate`,`commission_volume`,`item_location`,`nick`,`num_iid`,`pic_url`,`price`,`seller_credit_score`,`shop_click_url`,`title`,`volume`,`ctime`) 
            VALUES ('{$_POST['email']}','{$item['click_url']}','{$item['commission']}','{$item['commission_num']}','{$item['commission_rate']}','{$item['commission_volume']}','{$item['item_location']}','{$item['nick']}','{$item['num_iid']}','{$item['pic_url']}','{$item['price']}','{$item['seller_credit_score']}','{$item['shop_click_url']}','{$item['title']}','{$item['volume']}', '$time');\n";
}
$ret = mysql_query($sql, $link);
if(!$ret){
    var_dump(mysql_error($link));
}
mysql_close($link);