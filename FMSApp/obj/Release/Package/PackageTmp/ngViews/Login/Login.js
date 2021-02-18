
EzApp.factory('AdminService', [
    '$http', 'api', function ($http, api) {

        AdminObj = {};

        AdminObj.AdminLoginD = function (Username, Password) {
            var AdminLogin;

            AdminLogin = $http({ method: "Get", url: api + 'Login/AdminLoginD?Username=' + Username + '&Password=' + Password }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return AdminLogin;
        };

        return AdminObj;
    }]);

EzApp.controller('AdminController', ['$scope', '$rootScope', '$location', 'AdminService', '$routeParams', '$cookies', '$window',

    function ($scope, $rootScope, $location, AdminService, $routeParams, $cookies, $window) {


        $scope.AdminLoginD = function () {
            AdminService.AdminLoginD($scope.Username, $scope.Password).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.Admin = result.data.Data;
                    swal.fire("Welcome To Admin", "Success", "success");
                    $location.path('/Home');
                    $cookies.put("Auth", "true");
                    $rootScope.Auth = $cookies.get("Auth");
                    $cookies.put("AdminSignIn", JSON.stringify($scope.Admin));
                    $rootScope.AdminSignIn = JSON.parse($cookies.get("AdminSignIn"));

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    swal.fire("Plese Enter Valid Crediantials");
                }

            });
        };



        //var $btn = document.getElementById("submit");
        //var $form = document.getElementById("form")

        //function signIn() {
        //    if ($form.checkValidity()) {
        //        $btn.classList.add('pending');
        //        window.setTimeout(function () { $btn.classList.add('granted'); }, 1500);
        //    }
        //}

        //$btn.addEventListener("click", signIn);

        }]);