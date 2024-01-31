myApp.controller('DangKyCtrl', function ($scope, $http) {
    $scope.user = {
        id: '',
        password: '',
        role: 0,
        giohang: []
    };

    $scope.passwordAcp = '';

    $scope.DangKy = function () {
        if ($scope.user.id === '') {
            alertMessage("Vui lòng nhập lại Tên đăng nhập", "danger");
            return;
        }
        if ($scope.user.id < 4) {
            alertMessage("Tên đăng nhập ít nhất phải có 4 ký tự", "danger");
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
