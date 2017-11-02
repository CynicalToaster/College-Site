<?
    class Page
    {
        public $url = '';
        public $name = '';
        public $desc = '';
        public $location = '';

        public $ajax_handlers = array();

        public function render()
        {
            if (file_exists($this->location . '/preload.php'))
                include $this->location . '/preload.php';

            Page::startPage();
                include $this->location . '/head.htm';
            Page::startBody();
                include $this->location . '/body.htm';
            Page::endPage();

            if (file_exists($this->location . '/postload.php'))
                include $this->location . '/postload.php';
        }

        public function renderPartial($name)
        {
            if (file_exists($name))
                include $name;
            else
            {
                $partial = $this->location . '/partials/' . $name;
                if(file_exists($partial . '.php'))
                    include $partial . '.php';
        
                if(file_exists($partial . '.htm'))
                    include $partial . '.htm';
            }
        }

        public function handleEvent($event)
        {
            if (isset($this->ajax_handlers[$event]))
            {
                $handler = $this->ajax_handlers[$event];
                $this->$handler();
            }
            else
                echo 'No event handler for: ' . $event;
        }

        static function startPage()
        {echo '<!DOCTYPE html><html><head>';}

        static function startBody()
        {echo '</head><body>';}

        static function endPage()
        {echo '</body></html>';}
    }

    class Page_Controller
    {
        public $pages = array();

        public function __construct()
        {
            $pages = glob('site/pages/*', GLOB_ONLYDIR);
            foreach($pages as $page_dir)
            {
                $page_init = $page_dir . '/init.php';
                if (file_exists($page_init))
                {
                    include $page_init;

                    $split_page_dir = explode('/', $page_dir);
                    $page_name = 'Page_' . end($split_page_dir);
                    $page = new $page_name;
                    $page->location = $page_dir;
                    $this->registerPage($page->url, $page);
                }
            }
        }

        private function registerPage($url, $page)
        {
            $this->pages[$url] = $page;
        }

        private function registerAjaxEvent($event, $page, $target)
        {
            $this->events[$event] = $target;
        }

        public function init()
        {
            $url = rtrim($_SERVER['REQUEST_URI']); 

            if (isset($this->pages[$url]))
            {
                $page = $this->pages[$url];

                if (isset($_SERVER['HTTP_EVENT']))
                    $page->handleEvent($_SERVER['HTTP_EVENT']);
                else
                    $page->render();
            }
            elseif (isset($this->pages['/404']))
            {
                header('Location: /404');
                exit();
            }
            else
            {
                echo '404 Page not found.';
                exit();
            }            
        }
    }

    function traceLog($message)
    {
        file_put_contents('logs/info.log', @date('d-m-Y h:i:s').' INFO '.print_r($message, true).' '.PHP_EOL, FILE_APPEND);
    }

    (new Page_Controller())->init();

    //if (sizeof($_POST) > 0)
        //traceLog($_POST);
    //else
        //$pageController->renderPage($_SERVER['REQUEST_URI']);

    die();









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