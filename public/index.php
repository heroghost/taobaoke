<?php
//根据outer_code区分
if ($_SERVER['HTTP_HOST'] === 'www.taobaoke.com') {
    $host = 'http://www.taobaoke.com';
} else {
    $host = 'http://vstimes.my.phpcloud.com/taoke';
}
if ($_POST['email']) {
    if ($host === 'http://www.taobaoke.com') {
        $link = mysql_connect('127.0.0.1', 'root', '');
        $ret = mysql_select_db('vstimes', $link);
    } else {
        $link = mysql_connect('vstimes-db.my.phpcloud.com', 'vstimes', '5225076');
        $ret = mysql_select_db('vstimes', $link);
    }

    $results = mysql_query("SELECT * FROM items_convert WHERE email = '{$_POST['email']}' ORDER BY ctime DESC");
    $items = array();
    while ($row = mysql_fetch_assoc($results)) {
        $items[] = $row;
    }
}
?>
<html>
    <head>
        <title>链接转换</title>    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    </head>
    <body>
        <?php if (is_array($items) && !empty($items)) { ?>
            <table>
                <thead>
                    <tr>
                        <th>商品</th>
                        <th>原价</th>
                        <th>佣金</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item) { ?>
                        <tr>
                            <td><img width="120" height="110" src="<?php echo $item['pic_url'];?>"/><br/><a href="<?php echo $item['click_url']; ?>" target="_blank"><?php echo $item['title']; ?></a></td>
                            <td><?php echo $item['price']; ?></td>
                            <td><?php echo $item['commission']; ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        <?php } ?>
        <form action="<?php echo $host; ?>/index.php" method="POST">
            邮箱：<input type="text" name="email"/>
            <input type="submit" value="查询"/>
        </form>
        <br/>
        有任何建议，请发送邮件到<a href="mailto:liuleivstimes@gmail.com">liuleivstimes@gmail.com</a>
        <br/>
        谢谢大家的支持。
    </body>
</html>