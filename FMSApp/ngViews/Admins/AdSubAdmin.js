EzApp.factory('AddSubAdminService', [
    '$http', 'api', function ($http, api) {

        subadmin = {};

        subadmin.CreateSubAdmin = function (obj) {
            var Package;

            Package = $http({ method: 'Post', url: api + 'Vendor/CreateSubAdmin', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Package;
        };

        return subadmin;
    }]);

EzApp.controller('subadminController', ['$scope', '$rootScope', 'AddSubAdminService',
    
    function ($scope, $rootScope, AddSubAdminService) {

        $scope.CreateSubAdmin = function () {
            AddSubAdminService.CreateSubAdmin($scope.obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.subadmin = result.data.Data;
                    //$location.path("/Package");
                    swal.fire("Sub-Admin Created", "", "success");
                }
                else {
                    $scope.serverErrorMsgs = result.data.Message;
                }

            });
        };
    }
]);



