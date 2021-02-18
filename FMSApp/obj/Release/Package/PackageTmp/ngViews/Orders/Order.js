EzApp.factory('OrderService', [
    '$http', 'api', function ($http, api) {

        OrderObj = {};



        OrderObj.GetCustomerOrderDetails = function (CustomerOrderId) {
            var OrderDetails;

            OrderDetails = $http({
                method: 'Get', url: api + 'CustomerOrder/GetCustomerOrderDetails/?CustomerOrderId=' + CustomerOrderId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return OrderDetails;
        };

        return OrderObj;
    }]);

EzApp.controller('OrderController', [
    '$scope', '$rootScope', 'OrderService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, OrderService, $cookies, filePath, $location, $routeParams) {
       // $scope.CustomerOrderId = $routeParams.CustomerOrderId;


        $scope.GetCustomerOrderDetails = function (CustomerOrderId) {
            OrderService.GetCustomerOrderDetails($scope.CustomerOrderId).then(function (result) {
                $scope.OrderDetails = result.data.Data;
            });
         
        };
        $scope.GetCustomerOrderDetails();


    }
]);



