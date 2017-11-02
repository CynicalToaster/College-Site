<? 
    class Page_Shop extends Page
    {
        public function __construct()
        {
            $this->url = '/shop';
            $this->name = 'Shop';
            $this->desc = 'A test page';

            $this->ajax_handlers = array(
                'shop:test' => 'testHandler'
            );
        }

        public function testHandler()
        {
            print_r($this);
        }
    }
?>