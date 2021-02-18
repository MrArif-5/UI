EzApp.controller('HeaderController', ["$scope", "$http", "$rootScope", "$location", "$window",
    function ($scope, $http, $rootScope, $location, $window) {

        //$scope.toggle = false;
        //$rootScope.sideBartoggle = false;

        //$rootScope.AuthEmp = $cookies.get("AuthEmp");
        //if ($rootScope.AuthEmp === 'true') {
        //    $rootScope.EmployeeSignin = JSON.parse($cookies.get("EmployeeSignin"));
        //    $scope.sideBarshow = $rootScope.EmployeeSignin.Roles;
        //}




        $scope.toggle = function () {
            if ($rootScope.sideBarExpand) {
                $rootScope.sideBarExpand = false;
            }
            else {
                $rootScope.sideBarExpand = true;
            }
        }

    }]

).directive('headerDirec', function () {
    return {
        templateUrl: 'ngViews/Directives/Header/Header.html'
    };
});