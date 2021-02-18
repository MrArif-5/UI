EzApp.factory('PaymentService', [
    '$http', 'api', function ($http, api) {

     
        PaymentObj = {};
       

        PaymentObj.GetListOfDriverPercentageSum = function (fromdate,todate,DriverId) {
            var Herodetails;

            Herodetails = $http({
                method: "Get", url: api + 'CustomerOrder/GetListOfDriverPercentageSum?fromdate=' + fromdate + '&todate=' + todate + '&DriverId=' + DriverId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Herodetails;
        };
      

        return PaymentObj;
    }]);

EzApp.controller('PaymentController', [
    '$scope', '$rootScope', 'PaymentService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, PaymentService, $cookies, filePath, $location, $routeParams) {
        $scope.DriverId = $routeParams.DriverId;
        $scope.DeliveryHeroRegistrationId = $routeParams.DeliveryHeroRegistrationId;


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
        $scope.todate = date;


        $scope.fromdate = $cookies.get("fromdate");

        $scope.$watch('fromdate', function (newValue, oldValue,) {
            if (newValue !== oldValue || newValue == oldValue ) {

               
                    $scope.fromdate = newValue;
                    $cookies.put("fromdate", $scope.fromdate);
                    
                    $scope.GetListOfDriverPercentageSum();
               

            }
        });


        $scope.GetListOfDriverPercentageSum = function () {
            //$scope.fromdate = $cookies.get("fromdate");
            PaymentService.GetListOfDriverPercentageSum($scope.fromdate, $scope.todate, $scope.DeliveryHeroRegistrationId).then(function (result) {
                
                $scope.PercentageDetails = result.data.Data;
               
            });
        };
       

        //$scope.ClearCookies = function () {
        //    $cookies.remove('fromdate');
        //};

    }

]);



