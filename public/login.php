<?php

$link = mysql_connect('vstimes-db.my.phpcloud.com', 'vstimes', '5225076');
$ret = mysql_select_db('vstimes', $link);
$email = mysql_real_escape_string($_POST['email'], $link);
$pwd = mysql_real_escape_string($_POST['pwd'], $link);
$pwd = md5(crc32($pwd));
$result = mysql_query("SELECT id FROM users WHERE email = '$email' AND pwd = '$pwd'");
if (mysql_fetch_assoc($result)) {
    exit('registed');
}
$sql = "INSERT INTO users(`email`, `pwd`) VALUES ('$email', '$pwd') ; ";
$ret = mysql_query($sql);
if(!$ret){
    exit('error');
}
exit('suc');