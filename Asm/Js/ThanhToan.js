
myApp.controller('ThanhToanCtrl', function ($scope, $http, $rootScope) {
    $rootScope.Check();
    $scope.TongTien = 0;
    $scope.bill = {
        idUser: $rootScope.UserId,
        ten: '',
        sdt: '',
        diachi: '',
        loinhan: '',
        sanpham: [],
        tongtien: 0
    };

    $http.get('http://localhost:3000/user/' + $rootScope.UserId).then(function (response) {
        $scope.UserData = response.data;
        $rootScope.giohang = [];
        $scope.UserData.giohang.forEach(element => {
            $http.get('http://localhost:3000/sanpham/' + element.idSanPham).then(function (response) {
                var hang = {
                    id: element.idSanPham,
                    ten: response.data.name,
                    gia: response.data.price,
                    soLuong: element.SoLuong,
                }
                $scope.TongTien += element.SoLuong * response.data.price;
                $scope.giohang.push(hang)
            });
        })
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });

    $scope.DatHang = function () {
        if ($scope.giohang.length == 0) {
            alertMessage("Bạn chưa có sản phẩm nào", "danger");
        }
        else {
            if ($scope.bill.ten == "") {
                alertMessage("Vui lòng nhập tên", "danger");
                return;
            }
            if ($scope.bill.sdt == "") {
                alertMessage("Vui lòng nhập số điện thoại", "danger");
                return;
            }
            if ($scope.bill.diachi == "") {
                alertMessage("Vui lòng nhập địa chỉ", "danger");
                return;
            }

            $scope.bill.sanpham = $scope.giohang;
            $scope.bill.tongtien = $scope.TongTien;

            $http.post('http://localhost:3000/bill', $scope.bill).then(function (response) {

                $http.get('http://localhost:3000/user/' + $rootScope.UserId).then(function (response) {
                    $scope.UserData.giohang.forEach(element => {
                        $http.put('http://localhost:3000/sanpham/' + element.idSanPham).then(function (response) {
                            response.data.count -= element.SoLuong;
                            response.data.soldCount += element.SoLuong;
                        });
                    })
                })
                $scope.UserData.giohang = [];
                $http.put('http://localhost:3000/user/' + $rootScope.UserId, $scope.UserData);
                window.location.href = '#!../trangchu';
                alertMessage("Đặt hàng thành công", "success");
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
    };

});
