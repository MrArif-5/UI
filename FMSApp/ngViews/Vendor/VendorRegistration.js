EzApp.factory('VendorService', [
    '$http', 'api', function ($http, api) {

        VendorObj = {};

        VendorObj.uploadFiles = function (formdata, Created_By) {

            var OdersXlSheet;
            OdersXlSheet = $http({
                headers: {
                    'Content-Type': undefined
                },
                method: 'POST', url: api + '/Item/AddMultipleItems?Created_By=' + Created_By, data: formdata
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return OdersXlSheet;
        };



        VendorObj.CreateVendor = function (obj) {
            var vendor;

            vendor = $http({ method: 'Post', url: api + 'Vendor/CreateVendor', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return vendor;
        };

        VendorObj.UpdateVendor = function (obj) {
            var vendor;

            vendor = $http({ method: 'POST', url: api + 'Vendor/UpdateVendor', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return vendor;
        };

        VendorObj.GetAllVendors = function () {
            var VendorList;

            VendorList = $http({ method: "Get", url: api + 'Vendor/GetAllVendors' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return VendorList;
        };

        VendorObj.GetListOfTimings = function () {
            var TimingList;

            TimingList = $http({ method: "Get", url: api + 'Vendor/GetListOfTimings' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return TimingList;
        };

        VendorObj.GetVendorByVendorRegistrationId = function (VendorRegistrationId) {
            var vendor;

            vendor = $http({
                method: "Get", url: api + 'Vendor/GetVendorByVendorRegistrationId?VendorRegistrationId=' + VendorRegistrationId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return vendor;
        };


        return VendorObj;
    }]);

EzApp.controller('VendorController', [
    '$scope', '$rootScope', 'VendorService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, VendorService, $cookies, filePath, $location, $routeParams) {
        $scope.VendorRegistrationId = $routeParams.VendorRegistrationId;




        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };

        $scope.BulkUpload = function () {

            //$scope.Documents.FileForm,
            bulkproductservices.uploadFiles(formdata, $scope.Created_By).then(function (result) {
                if (result.status == 200) {
                    if (result.data.isSuccess) {
                        debugger;
                        if (result.data.Data.Is_ExcelData) {
                            var blob = new Blob([result.data.Data.ExcelData], {
                                type: "application/octet-stream"
                            });
                            saveAs(blob, 'Item.xlsx');
                        }

                        alert(result.data.Message);
                        window.location.reload();
                    } else {
                        alert(result.data.Message);
                        //toastr.error($scope.Message);
                    }
                }
            });

        };




        $scope.CreateVendor = function () {
         
            VendorService.CreateVendor($scope.obj).then(function (result) {

                    if (result.data.isSuccess) {
                        $scope.VendorObj = result.data.Data;
                        $location.path("/Vendors");
                        swal.fire("Vendor Created  Succesfully", "", "success");
                    }
                    else {
                        $scope.serverErrorMsgs = result.data.Message;
                    }

                });
        }

        $scope.UpdateVendor = function () {
            VendorService.UpdateVendor($scope.VendorObj.Vendor).then(function (result) {
                    if (result.status == 200) {
                        if (result.data.isSuccess) {
                            swal.fire("Vendor Updated  Succesfully", "", "success");
                            $location.path("/Vendors");
                        } else {
                            toastr.error(result.data.Message);
                        }
                    }
            });
        };

        $scope.GetAllVendors = function () {
            VendorService.GetAllVendors().then(function (result) {
                $scope.Vendors = result.data.Data;
            });
        };
        $scope.GetAllVendors();

        $scope.GetListOfTimings = function () {
            VendorService.GetListOfTimings().then(function (result) {
                $scope.Timings = result.data.Data;
            });
        };
        $scope.GetListOfTimings();

        $scope.GetVendorByVendor = function () {
            VendorService.GetVendorByVendorRegistrationId($scope.VendorRegistrationId).then(function (result) {
                $scope.VendorObj = result.data.Data;
            });
        };
        if ($scope.VendorRegistrationId != null)
        {
            $scope.GetVendorByVendor($scope.VendorRegistrationId);
        }
        
    }
]);



