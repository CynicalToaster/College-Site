<?
    include 'site/core/db_controller.php';

    include 'site/core/accesspoint.php';
    include 'site/core/ap_controller.php';
    include 'site/core/page.php';
    include 'site/core/page_controller.php';

    include 'site/core/helpers/products_list.php';

    function traceLog($message)
    {
        file_put_contents('logs/info.log', @date('d-m-Y h:i:s').' INFO '.print_r($message, true).' '.PHP_EOL, FILE_APPEND);
    }

    new Db_Controller();
    //traceLog(Db_Controller::queryArray('SELECT * FROM products'));

    $url = explode('?', rtrim($_SERVER['REQUEST_URI']))[0];
   
    $is_ap = (new Ap_Controller())->init($url);
    
    if (!$is_ap)
        (new Page_Controller())->init($url);
?>