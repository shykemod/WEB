var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'page/TrangChu.html',
            controller: 'TrangChuCtrl'
        })
        .when('/trangchu', {
            templateUrl: 'page/TrangChu.html',
            controller: 'TrangChuCtrl'
        }).when('/phong', {
            templateUrl: 'page/QuanLyPhong.html',
            controller: 'QuanLyPhongCtrl'
        }).when('/dat-phong/:idphong', {
            templateUrl: 'page/DatPhong.html',
            controller: 'DatPhongCtrl'
        }).when('/lich-su-dat', {
            templateUrl: 'page/LichSuDatPhong.html',
            controller: 'LichSuDatPhongCtrl'
        })
});

myApp.controller('TrangChuCtrl', function ($scope, $http) {
    $http.get("http://localhost:3000/Phong").then(function (response) {
        $scope.danhsachphong = response.data;
    })
});

myApp.controller('QuanLyPhongCtrl', function ($scope, $http) {
    $http.get("http://localhost:3000/Phong").then(function (response) {
        $scope.danhsachphong = response.data;
    })
});

myApp.controller('DatPhongCtrl', function ($scope, $http, $routeParams) {

    $scope.khach = {
        tenKhach: '',
        sodienthoai: '',
        ngayDat: new Date().toLocaleDateString('VN'),
        idPhong: 0,
        soLuong: 1
    };

    $http.get("http://localhost:3000/Phong/" + $routeParams.idphong).then(function (response) {
        $scope.phong = response.data;
    })

    $scope.DatPhong = function () {
        if ($scope.khach.tenKhach.lenght < 0) {
            alert("Vui lòng nhập lại tên");
            return;
        }

        if ($scope.khach.sodienthoai.lenght < 10) {
            alert("Vui lòng nhập lại sdt");
            return;
        }

        if ($scope.khach.tenKhach.lenght < 0) {
            alert("Vui lòng nhập lại tên");
            return;
        }

        $scope.khach.idPhong = $scope.phong.id;
        $scope.phong.soLuong = $scope.phong.soLuong - $scope.khach.soLuong;
        $http.post("http://localhost:3000/DatPhong", $scope.khach).then(function (response) {
            $http.put("http://localhost:3000/Phong/" + $routeParams.idphong, $scope.phong);
            alert("Đặt thành công");
            window.location.href = '#!../trangchu';
        }).catch(function (error) {
            alert("Có lỗi xảy ra");
        });
    }
});

myApp.controller('LichSuDatPhongCtrl', function ($scope, $http) {
    $http.get("http://localhost:3000/DatPhong").then(function (response) {
        $scope.LichSu = response.data;
    })

    $scope.TraPhong = function (id) {
        var datphong = {};
        var phong = {};
        console.log(id)
        $http.get("http://localhost:3000/DatPhong/" + id).then(function (response) {
            datphong = response.data;
            $http.get("http://localhost:3000/Phong/" + datphong.idPhong).then(function (response) {
                phong = response.data;
                phong.soLuong = datphong.soLuong + phong.soLuong;
                $http.put("http://localhost:3000/Phong/" + datphong.idPhong, phong);
                $http.delete("http://localhost:3000/DatPhong/" + id).then(function (response) {
                }).catch(function (error) {
                    alert("Có lỗi xảy ra");
                });
            })
        })


    }
});