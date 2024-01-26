var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'page/DangNhap.html',
            controller: 'DangNhapCtrl',
        }).when('/dangnhap', {
            templateUrl: 'page/DangNhap.html',
            controller: 'DangNhapCtrl'
        }).when('/dangky', {
            templateUrl: 'page/DangKy.html',
            controller: 'DangKyCtrl'
        }).when('/trangchu', {
            templateUrl: 'page/TrangChu.html',
            controller: 'TrangChuCtrl'
        })
});


myApp.controller('DangNhapCtrl', function ($scope, $http) {
    $scope.account = {
        userName: '',
        password: ''
    }
    $scope.DangNhap = function () {
        if ($scope.account.userName === '') {
            alertMessage("Vui lòng nhập lại Tên đăng nhập", "danger");
            return;
        }
        if ($scope.account.userName.length < 8) {
            alertMessage("Tên đăng nh ít nhất phải có 8 ký tự", "danger");
            return;
        }
        if ($scope.account.password === '') {
            alertMessage("Vui lòng nhập mật khẩu", "danger");
            return;
        }
        if ($scope.account.password.length < 8) {
            alertMessage("Mật khẩu ít nhất phải có 8 ký tự", "danger");
            return;
        }
        $http.get('http://localhost:3000/user/', {
            params: {
                userName: $scope.account.userName,
                password: $scope.account.password
            }
        }).then(function (response) {
            if (response.data.length) {
                alertMessage("Đăng nhập thành công", 'success');
                window.location.href = '#!../trangchu';
            }
            else
                alertMessage("Đăng nhập thất bại! \nTên đăng nhập hoặc mật khẩu không đúng", "danger");
        }).catch(function (data) { 
            alertMessage("Đăng nhập thất bại! \nCó lỗi xảy ra trong quá trình đăng nhập", "danger");
        })
    };
});

myApp.controller('DangKyCtrl', function ($scope, $http) {
    $scope.user = {
        id: '',
        password: '',
        role: 0
    };

    $scope.passwordAcp = '';

    $scope.DangKy = function () {
        $scope.id = crypto.randomUUID();
        if ($scope.user.id === '') {
            alertMessage("Vui lòng nhập lại Tên đăng nhập", "danger");
            return;
        }
        
        if ($scope.user.password === '') {
            alertMessage("Vui lòng nhập mật khẩu", "danger");
            return;
        }
        if ($scope.user.password.length < 8) {
            alertMessage("Mật khẩu ít nhất phải có 8 ký tự", "danger");
            return;
        }
        if ($scope.passwordAcp === '' || $scope.passwordAcp !== $scope.user.password) {
            alertMessage("Vui lòng nhập lại xác nhận mật khẩu", "danger");
            return;
        }
        $http.post('http://localhost:3000/user/', $scope.user).then(function (response) {
            window.location.href = '#!../dangnhap';
            alertMessage("Đăng ký thành công", 'success');
        }).catch(function (error) {
            alertMessage("Đăng ký thất bại, Tài khoản đã tồn tại");
        });
    };
});


myApp.controller('TrangChuCtrl', function ($scope, $http) {

});


