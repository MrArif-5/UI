
var EzApp = angular.module('EzApp', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination', 'moment-picker']);

EzApp.run(function ($rootScope, $cookies, $http, $location) {
    if ($cookies.get("Auth") === null || $cookies.get("Auth") === undefined) {
        $cookies.put("Auth", false);
        $location.path('/Login');
    }
    $rootScope.Auth = $cookies.get("Auth");

    if ($rootScope.Auth === 'false') {
        $location.path('/Login');
    }
    else {
        $rootScope.AdminSignIn = JSON.parse($cookies.get("AdminSignIn"));
        $http.defaults.headers.common['APICODE'] = "123456789";
    }

    $rootScope.sideBarExpand = false;

    
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
    $routeProvider.when('/AddDrivers', { templateUrl: 'ngViews/Drivers/AddDriver.html', controller: 'DriverController' });
    $routeProvider.when('/Recharge', { templateUrl: 'ngViews/Drivers/Recharge.html', controller: 'DriverController'});
    $routeProvider.when('/DriverUpdate/:DeliveryHeroRegistrationId', { templateUrl: 'ngViews/Drivers/DriverUpdate.html', controller: 'DriverController'});
    $routeProvider.when('/Drivers', { templateUrl: 'ngViews/Drivers/DriverList.html', controller:'DriverController' });
    $routeProvider.when('/Details/:CustomerId', { templateUrl: 'ngViews/Customer/CustomerDetails.html', controller:'CustomerController' });
    $routeProvider.when('/CustomerList', { templateUrl: 'ngViews/Customer/Customerlist.html', controller:'CustomerController'});
    $routeProvider.when('/Orders', { templateUrl: 'ngViews/Orders/Orderlist.html' });
    $routeProvider.when('/Percentage/:DeliveryHeroRegistrationId', { templateUrl: 'ngViews/Payment/PercentageDetails.html', controller: 'PaymentController' }); 
    $routeProvider.when('/OrderDetails/:CustomerOrderId', { templateUrl: 'ngViews/Orders/Orderdetails.html', controller:'OrderDetailsController' });
    $routeProvider.when('/Profile', { templateUrl: 'ngViews/Profile/Profile.html' });
    $routeProvider.when('/Marketing', { templateUrl: 'ngViews/Marketing/Marketing.html', controller: 'MarketingController' });
    $routeProvider.when('/DriverDetails/:DeliveryHeroRegistrationId', { templateUrl: 'ngViews/Drivers/DriverDetails.html', controller: 'DriverController' });
    $routeProvider.when('/CouponCreate', { templateUrl: 'ngViews/CouponCreate/CouponCreate.html', controller:'CouponController' }); 


    $routeProvider.otherwise({ redirectTo: '/Login' });
    $locationProvider.html5Mode(true);
    $routeProvider.when("/Logout", {
        resolve: {
            auth: function ($rootScope, $location, $cookies) {
                $cookies.put("Auth", "false");
                $rootScope.AuthCust = $cookies.get("Auth");
                $cookies.put("AdminSignIn", null);
                $rootScope.CustomerSignin = $cookies.get("AdminSignIn");
                $location.path('/Login');
            }
        }
    }
    );
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




//EzApp.constant("api", "https://api.ezydelivery.in/api/");
//EzApp.constant("filePath", "https://api.ezydelivery.in/");

//EzApp.constant("api", "http://localhost:51108/api/");
//EzApp.constant("filePath", "http://localhost:51108/");

EzApp.constant("api", "http://192.168.0.78:2001/api/");
EzApp.constant("filePath", "http://192.168.0.78:2001/");



