EzApp.factory('HomeService', [
    '$http', 'api', function ($http, api) {

        HomeObj = {};

        HomeObj.GetOrderListByDate = function (OrderDate) {
            var home;

            home = $http({
                method: 'Get', url: api + 'CustomerOrder/GetOrderListByDate?OrderDate=' + OrderDate
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return home;
        };
        HomeObj.AllOrders = function () {
            var home;

            home = $http({
                method: 'Get', url: api + 'CustomerOrder/AllOrders'
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return home;
        };

        HomeObj.GetDriverOrdersAndKilometer = function (DriverId) {
            var home;

            home = $http({
                method: 'Get', url: api + 'CustomerOrder/GetDriverOrdersAndKilometer?DriverId=' + DriverId
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

        HomeObj.GetOrdersListBy = function (FromDate, ToDate) {
            var orders;
            orders = $http({ method: 'Get', url: api + 'CustomerOrder/GetOrdersListBy?FromDate=' + FromDate + '&ToDate=' + ToDate }).
                then(function (response) {

                    return response;

                }, function (error) {

                    return error;

                });
            return orders;
        };



        return HomeObj;
    }]);

EzApp.controller('HomeController', [
    '$scope', '$rootScope', 'HomeService', '$cookies', 'filePath', '$location', '$routeParams','$cookieStore',
    function ($scope, $rootScope, HomeService, $cookies, filePath, $location, $routeParams, $cookieStore) {
        $scope.today = new Date();
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
        $scope.Currendate = date;

        $scope.$watch('dateOfMyOrder', function (newValue, oldValue) {
            if (newValue !== oldValue) {

                $scope.OrderDate = newValue;
                $cookies.put("OrderDate", $scope.OrderDate);
                //$cookies.put("dateOfMyOrder", $scope.dateOfMyOrder);
                $scope.dateOfMyOrder = newValue;
                $scope.StoreDateOrders();
                //$scope.GetOnlyTodayOrders();

            }
        });

        $scope.$watch('ToDate', function (FromDate, ToDate) {
            if (FromDate !== ToDate) {

                $cookieStore.remove('dateOfMyOrder');

                $cookies.put("FromDate", $scope.FromDate);
                $cookies.put("ToDate", $scope.ToDate);


                $scope.GetOrdersListBy();

            }
        });

        $scope.TodayOrders = function () {
            $cookies.remove('FromDate');
            $cookies.remove('ToDate');
            $cookies.remove('dateOfMyOrder');
            $scope.dateOfMyOrder = $scope.Currendate;
            HomeService.GetOrderListByDate($scope.dateOfMyOrder).then(function (result) {
                $scope.AllcustOrderList = result.data.Data;
            });
        },
         

        $scope.StoreDateOrders = function () {

            $scope.dateOfMyOrder = $cookies.get("OrderDate");
         
            if ($scope.OrderDate != undefined) {

                HomeService.GetOrderListByDate($scope.dateOfMyOrder).then(function (result) {
                    $scope.AllcustOrderList = result.data.Data;
                });

            }
        },
            $scope.StoreDateOrders();



        $scope.GetAllOrders = function () {
            $cookies.remove('FromDate');
            $cookies.remove('ToDate');
            $cookies.remove('dateOfMyOrder');
            $scope.remove = $cookies.get("OrderDate");
            HomeService.AllOrders().then(function (result) {
                $scope.AllcustOrderList = result.data.Data;
            });

        };



        $scope.CancelOrder = function (CustomerOrderId) {
            if (confirm("Are you sure?"))
                HomeService.CancelOrder(CustomerOrderId).then(function (result) {
                    $scope.Cancel = result.data.Data;
                    $scope.TodayOrders();
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
        $scope.OrderDate = $cookies.get("OrderDate");

        if ($scope.OrderDate == undefined) {
          
                $cookies.remove('FromDate');
                $cookies.remove('ToDate');
                $cookies.remove('dateOfMyOrder');
                $scope.dateOfMyOrder = $scope.Currendate;
                $scope.DriverId = 0;
                $scope.TodayOrders();
            
        }

       
       
            
           

        $scope.GetOrdersListBy = function () {
            //$cookies.remove('dateOfMyOrder');
            HomeService.GetOrdersListBy($scope.FromDate, $scope.ToDate).then(function (result) {
                $scope.AllcustOrderList = result.data.Data;
            });

        };

       
        
        $scope.Home = function () {


            $scope.FromDate = $cookies.get("FromDate"); 
            $scope.ToDate = $cookies.get("ToDate");
            if ($scope.FromDate != undefined && $scope.ToDate != undefined)
            {
                $scope.GetOrdersListBy();
            }
            else {
                $scope.StoreDateOrders();
            }

        };

        $scope.Home();
        
        $scope.GetDriverOrdersAndKilometer = function (DriverId) {
            HomeService.GetDriverOrdersAndKilometer(DriverId).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.AllcustOrderList = result.data.Data;
                    $scope.DriverKm = $scope.AllcustOrderList.DriverRunKm;
                }
                //$scope.GetDriverOrdersAndKilometer();
            });
        };

        $scope.DriverList = function () {
            HomeService.DriverList().then(function (result) {
                $scope.Heros = result.data.Data;
            });
        };
        $scope.DriverList();
    }
    
]);



