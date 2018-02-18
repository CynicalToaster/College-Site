<?
    class Db_Controller
    {
        public static $connection;

        public function __construct()
        {
            $servername = "localhost";
            $username = "webClient";
            $password = "n4L1BHGgwQGCDzQ3";
            $dbname = "db_college_site";
            
            // Create connection
            self::$connection = new mysqli($servername, $username, $password, $dbname);
            
            // Check connection
            if (self::$connection->connect_error) {
                die("Connection failed: " . self::$connection->connect_error);
            } 
            traceLog('Connected successfully');

            //$connection->close();
        }

        static function queryArray($sql)
        {
            $result = array();
            $queryResult = self::$connection->query($sql);
            if ($queryResult->num_rows > 0) {
                while($row = $queryResult->fetch_assoc()) {
                    $result[] = $row;
                }
            }
            return $result;
        }
    }
?>