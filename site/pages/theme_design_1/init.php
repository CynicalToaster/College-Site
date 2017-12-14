<? 
    class Page_Theme_design_1 extends Page
    {
        public function __construct()
        {
            $this->url = '/theme';
            $this->name = 'Theme';
            $this->desc = 'A test page';

            $this->ajax_handlers = array();
        }
    }
?>