
var EzApp = angular.module('EzApp', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination', 'moment-picker']);

EzApp.run(function ($rootScope, $cookies, $http, $location) {
   

    $rootScope.sideBarExpand = true;







});




EzApp.factory('myHttpInterceptor', function ($q, $window) {
    return {
        response: function (response) {
            return response;
        },
        responseError: function (response) {
            if (response.status === 500) {
                $window.alert(response.statusText);
            }
            return $q.reject(response);
        }
    };
});

EzApp.filter('words', function () {
    function isInteger(x) {
        return x % 1 === 0;
    }
    return function (value) {
        if (value && isInteger(value))
            return toWords(value);
        return value;
    };
});

EzApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
    $routeProvider.when('/Home', { templateUrl: 'ngViews/Home/Home.html', controller: 'HomeController' });
    $routeProvider.when('/Login', { templateUrl: 'ngViews/Login/Login.html', controller: 'AdminController' });
   

    $routeProvider.otherwise({ redirectTo: '/Home' });
    $locationProvider.html5Mode(true);
  
});

EzApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);

EzApp.directive("fileread", [
    function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }
]);




EzApp.constant("api", "https://api.ezydelivery.in/api/");
EzApp.constant("filePath", "https://api.ezydelivery.in/");

//EzApp.constant("api", "http://localhost:51108/api/");
//EzApp.constant("filePath", "http://localhost:51108/");


//EzApp.constant("api", "https://testapi.ezydelivery.in/api/");
//EzApp.constant("filePath", "https://testapi.ezydelivery.in/");




