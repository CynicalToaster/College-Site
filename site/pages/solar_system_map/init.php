<? 
    class Page_Solar_System_Map extends Page
    {
        public function __construct()
        {
            $this->url = '/solar';
            $this->name = 'Solar System Map';
            $this->desc = 'Solar System Map with SVGs';

            $this->ajax_handlers = array();
        }
    }
?>