EzApp.factory('CustomerService', [
    '$http', 'api', function ($http, api) {

        customerOBJ = {};

        customerOBJ.GetAllCustomerList = function () {
            var CustomerList;

            CustomerList = $http({ method: "Get", url: api + 'CustomerOrder/GetAllCustomerList' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return CustomerList;
        };

        customerOBJ.SendNotification = function (obj) {
            var msg;

            msg = $http({ method: 'Post', url: api + 'CustomerOrder/SendNotification', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return msg;
        };



        customerOBJ.CustomerDetails = function (CustomerId) {
            var OrderDetails;

            OrderDetails = $http({
                method: 'Get', url: api + 'CustomerOrder/CustomerDetails/?CustomerId=' + CustomerId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return OrderDetails;
        };





        return customerOBJ;
    }]);

EzApp.controller('CustomerController', [
    '$scope', '$rootScope', 'CustomerService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, CustomerService, $cookies, filePath, $location, $routeParams) {
        $scope.CustomerId = $routeParams.CustomerId;


        $scope.CustomerDetails = function (CustomerId) {
            CustomerService.CustomerDetails($scope.CustomerId).then(function (result) {
                $scope.MyOrder = result.data.Data;
            });

        };
        $scope.CustomerDetails();
    


        $scope.GetAllCustomerList = function () {
            CustomerService.GetAllCustomerList().then(function (result) {
                $scope.CustomerList = result.data.Data;

            });
        };
        $scope.GetAllCustomerList();




        $scope.SendNotification = function (obj) {
            obj.ListOfCustomers = $scope.CustomerList.filter(elem => elem.IsSelect == true);
            CustomerService.SendNotification(obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.obj = result.data.Data;
                    swal.fire("Notification Send Success", "", "success");
                   
                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    swal.fire("Sorry Try Again");
                }

            });
        };

        $scope.toggleAll = function () {
            var toggleStatus = !$scope.isAllSelected;
            angular.forEach($scope.CustomerList, function (c) { c.IsSelect = toggleStatus; });
        }


        $scope.optionToggled = function () {
            $scope.isAllSelected = $scope.CustomerList.every(function (c) { return c.IsSelect; })
        }
  
      
    }]);




   