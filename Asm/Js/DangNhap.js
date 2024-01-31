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
        if ($scope.account.userName.length < 4) {
            alertMessage("Tên đăng nhập ít nhất phải có 4 ký tự", "danger");
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
                window.localStorage.setItem('loginData', response.data[0].id);
                window.localStorage.setItem('loginRole', response.data[0].role);
                window.location.href = '#!../trangchu';
            }
            else
                alertMessage("Đăng nhập thất bại! \nTên đăng nhập hoặc mật khẩu không đúng", "danger");
        }).catch(function (data) {
            alertMessage("Đăng nhập thất bại! \nCó lỗi xảy ra trong quá trình đăng nhập", "danger");
        })
    };
});