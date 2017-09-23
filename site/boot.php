<?
    function renderPartial($path)
    {   
        $file_dir = $_SERVER['DOCUMENT_ROOT'] . '/site/' . $path;
        if(file_exists($file_dir . '.php'))
            include $file_dir . '.php';

        if(file_exists($file_dir . '.htm'))
            include $file_dir . '.htm';
    }

    $request = $_SERVER['REQUEST_URI'];

    $pages = array(
        '/' => 'home.htm',
        '/home' => 'home.htm',
        '/bookmarks' => 'bookmarks.htm',

        '/projects' => 'projects.htm',
        '/projects/ajax' => 'projects_pages/ajax.htm',
        '/projects/factory_1' => 'projects_pages/factory_1.htm',
        '/projects/factory_2' => 'projects_pages/factory_2.htm',
        '/projects/mqtt' => 'projects_pages/mqtt.htm',
        '/projects/game_1' => 'projects_pages/game_1.htm',
        '/projects/game_2' => 'projects_pages/game_2.htm',
        '/projects/description_generator' => 'projects_pages/description_generator.htm',
        
        '/about' => 'about.htm',
        '/contact' => 'contact.htm',
        '/404' => '404.htm'
    );

    if (isset($pages[$request]))
        $page = $pages[$request];
    else
    {
        header('Location: /404');
        exit();
    }

    if (file_exists('site/pages/' . $page))
        require_once('site/pages/' . $page);
    else
    {
        header('Location: /404');
        exit();
    }
?>