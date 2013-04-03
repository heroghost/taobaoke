<?php
if($_SERVER['HTTP_HOST'] === 'www.taobaoke.com'){
    $host = 'http://www.taobaoke.com/';
}
else{
    $host = 'http://vstimes.my.phpcloud.com/taoke/';
}
//$app_key = '21328186'; /* 填写appkey */ //可以传入
$app_key = $_GET['appkey']; /* 填写appkey */ //可以传入
//$secret = 'ace3e7c571ea2b687994573feb58b6a4'; /* 填入Appsecret' */
$secret = $_GET['secret']; /* 填入Appsecret' */
$timestamp = time() . "000";
$message = $secret . 'app_key' . $app_key . 'timestamp' . $timestamp . $secret;
$mysign = strtoupper(hash_hmac("md5", $message, $secret));
setcookie("timestamp", $timestamp);
setcookie("sign", $mysign);
$num_iids = $_GET['num_iids'];
//$num_iids = '19077056393';
$email = $_GET['email'];
//$email = 'liuleivstimes@gmail.com';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title> New Document </title>
        <meta name="Generator" content="EditPlus">
        <meta name="Author" content="">
        <meta name="Keywords" content="">
        <meta name="Description" content="">
        <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
        <script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=<?php echo $app_key;?>"></script>
    </head>

    <body>
        <script>
            TOP.api('rest', 'get',{
                method:'taobao.taobaoke.widget.items.convert',
                fields:'num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume ',
                num_iids:'<?php echo $num_iids;?>'
            },function(res){
                if(res.total_results == 0){
                    return ;
                }
                if( res.error_response){
                    console.log(res.error_response.code, res.error_response.sub_msg)
                }
                else{
                    $.post('<?php echo $host;?>store.php',{items:res.taobaoke_items.taobaoke_item, email:'<?php echo $email;?>'}, function(ret){
                        console.log(ret);
                    } );
                    var total = res.total_results;
                    console.log('total='+ total);
                    for(var index in res.taobaoke_items.taobaoke_item){
                        var curItem = res.taobaoke_items.taobaoke_item[0];
                        console.log(curItem);
                    }
                }
            })
        </script>
    </body>
</html>
