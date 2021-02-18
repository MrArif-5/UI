EzApp.factory('HomeService', [
    '$http', 'api', function ($http, api) {

        HomeObj = {};

        HomeObj.GetTodayOrderListForAdmin = function (OrderDate,DriverId) {
            var home;

            home = $http({
                method: 'Get', url: api + 'CustomerOrder/GetTodayOrderListForAdmin?OrderDate=' + OrderDate + '&DriverId=' + DriverId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return home;
        };

        HomeObj.DriverList = function () {
            var HeroList;

            HeroList = $http({ method: "Get", url: api + 'CustomerOrder/DriverList' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return HeroList;
        };



        HomeObj.IsPaidUpdate = function (CustomerOrderId) {
            var Ispaid;

            Ispaid = $http({
                method: 'Get', url: api + 'CustomerOrder/IsPaidUpdate?CustomerOrderId=' + CustomerOrderId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Ispaid;
        };


        HomeObj.GetPercentageShare = function () {
            var Percentage;

            Percentage = $http({ method: "Get", url: api + 'CustomerOrder/GetPercentageShare' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Percentage;
        };


        HomeObj.CancelOrder = function (CustomerOrderId) {
            var orderCancel;
            orderCancel = $http({ method: 'Get', url: api + 'CustomerOrder/CancelOrder?CustomerOrderId=' + CustomerOrderId }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return orderCancel;
        };

        //HomeObj.GetOrderListWithPercentage = function (DriverId,OrderDate) {
        //    var percentage;
        //    percentage = $http({ method: 'Get', url: api + 'CustomerOrder/GetOrderListWithPercentage?DriverId=' + DriverId + '&OrderDate=' + OrderDate }).
        //        then(function (response) {

        //            return response;

        //        }, function (error) {

        //            return error;

        //        });
        //    return percentage;
        //};



        return HomeObj;
    }]);

EzApp.controller('HomeController', [
    '$scope', '$rootScope', 'HomeService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, HomeService, $cookies, filePath, $location, $routeParams) {

        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        curr_month++;
        var curr_year = d.getFullYear();
        if (curr_month < 10)
            curr_month = "0" + curr_month;
        if (curr_date < 10)
            curr_date = "0" + curr_date;
        var date = curr_month + "/" + curr_date + "/" + curr_year;
        var time = d.getTime();
        $scope.dateOfMyOrder = date;

        
        $scope.$watch('dateOfMyOrder', function (newValue, oldValue) {
            if (newValue !== oldValue) {

                //$scope.OrderDate = newValue;

                $scope.OrderDate = newValue;
                $scope.GetTodayOrderListForAdmin();

            }
        });

        $scope.TodayOrders = function () {
            $scope.DriverId = 0;
            HomeService.GetTodayOrderListForAdmin($scope.dateOfMyOrder, $scope.DriverId).then(function (result) {
                $scope.AllcustOrderList = result.data.Data;
            });

        },

        $scope.TodayOrders();

        

        $scope.GetTodayOrderListForAdmin = function () {

             HomeService.GetTodayOrderListForAdmin($scope.dateOfMyOrder, $scope.DriverId).then(function (result) {
                    $scope.AllcustOrderList = result.data.Data;
                });

            },
       
       


        $scope.GetAllOrders = function () {
            $scope.DriverId = 0;
            $scope.dateOfMyOrder = "";
            HomeService.GetTodayOrderListForAdmin().then(function (result) {
                $scope.AllcustOrderList = result.data.Data;
                
            });
        };

        $scope.CancelOrder = function (CustomerOrderId) {
            if (confirm("Are you sure?"))
                HomeService.CancelOrder(CustomerOrderId).then(function (result) {
                    $scope.Cancel = result.data.Data;
                    swal.fire("Order Cancel Successfully", "", "success");
                })
        }

        $scope.Reload = function () {
            location.reload(true);

        };
               
        $scope.ChangeStatus = function (CustomerOrderId) {
            HomeService.IsPaidUpdate(CustomerOrderId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.IsUpdate = result.data.Data;
                } 
                $scope.GetAllCustomerOrders();
            });
        };

        $scope.DriverList = function () {
            HomeService.DriverList().then(function (result) {
                $scope.Heros = result.data.Data;
            });
        };
        $scope.DriverList();

       


        $scope.today = new Date(); 
    }
                  
       


    
    
]);



