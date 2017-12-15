<?
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
            $url = explode('?', rtrim($_SERVER['REQUEST_URI']))[0];

            traceLog($url);
            traceLog($this->pages);

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
?>