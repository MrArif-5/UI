EzApp.controller('SidebarController', ["$scope", "$http", "$rootScope", "$location", "$window","$cookies",
    function ($scope, $http, $rootScope, $location, $window, $cookies) {
        $scope.Path = $location.$$path;


        $scope.toggle = function () {
            if ($rootScope.sideBarExpand) {
                $rootScope.sideBarExpand = false;
            }
            else {
                $rootScope.sideBarExpand = true;
            }
        }
        //$cookies.put("Auth", "true");
        //$rootScope.Auth = $cookies.get("Auth");
        //$cookies.put("AdminSignIn", JSON.stringify($scope.Admin));
        //$rootScope.AdminSignIn = JSON.parse($cookies.get("AdminSignIn"));

    }]

).directive('sideBar', function () {
    return {
        templateUrl: 'ngViews/Directives/Sidebar/Sidebar.html', controller: 'SidebarController'




    };


    });


