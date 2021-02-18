EzApp.factory('MarketingService', [
    '$http', 'api', function ($http, api) {

        UserObj = {};



        UserObj.UploadImagesForMarketings = function (obj) {
            var Hero;

            Hero = $http({ method: 'Post', url: api + 'Agent/UploadImagesForMarketings', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Hero;
        };



        return UserObj;
    }]);

EzApp.controller('MarketingController', [
    '$scope', '$rootScope', 'MarketingService', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, MarketingService, $cookies, filePath, $location, $routeParams) {
       
        $scope.filePath = filePath;


        $scope.uploadme = null;
        $scope.ImageUrlObj = {
            Documents: "",
            FilePath: "",
            FileType: ""
        };

       

        $scope.$watch('uploadme', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg") {
                    var obj = "";
                }

            }
        }, true);

        $scope.$watch('ImageUrl', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.ImageUrlObj = {
                        Documents: document,
                        FilePath: upload,
                        FileType: filetype
                    };
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: "Can only accept .png or .jpeg or .pdf files"
                    });
                }
            }
        }, true);


        $scope.UploadImagesForMarketings = function () {
                $scope.MarketingObj = {

                    "ActionType": $scope.ActionType,
                    "Action": $scope.Action,
                    "Fromdate": $scope.Fromdate,
                    "ToDate": $scope.ToDate,
                    "ImageUrl": $scope.ImageUrlObj.FilePath
                    
                };

                MarketingService.UploadImagesForMarketings($scope.MarketingObj).then(function (result) {


                    if (result.data.isSuccess) {
                        $scope.obj = result.data.Data;
                        swal.fire("Slider Added Succesfully", "", "success");
                       

                    } else {
                        $scope.serverErrorMsgs = result.data.Message;
                    }



                });
            
        }







    }]);