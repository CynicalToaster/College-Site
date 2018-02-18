<?
    class Ap_products extends AccessPoint
    {
        public $url = '/ap/products';
        public $location = '';

        public function hit()
        {
            $products = self::generate_productList(6000);
            // $products = Db_Controller::queryArray('
            //     SELECT
            //         id,
            //         name
            //     FROM
            //         products
            // ');
            echo json_encode($products);

            // echo 'You\'ve hit the products access point!';
        }

        static function generate_productList($number)
        {
            $products = array();
            $options = array(
                'colour' => array(),
                'size' => array()
            );

            for ($i = 0; $i < $number; $i++) { 
                $product = array(
                    'id' => $i,
                    'name' => self::generate_randomName(),
                    'price' => rand(10, 60),
                    'colour' => self::generate_randomOption('colour'),
                    'size' => self::generate_randomOption('size')
                );
                $products[] = $product;
            }

            $time = microtime(true);

            foreach ($products as $key => $product) {
                $options['colour'][$product['colour']] = 1;
                $options['size'][$product['size']] = 1;
            }
            $options['colour'] = array_keys($options['colour']);
            $options['size'] = array_keys($options['size']);
            
            $final_time = microtime(true) - $time;
            traceLog('Time: ' . $final_time);

            return array(
                'time' => $final_time,
                'options' => $options,
                'products' => $products,
            );
        }

        static function generate_randomName()
        {
            $names = get_productList();
            $name = $names[rand(0, sizeof($names) - 1)];
            return $name;
        }

        static function generate_randomOption($option)
        {
            $options = array(
                'size' => array(
                    'XS',
                    'S',
                    'M',
                    'L',
                    'XL'
                ),
                'colour' => array(
                    'Red',
                    'Navy Blue',
                    'Yellow',
                    'Slate',
                    'Black',
                    'White',
                    'TieDye',
                    'Green',
                    'Purple',
                    'Blue',
                    'Tan',
                    'Olive',
                    'Gray'
                )
            );
            return $options[$option][rand(0, sizeof($options[$option]) - 1)];

        }
    }
?>