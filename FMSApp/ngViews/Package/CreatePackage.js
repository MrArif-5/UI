EzApp.factory('PackageService', [
    '$http', 'api', function ($http, api) {

        PackageObj = {};

        PackageObj.CreatePackage = function (obj) {
            var Package;

            Package = $http({ method: 'Post', url: api + 'Package/CreatePackage', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Package;
        };


        PackageObj.GetAllPackages = function () {
            var Packages;

            Packages = $http({ method: "Get", url: api + 'Package/GetAllPackages' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Packages;
        };


        return PackageObj;
    }]);

EzApp.controller('PackageController', [
    '$scope', '$rootScope', 'PackageService', '$cookies', 'filePath', '$location',
    function ($scope, $rootScope, PackageService, $cookies, filePath, $location) {
        
        $scope.CreatePackage = function () {

            PackageService.CreatePackage($scope.obj).then(function (result) {

                if (result.data.isSuccess) {
                    $scope.PackageObj = result.data.Data;
                    $location.path("/Package");
                    swal.fire("Package Created", "", "success");
                }
                else {
                    $scope.serverErrorMsgs = result.data.Message;
                }

            });
        }

        $scope.GetAllPackages = function () {
            PackageService.GetAllPackages().then(function (result) {
                $scope.Packages = result.data.Data;
            });
        };
        $scope.GetAllPackages();

      

    }
]);



