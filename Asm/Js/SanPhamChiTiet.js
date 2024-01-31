myApp.controller('SanPhamChiTietCtrl', function ($scope, $rootScope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.spchitiet = {};
    $scope.soluong = 1;
    $rootScope.Check();
    $http.get("http://localhost:3000/sanpham/" + $scope.id).then(function (response) {
        $scope.spchitiet = response.data;
        $scope.spchitiet.priceOld = $scope.spchitiet.price / 5 + $scope.spchitiet.price;
        $scope.spchitiet.price = $rootScope.formatPrice($scope.spchitiet.price);
        $scope.spchitiet.soldCount = formatCount($scope.spchitiet.soldCount);
        $scope.spchitiet.priceOld = $rootScope.formatPrice($scope.spchitiet.priceOld);
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });

    $scope.ThemGioHang = function () {
        $http.get('http://localhost:3000/user/' + $rootScope.UserId).then(function (response) {
            $scope.UserData = response.data;
            for (var i = 0; i < $scope.UserData.giohang.length; i++) {
                if ($scope.UserData.giohang[i].idSanPham == Number($scope.id)) {
                    $scope.UserData.giohang[i].SoLuong += $scope.soluong
                    $http.put('http://localhost:3000/user/' + $rootScope.UserId, $scope.UserData).then(function (response) {
                        alertMessage("Thêm thành công", "success");
                    }).catch(function (error) {
                        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
                    });
                    return;
                }
            }
            var hang = {
                idSanPham: Number($scope.id),
                SoLuong: $scope.soluong
            }

            $scope.UserData.giohang.push(hang);
            $http.put('http://localhost:3000/user/' + $rootScope.UserId, $scope.UserData).then(function (response) {
                alertMessage("Thêm thành công", "success");
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }).catch(function (error) {
            alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
        });
    }

    $scope.increment = function () {
        if ($scope.soluong < $scope.spchitiet.count)
            $scope.soluong++;
    }

    $scope.decrement = function () {
        if ($scope.soluong > 1)
            $scope.soluong--;
    }
});
