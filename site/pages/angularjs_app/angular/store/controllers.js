var store_app = angular.module('product.controllers', [])
.controller('productController', function($scope) {
    $scope.productExample = {
        id: '1123',
        name: 'Save Our Seas T-Shirt',
        description: 'Back in 2013, when we created our Save Our Seas design in collaboration with The Marine Conservation Society, we had no idea how popular it would be. Years later it\'s still one of our bestselling prints - featuring an army of miniature sea creatures. The message is simple - our oceans are worth protecting. Grab yourself this amazing t-shirt today, made from super-soft organic cotton.',
        price: '£19.00',
        spec: 'Save our Seas tee designed by the Marine Conservation Society on our famously soft organic cotton Men\'s t-shirt. Certified 100% Organic Cotton t-shirt (155g/m2) / Made in an ethically accredited, wind-powered factory / Low Carbon / GM Free / Hand finished in the UK / Wash Cool, Hang Dry',
        options: {
            colours: {
                name: 'Colours',
                values: {
                    'Dark Grey' : '555555',
                    'White' : 'FFFFFF',
                    'Navy Blue' : '0D1B30',
                    'Black' : '000',
                    'Bright Blue' : '2173D9',
                    'Athletic Grey' : 'DADADA',
                    'Red Wine' : '702225',
                    'Rapanui Green' : '567726',
                    'Mustard' : 'DEAC17',
                    'Red' : 'C52020',
                    'Denim Blue' : '1F424B',
                    'Tan' : '937E6E',
                }
            },
            sizes: {
                name: 'Sizes',
                values: {
                    'XS' : '',
                    'S' : '',
                    'M' : '',
                    'L' : '',
                    'XL' : ''
                }
            },
            fabrics: {
                name: 'Fabrics',
                values: {
                    'Cotton' : '',
                    'Organic Cotton' : '',
                    'Bamboo' : ''
                }
            }
        },
        images: {
            lifeStyle: [
                '/site/resources/images/products/lifestyle_1.jpg',
                '/site/resources/images/products/lifestyle_2.jpg',
            ],
            flat: [
                '/site/resources/images/products/flat_1.jpg',
                '/site/resources/images/products/flat_2.jpg'
            ]
        },
        rating: 'Product Rating',
        reviews: {}
    }

    $scope.getImages = function(product_images) {
        var images = [];

        for (key in product_images) {
            if (product_images.hasOwnProperty(key)) {
                var element = product_images[key];
                images = images.concat(element);
            }
        }

        return images;
    }
})

.directive('product', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="row" style="border: 1px solid #f00">' +
                '<div class="col-md-12">' +
                    '<div class="row">' +
                        '<div class="col-md-6 pull-left">' +
                            '<div data-product-preview></div>' +
                        '</div>' +
                        '<div class="col-md-6 pull-left">' +
                            '<div data-product-info></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',
    };
})

.directive('productPreview', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="card">' +
                '<div class="row">' +
                    '<div class="col-md-12">' +
                        '<div id="image-preview" class="row">' +
                            '<div class="col-md" style="width: 20%; padding-right: 0;">' +
                                '<div class="gallary swiper-container">' +
                                    '<div class="swiper-wrapper">' +
                                        '<img data-ng-repeat="(id,image) in getImages(productExample.images)" class="swiper-slide" src="{{image}}"/>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md" style="width: 80%;">' +
                                '<div class="preview swiper-container">' +
                                    '<div class="swiper-wrapper">' +
                                        '<img data-ng-repeat="(id,image) in getImages(productExample.images)" class="swiper-slide" src="{{image}}"/>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',
    };
})

.directive('productInfo', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="card">' +
                '<div class="row">' +
                    '<div class="col-md-12">' +
                        '<div class="row">' +
                            '<div class="col-md-8 pull-left">' +
                                '<h4>{{productExample.name}}</h4>' +
                            '</div>' +
                            '<div class="col-md-4 pull-right">' +
                                '<p class="price primary">{{productExample.price}}</p>' +
                            '</div>' +
                        '</div>' +
                        '<p>{{productExample.description}}</p>' +

                        '<div data-ng-repeat="(key, option) in productExample.options">' +
                            '<label>{{option.name}}</label>' +


                            
                            '<select data-ng-if="key != \'colours\'">' +
                                '<option data-ng-repeat="(name, value) in option.values">{{name}}</option>' +
                            '</select>' +

                            '<div class="colour-pallet" data-ng-if="key == \'colours\'">' +
                                '<a href="#" class="colour" data-ng-repeat="(name, value) in option.values">' +
                                    '<span class="inner" style="background-color: #{{value}};"></span>' +
                                '</a>' +
                            '</div>' +



                        '</div>' +

                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<a href="#" class="btn primary">Add to Basket</a>' +
                            '</div>' +
                        '</div>' +

                    '</div>' +
                '</div>' +
            '</div>',
    };
})