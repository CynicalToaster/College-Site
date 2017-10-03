<?
    function renderPartial($path)
    {   
        $file_dir = $_SERVER['DOCUMENT_ROOT'] . '/site/' . $path;
        if(file_exists($file_dir . '.php'))
            include $file_dir . '.php';

        if(file_exists($file_dir . '.htm'))
            include $file_dir . '.htm';
    }

    function traceLog($message)
    {
        file_put_contents('logs/info.log', @date('d-m-Y h:i:s').' INFO '.print_r($message, true).' '.PHP_EOL, FILE_APPEND);
    }

    $pages = array(
        '/' => 'home',
        '/home' => 'home',
        '/bookmarks' => 'bookmarks',

        '/projects' => 'projects',
        '/projects/ajax' => 'projects_pages/ajax',
        '/projects/factory_1' => 'projects_pages/factory_1',
        '/projects/factory_2' => 'projects_pages/factory_2',
        '/projects/mqtt' => 'projects_pages/mqtt',
        '/projects/game_1' => 'projects_pages/game_1',
        '/projects/game_2' => 'projects_pages/game_2',
        '/projects/description_generator' => 'projects_pages/description_generator',
        '/projects/snake' => 'projects_pages/snake_game',
        '/projects/dml_page' => 'projects_pages/dml_page',
        
        '/about' => 'about',
        '/contact' => 'contact',
        '/404' => '404'
    );

    $events = array(
        'test' => 'projects_pages/ajax'
    );
    
    if (isset($_SERVER['HTTP_EVENT']))
    {
        $event = $_SERVER['HTTP_EVENT'];
        $handler = $events[$event];
        if (file_exists('site/pages/' . $handler . '.php'))
            include 'site/pages/' . $handler . '.php';
        else
            echo 'Handler doesn\'t exist';
    }
    else
    {
        $request = $_SERVER['REQUEST_URI'];
        if (isset($pages[$request]))
            $page = $pages[$request];
        else
        {
            header('Location: /404');
            exit();
        }

        if (file_exists('site/pages/' . $page . '.htm'))
            include 'site/pages/' . $page . '.htm';
        else
        {
            header('Location: /404');
            exit();
        }
    }
?>