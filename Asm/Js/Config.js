var myApp = angular.module('myApp', ['ngRoute']);
myApp.run(function ($rootScope, $location) {
    $rootScope.giohang = [];
    $rootScope.isPage1 = function (url) {
        return !($location.path() === "/") && !($location.path() === "/dangky") && !($location.path() === "/dangnhap");
    }
    $rootScope.isPage2 = function () {
        return !($location.path() === "/giohang");
    }
    $rootScope.valueSearch = "";
    $rootScope.search = function (findText) {
        if (findText.length > 0) {
            window.location.href = '#!../timkiem/' + findText;
        }
    }
    $rootScope.Check = function () {
        $rootScope.UserId = window.localStorage.getItem('loginData');
        $rootScope.Role = window.localStorage.getItem('loginRole');
    }

    $rootScope.LogOut = function () {
        window.localStorage.setItem('loginData', "");
        window.localStorage.setItem('loginRole', "0");
        window.location.href = '#!../dangnhap';
    }

    $rootScope.formatPrice = function (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
});


myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'page/DangNhap.html',
            controller: 'DangNhapCtrl',
        }).when('/dangnhap', {
            templateUrl: 'page/DangNhap.html',
            controller: 'DangNhapCtrl',
        }).when('/dangky', {
            templateUrl: 'page/DangKy.html',
            controller: 'DangKyCtrl'
        }).when('/trangchu', {
            templateUrl: 'page/TrangChu.html',
            controller: 'TrangChuCtrl'
        }).when('/timkiem/:id', {
            templateUrl: 'page/TimKiem.html',
            controller: 'TimKiemCtrl'
        }).when('/chitiet/:id', {
            templateUrl: 'page/SanPhamChiTiet.html',
            controller: 'SanPhamChiTietCtrl'
        }).when('/giohang', {
            templateUrl: 'page/GioHang.html',
            controller: 'GioHangCtrl'
        }).when("/thanhtoan", {
            templateUrl: 'page/ThanhToan.html',
            controller: 'ThanhToanCtrl'
        }).when("/qldanhmuc", {
            templateUrl: 'page/QuanLyDanhMuc.html',
            controller: 'qldanhmucCtrl'
        }).when("/qldonhang", {
            templateUrl: 'page/QuanLyDonHang.html',
            controller: 'qldonhangCtrl'
        }).when("/qlsanpham", {
            templateUrl: 'page/QuanLySanPham.html',
            controller: 'qlsanphamCtrl'
        })
});

