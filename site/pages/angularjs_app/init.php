<? 
    class Page_Angularjs_App extends Page
    {
        public function __construct()
        {
            $this->url = '/angularjs';
            $this->name = 'AngularJs';
            $this->desc = 'AngularJs page';

            $this->ajax_handlers = array();
        }
    }
?>