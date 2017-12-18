var testApp = angular.module('LogoDesigner.controllers', [])
.controller('designerController', function($scope, ergastAPIservice) {
    $scope.onLogin = function(username, password) {
        console.log('Login...');
        console.log('Username: ' + username);
        console.log('Password: ' + password);
    }

    $scope.openPopup = function(id) {
        console.log(id);
    };

    $scope.closePopup = function(id) {
        console.log(id);
    };
})

.directive('popup', function($compile) {
    var directive = {};

    directive.restrict = 'A';
    directive.template = 
        '<div class="popup" data-ng-click="closePopup(\'Test\')">' +
            '<div class="inner">' +
            '</div>' +
        '</div>';
    directive.scope = true;
    directive.link = function( $scope, $element, $attributes ) {
        inner = $element.find('.inner').clone();
        inner.attr($attributes.innerDirective, '');
        inner = $compile(inner)($scope);
        $element.find('.inner').replaceWith(inner);
    }
    return directive;
})



.directive('login', function() {
    var directive = {};

    directive.restrict = 'A';
    directive.template = 
        '<div class="col-md-6 offset-md-3">' +
            '<div class="card">' +
                '<div class="row-fluid">' +
                    '<div class="col-md-12">' + 
                        '<h3>Login</h3>' +
                        '<input type="text" placeholder="Username" data-ng-model="login.username" value="count: {{count}}"/>' +
                        '<input type="text" placeholder="Password" data-ng-model="login.password" />' +
                        '<div data-ng-if="login.password == null" class="message error">' +
                            '<i class="fa fa-caret-up" aria-hidden="true"></i>&nbsp;Invalid username or password.' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<div class="btn btn-primary" data-ng-click="onLogin(login.username, login.password)">Login</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                                '<div class="btn" data-ng-click="count = count + 1" data-ng-init="count=0">Cancel</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    
    directive.scope = true;
    
    return directive;
 });