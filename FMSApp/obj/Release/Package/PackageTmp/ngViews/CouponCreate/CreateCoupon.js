EzApp.factory('CouponService', [
    '$http', 'api', function ($http, api) {

        CouponObj = {};
      
        CouponObj.CreateCoupon = function (obj) {
            var Coupon;

            Coupon = $http({ method: 'Post', url: api + 'CustomerOrder/CreateCoupon', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Coupon;
        };
        CouponObj.CouponList = function () {
            var CouponList;

            CouponList = $http({ method: "Get", url: api + 'CustomerOrder/CouponList' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return CouponList;
        };
       

       


        return CouponObj;
    }]);

EzApp.controller('CouponController', [
    '$scope', '$rootScope', 'CouponService', '$cookies', 'filePath', '$location', '$routeParams','$filter',
    function ($scope, $rootScope, CouponService, $cookies, filePath, $location, $routeParams, $filter) {
        //$scope.DriverId = $routeParams.DriverId;
        //$scope.DeliveryHeroRegistrationId = $routeParams.DeliveryHeroRegistrationId;


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
        $scope.fromdate = date;




      
       

        


        $scope.CreateCoupon = function (obj) {


            CouponService.CreateCoupon($scope.obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.Coupon = result.data.Data;
                    swal.fire("Coupon Created Succesfull", "Success", "success");
                    $location.path('/Home');

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: $scope.serverErrorMsgs
                    });
                }

            });
           
        };

        $scope.CouponList = function () {

            CouponService.CouponList().then(function (result) {
                $scope.CouponLstObj = result.data.Data;
                
              
            });
        };
        $scope.CouponList();

    }

]);



