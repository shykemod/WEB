myApp.controller('TimKiemCtrl', function ($scope, $http, $rootScope, $routeParams) {
    $rootScope.Check();
    $scope.id = $routeParams.id;
    $http.get("http://localhost:3000/sanpham?q=" + $scope.id).then(function (response) {
        $scope.sptimkiem = response.data;
        $scope.sptimkiem.forEach(element => {
            element.price = $rootScope.formatPrice(element.price);
            element.soldCount = formatCount(element.soldCount);
        });
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });


    $scope.giaClicked = false;
    $scope.giaClickedText = "Giá tăng dần";
    $scope.buttonStyle = {
        gia: { 'border-color': '#ee4d2d', 'color': '#ee4d2d' },
        moiNhat: { 'border-color': '#ee4d2d', 'color': '#ee4d2d' },
        banChay: { 'border-color': '#ee4d2d', 'color': '#ee4d2d' }
    };

    $scope.setActiveButton = function (button) {
        for (var key in $scope.buttonStyle) {
            if ($scope.buttonStyle.hasOwnProperty(key)) {
                $scope.buttonStyle[key] = { 'border-color': '#ee4d2d', 'color': '#ee4d2d' };
            }
        }
        $scope.buttonStyle[button] = { 'background-color': '#ee4d2d', 'color': 'white' };

        if (button === 'gia') {
            $scope.giaClicked = !$scope.giaClicked;
            if ($scope.giaClicked) {
                $scope.giaClickedText = "Giá tăng dần";
                $http.get("http://localhost:3000/sanpham?_sort=price&q=" + $scope.id).then(function (response) {
                    $scope.sptimkiem = response.data;
                    $scope.sptimkiem.forEach(element => {
                        element.price = $rootScope.formatPrice(element.price);
                        element.soldCount = formatCount(element.soldCount);
                    });
                }).catch(function (error) {
                    alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
                });
            } else {
                $scope.giaClickedText = "Giá giảm dần";
                $http.get("http://localhost:3000/sanpham?_sort=price&_order=desc&q=" + $scope.id).then(function (response) {
                    $scope.sptimkiem = response.data;
                    $scope.sptimkiem.forEach(element => {
                        element.price = $rootScope.formatPrice(element.price);
                        element.soldCount = formatCount(element.soldCount);
                    });
                }).catch(function (error) {
                    alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
                });
            }
        } else {
            $scope.giaClicked = false;
            $scope.giaClickedText = "Giá tăng dần";
        }
        if (button === 'Huy') {
            $http.get("http://localhost:3000/sanpham?q=" + $scope.id).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = $rootScope.formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
        if (button === 'moiNhat') {
            $http.get("http://localhost:3000/sanpham?_limit=18&_sort=datePosted&q=" + $scope.id).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = $rootScope.formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
        if (button === 'banChay') {
            $http.get("http://localhost:3000/sanpham?_limit=18&_sort=soldCount&_order=desc&q=" + $scope.id).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = $rootScope.formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
    };
});
