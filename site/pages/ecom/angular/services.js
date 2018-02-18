angular.module('product.services', [])

.factory('categoryService', function($http) {
    return {
        getProducts: function() {
            return $http.get('/ap/products', []);
        }
    };
});