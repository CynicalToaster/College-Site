<?
    class Ap_Controller
    {
        public $access_points = array();

        public function __construct()
        {
            $access_points = glob('site/accesspoints/*.php');
            foreach($access_points as $ap_dir)
            {
                include $ap_dir;

                $split_ap_dir = explode('/', $ap_dir);
                $ap_name = 'Ap_' . explode('.', end($split_ap_dir))[0];

                $accesspoint = new $ap_name;
                $accesspoint->location = $ap_dir;
                $this->registerAccessPoint($accesspoint->url, $accesspoint);
            }
        }

        private function registerAccessPoint($url, $accesspoint)
        {
            $this->access_points[$url] = $accesspoint;
        }

        public function init($url)
        {
            if (isset($this->access_points[$url]))
            {
                $access_point = $this->access_points[$url];
                $access_point->hit();

                return true;
            }
            else
                return false;       
        }
    }
?>