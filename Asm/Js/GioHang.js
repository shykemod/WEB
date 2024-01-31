myApp.controller('GioHangCtrl', function ($scope, $rootScope, $http) {
    $rootScope.Check();
    $scope.TongTien = 0;
    $http.get('http://localhost:3000/user/' + $rootScope.UserId).then(function (response) {
        $scope.UserData = response.data;
        console.log($scope.UserData)
        $rootScope.giohang = [];
        $scope.UserData.giohang.forEach(element => {
            $http.get('http://localhost:3000/sanpham/' + element.idSanPham).then(function (response) {
                var hang = {
                    id: element.idSanPham,
                    ten: response.data.name,
                    img: response.data.img,
                    gia: response.data.price,
                    soLuong: element.SoLuong,
                }
                $scope.TongTien += element.SoLuong * response.data.price;
                $scope.giohang.push(hang)
            });
        })
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
        console.log(error);
    });

    $scope.Xoa = function (id) {
        var tempGioHang = [];
        $scope.UserData.giohang.forEach(element => {
            if (element.idSanPham != id) {
                tempGioHang.push(element);
            }
        })
        $scope.UserData.giohang = tempGioHang;
        console.log($scope.UserData);
        $http.put('http://localhost:3000/user/' + $rootScope.UserId, $scope.UserData).then(function (response) {
        }).catch(function (error) {
            alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
        });
    }

    $scope.MuaHang = function () {
        if ($scope.giohang.length == 0) {
            alertMessage("Bạn chưa có sản phẩm nào", "danger");
        }
        else {
            window.location.href = '#!../thanhtoan'
        }
    }
});
