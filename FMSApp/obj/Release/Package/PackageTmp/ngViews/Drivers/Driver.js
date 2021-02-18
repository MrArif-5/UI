EzApp.factory('Userservice', [
    '$http', 'api', function ($http, api) {

        UserObj = {};



        UserObj.CreateDeliveryHero = function (obj) {
            var Hero;

            Hero = $http({ method: 'Post', url: api + 'Agent/CreateDeliveryHero', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return Hero;
        };

        UserObj.UpdateDriver = function (obj) {
            var driver;

            driver = $http({ method: 'POST', url: api + 'CustomerOrder/UpdateDriver', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return driver;
        };

        UserObj.UpdateDriverWalletByAdmin = function (obj) {
            var driver;

            driver = $http({ method: 'POST', url: api + 'CustomerOrder/UpdateDriverWalletByAdmin', data: obj }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return driver;
        };

        UserObj.DriverList = function () {
            var HeroList;

            HeroList = $http({ method: "Get", url: api + 'CustomerOrder/DriverList' }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return HeroList;
        };

        UserObj.DriverDetails = function (DeliveryHeroRegistrationId) {
            var Herodetails;

            Herodetails = $http({
                method: "Get", url: api + 'CustomerOrder/DriverDetails?DeliveryHeroRegistrationId=' + DeliveryHeroRegistrationId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Herodetails;
        };

        UserObj.GetOrderListByDriverId = function (DriverId) {
            var driverOrderList;

            driverOrderList = $http({
                method: "Get", url: api + 'CustomerOrder/GetOrderListByDriverId?DriverId=' + DriverId
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return driverOrderList;
        };

        UserObj.DriverBlockAndUnblock = function (DriverId,IsActive ) {
            var driverOrderList;

            driverOrderList = $http({
                method: "Get", url: api + 'CustomerOrder/DriverBlockAndUnblock?DriverId=' + DriverId + '&IsActive=' + IsActive 
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return driverOrderList;
        };

        UserObj.DriverIsCOD = function (DriverId, isPrime) {
            var Prime;

            Prime = $http({
                method: "Get", url: api + 'CustomerOrder/DriverIsCOD?DriverId=' + DriverId + '&isPrime=' + isPrime
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return Prime;
        };


        UserObj.DeleteDriver = function (Id) {
            var deactive;

            deactive = $http({
                method: 'Get', url: api + 'Lookup/DeleteDriver/' + Id
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return deactive;
        };



        return UserObj;
    }]);

EzApp.controller('DriverController', [
    '$scope', '$rootScope', 'Userservice', '$cookies', 'filePath', '$location', '$routeParams',
    function ($scope, $rootScope, Userservice, $cookies, filePath, $location, $routeParams) {
        $scope.DeliveryHeroRegistrationId = $routeParams.DeliveryHeroRegistrationId;
        $scope.DriverId = $routeParams.DriverId;
        $scope.filePath = filePath;
        
      
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
        $scope.Date = date;

      
        $scope.DriverList = function () {
            Userservice.DriverList().then(function (result) {
                $scope.Heros = result.data.Data;
            });
        };
        $scope.DriverList();
        $scope.DriverDetails = function () {
            Userservice.DriverDetails($scope.DeliveryHeroRegistrationId).then(function (result) {
                $scope.Hero = result.data.Data;
            });
        };
        $scope.DriverDetails();
        $scope.GetOrderListByDriverId = function () {
            Userservice.GetOrderListByDriverId($scope.DriverId).then(function (result) {
                $scope.DriverOrder = result.data.Data;
          

            });
        };
       



        $scope.uploadme = null;
        $scope.AadharPicObj = {
            Documents: "",
            FilePath: "",
            FileType: ""
        };

        $scope.LicensePicObj = {
            Documents: "",
            FilePath: "",
            FileType: ""
        };

        $scope.PanPicObj = {
            Documents: "",
            FilePath: "",
            FileType: ""
        };

        $scope.RcPicObj = {
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
        $scope.$watch('AdharCard', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.AadharPicObj = {
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
        $scope.$watch('License', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.LicensePicObj = {
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
        $scope.$watch('Pan', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.PanPicObj = {
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
        $scope.$watch('Rc', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.RcPicObj = {
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
        $scope.$watch('Photo', function (upload) {
            if (upload !== undefined) {
                if (upload === null) {
                    return;
                }
                var file = upload.split(';')[0];
                var filetype = file.split('/')[1];
                if (filetype === "png" || filetype === "jpeg" || filetype === "jpg" || filetype === "pdf") {

                    var document = JSON.stringify(upload);

                    $scope.PhotoObj = {
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


        $scope.CreateDeliveryHero = function (IsValid) {
            if (IsValid) {

                $scope.HeroObj = {

                    "DeliveryHeroRegistrationId": $scope.DeliveryHeroRegistrationId,
                    "HeroName": $scope.HeroName,
                    "Wallet": $scope.Wallet,
                    "IMEI": $scope.IMEI,
                    "MobileNo": $scope.MobileNo,
                    "Password": $scope.Password,
                    "WhatsappNo": $scope.WhatsappNo,
                    "DOB": $scope.DOB,
                    "PlateNo": $scope.PlateNo,
                    "AdharCard": $scope.AdharCard,
                    "DrivingLicense": $scope.DrivingLicense,
                    "PanCard": $scope.PanCard,
                    "RegCert": $scope.RegCert,
                    "Photo": $scope.Photo
                };
                
            Userservice.CreateDeliveryHero($scope.HeroObj).then(function (result) {

                    if (result.data.isSuccess) {
                        $scope.obj = result.data.Data;
                        $location.path("/Drivers");
                        swal.fire("Driver Created  Succesfully", "", "success");

                        // $scope.Users = undefined;

                    }
                    else
                    {
                        $scope.serverErrorMsgs = result.data.Message;
                    }

                });
        }
        }
       
        $scope.DriverUpdate = function () {

            $scope.DriverUpdate = {
                DeliveryHeroRegistrationId: $scope.Hero.DeliveryHeroRegistrationId,
                "Photo": $scope.Hero.Photo,
                "HeroName": $scope.Hero.HeroName,
                "AdharCard": $scope.Hero.AdharCard,
                "PanCard": $scope.Hero.PanCard,
                "DrivingLicense": $scope.Hero.DrivingLicense,
                "RegCert": $scope.Hero.RegCert,
                "Photo": $scope.Hero.Photo,
                "DOB": $scope.Hero.DOB,
                "PlateNo": $scope.Hero.PlateNo,
                "Wallet": $scope.Hero.Wallet,
                "MobileNo": $scope.Hero.MobileNo,
                "IMEI": $scope.Hero.IMEI,
                "Password": $scope.Hero.Password
            }

            Userservice.UpdateDriver($scope.DriverUpdate).then(function (result) {
              
                    if (result.status == 200) {

                        if (result.data.isSuccess) {
                            $location.path("/Drivers");
                            
                        } else {
                            toastr.error(result.data.Message);
                        }
                    }
            });
        };
       
        $scope.RemoveDoc = function (DocObject) {
            DocObject.FilePath = "";
            DocObject.Documents = "";
            DocObject.FileType = "";
        };
      

        $scope.BlockAndUnblock = function (IsActive)
        {
            $scope.IsActive = IsActive;


            Userservice.DriverBlockAndUnblock($scope.DeliveryHeroRegistrationId, $scope.IsActive,
            ).then(function (result)
            {
                if (IsActive != false)
                {
                    Swal.fire("Driver Active", "", "success");
                    $scope.Status = result.data.Data;
                }
                else 
                {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire("Driver Blocked", "", "success");
                }

                });
           }

        $scope.UpdateDriverWalletByAdmin = function (obj) {

            //if (IsValid) {

            Userservice.UpdateDriverWalletByAdmin($scope.obj).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.walletUpdate = result.data.Data;

                        swal.fire("Rechagre Succesfull", "Success", "success");
                        $location.path('/Drivers');

                    } else {
                        $scope.serverErrorMsgs = result.data.Message;
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: $scope.serverErrorMsgs
                        });
                    }

                });
           // }
        };
        $scope.Reload = function () {
            location.reload(true);

        };



        $scope.DeleteDriver = function (Id) {
            if (confirm("Are you sure want to Deleted"))

            Userservice.DeleteDriver(Id).then(function (result) {
                if (result.data.isSuccess) {
                    $scope.DriversDeleted = result.data.Data;
                    location.reload(true);
                    swal.fire("Driver Deleted", "Success", "success");
                    
                    

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: $scope.serverErrorMsgs
                    });
                }

            });
            // }
        };


        $scope.toggle = {};
        $scope.toggle.switch = false;
       
        $scope.DriverIsCOD = function (isPrime) {
            $scope.isPrime = isPrime;
            Userservice.DriverIsCOD($scope.DeliveryHeroRegistrationId,$scope.isPrime,
            ).then(function (result) {
                if (isPrime != false) {
                    Swal.fire("Prime Driver", "", "success");
                    $scope.Status = result.data.Data;
                }
                else {
                    $scope.serverErrorMsgs = result.data.Message;
                    Swal.fire("Not-Prime", "", "success");
                }
            });
        }
       
      


    }]);