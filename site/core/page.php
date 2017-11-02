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
?>