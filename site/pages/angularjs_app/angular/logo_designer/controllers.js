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

.directive('popup', function() {
    var directive = {};

    directive.restrict = 'A';
    directive.template = 
        '<div class="popup" data-ng-click="closePopup(\'Test\')">' +
            '<div class="inner">' +
                '<div class="offset-md-3 col-md-6">' +
                    '<div class="card">' +
                        '<div class="row-fluid">' +
                            '<div class="col-md-12">' +
                                '<div data-login></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    directive.scope = false;
    return directive;
})



.directive('login', function() {
    var directive = {};

    directive.restrict = 'A';
    directive.template = 
        '<h3>Login</h3>' +
        '<input type="text" placeholder="Username" data-ng-model="login.username" value="count: {{count}}"/>' +
        '<div data-ng-if="login.username == null" class="message error">' +
            '<i class="fa fa-caret-up" aria-hidden="true"></i>&nbsp;Please enter your username.' +
        '</div>' +
        '<input type="text" placeholder="Password" data-ng-model="login.password" />' +
        '<div data-ng-if="login.password == null" class="message error">' +
            '<i class="fa fa-caret-up" aria-hidden="true"></i>&nbsp;Please enter a valid name.' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<div class="btn btn-primary" data-ng-click="onLogin(login.username, login.password)">Login</div>' +
            '</div>' +
            '<div class="col-md-6">' +
                '<div class="btn" data-ng-click="count = count + 1" data-ng-init="count=0">Cancel</div>' +
            '</div>' +
        '</div>';
    
    directive.scope = true;

    directive.compile = function(element, attributes) {
        //element.css("border", "1px solid #cccccc");
       
       //linkFunction is linked with each element with scope to get the element specific data.
        var linkFunction = function($scope, element, attributes) {
            //element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
            //element.css("background-color", "#ff00ff");
        }
        return linkFunction;
    }
    return directive;
 });