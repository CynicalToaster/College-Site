<? 
    class Page_Game extends Page
    {
        public function __construct()
        {
            $this->url = '/game';

            $this->ajax_handlers = array();
        }
    }
?>