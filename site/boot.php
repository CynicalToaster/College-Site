<?
    include 'site/core/db_controller.php';

    include 'site/core/page.php';
    include 'site/core/page_controller.php';

    function traceLog($message)
    {
        file_put_contents('logs/info.log', @date('d-m-Y h:i:s').' INFO '.print_r($message, true).' '.PHP_EOL, FILE_APPEND);
    }

    //new Db_Controller();

    //traceLog(Db_Controller::queryArray('SELECT * FROM test'));

    (new Page_Controller())->init();
?>