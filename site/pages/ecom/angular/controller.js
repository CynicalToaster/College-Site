var store_app = angular.module('product.controllers', []);

store_app.controller('categoryController', function($scope) {
    $scope.collections = collections;
    $scope.products = products;

    $scope.filterProducts = function($filters) {
        console.log($filters);

        var filteredProducts = [];

        for (i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            var filtered = true;

            if (typeof $filters.collection !== 'undefined') {
                for (l = 0; l < product.collections.length; l++) {
                    var collection_id = product.collections[l];
                    if (collection_id == $filters.collection.id) {
                        filtered = false;
                    }
                } 
            }
            
            if (!filtered) {filteredProducts.push(product);}
        }

        return filteredProducts;
    }
})

.directive('productList', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div>' +
                '<p><strong>Product List</strong></p>' +
                '<p>Name Filter: <input type="text" data-ng-model="nameFilter"></input></p>' +
                '<p>Collection Filter: <input type="text"></input></p>' +
                '<select data-ng-model="collectionFilter" data-ng-options="col.name for col in collections track by col.id"></select>' +
                '<div data-ng-repeat="(id, product) in filterProducts({name: nameFilter, collection: collectionFilter}) | orderBy: \'-sales\'">' +
                    '<p>'+ 
                        '{{product.name}} - <span class="price">{{product.price}}</span> from: '+
                        '<span data-ng-repeat="(cat_id, collection_id) in product.collections">{{collections[collection_id].name}}, </span>' +
                    '</p>' +
                '</div>' +
            '</div>',
    };
})

.directive('productListItem', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div>' +
                '<p>Product Item</p>' +
            '</div>',
    };
});