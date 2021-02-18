EzApp.factory('OrderService', [
    '$http', 'api', function ($http, api) {

        OrderOBJ = {};
      
        OrderOBJ.GetCustomerOrderDetails = function (CustomerOrderId) {
            var OrderDetails;

            OrderDetails = $http({
                method: 'Get', url: api + 'CustomerOrder/GetCustomerOrderDetails?CustomerOrderId=' + CustomerOrderId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return OrderDetails;
        };
      

        return OrderOBJ;
    }]);

EzApp.controller('OrderDetailsController', [
    '$scope', '$rootScope', 'OrderService', '$location', '$cookies', '$filter', '$routeParams',
    function ($scope, $rootScope, OrderService, $location, $cookies, $filter, $routeParams) {

        $scope.CustomerOrderId = $routeParams.CustomerOrderId;


        $scope.GetCustomerOrderDetails = function () {
            OrderService.GetCustomerOrderDetails($scope.CustomerOrderId).then(function (result) {
                $scope.OrderDetails = result.data.Data;
               
            });
        };
        $scope.GetCustomerOrderDetails()

     

    }]);
