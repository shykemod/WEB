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

myApp.controller('DangKyCtrl', function ($scope, $http) {
    $scope.user = {
        id: '',
        password: '',
        role: 0,
        giahang: []
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


myApp.controller('TrangChuCtrl', function ($scope, $http, $rootScope) {
    $rootScope.Check();
    $http.get("http://localhost:3000/danhmuc").then(function (response) {
        $scope.danhmuc = response.data;
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });
    $http.get("http://localhost:3000/sanpham?_limit=18&_sort=soldCount&_order=desc").then(function (response) {
        $scope.banchay = response.data;
        $scope.banchay.forEach(element => {
            element.price = formatPrice(element.price);
            element.soldCount = formatCount(element.soldCount);
        });
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });

    $http.get("http://localhost:3000/sanpham?_limit=18&_sort=datePosted").then(function (response) {
        $scope.spmoi = response.data;
        $scope.spmoi.forEach(element => {
            element.price = formatPrice(element.price);
            element.soldCount = formatCount(element.soldCount);
        });
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });
});

myApp.controller('TimKiemCtrl', function ($scope, $http, $rootScope, $routeParams) {
    $rootScope.Check();
    $scope.id = $routeParams.id;
    $http.get("http://localhost:3000/sanpham?q=" + $scope.id).then(function (response) {
        $scope.sptimkiem = response.data;
        $scope.sptimkiem.forEach(element => {
            element.price = formatPrice(element.price);
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
                $http.get("http://localhost:3000/sanpham?_sort=price&danhmuc=" + $scope.danhMuc).then(function (response) {
                    $scope.sptimkiem = response.data;
                    $scope.sptimkiem.forEach(element => {
                        element.price = formatPrice(element.price);
                        element.soldCount = formatCount(element.soldCount);
                    });
                }).catch(function (error) {
                    alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
                });
            } else {
                $scope.giaClickedText = "Giá giảm dần";
                $http.get("http://localhost:3000/sanpham?_sort=price&_order=desc&danhmuc=" + $scope.danhMuc).then(function (response) {
                    $scope.sptimkiem = response.data;
                    $scope.sptimkiem.forEach(element => {
                        element.price = formatPrice(element.price);
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
            $http.get("http://localhost:3000/sanpham?danhmuc=" + $scope.danhMuc).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
        if (button === 'moiNhat') {
            $http.get("http://localhost:3000/sanpham?_limit=18&_sort=datePosted&danhmuc=" + $scope.danhMuc).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
        if (button === 'banChay') {
            $http.get("http://localhost:3000/sanpham?_limit=18&_sort=soldCount&_order=desc&danhmuc=" + $scope.danhMuc).then(function (response) {
                $scope.sptimkiem = response.data;
                $scope.sptimkiem.forEach(element => {
                    element.price = formatPrice(element.price);
                    element.soldCount = formatCount(element.soldCount);
                });
            }).catch(function (error) {
                alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            });
        }
    };
});


myApp.controller('SanPhamChiTietCtrl', function ($scope, $rootScope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.spchitiet = {};
    $scope.soluong = 1;
    $rootScope.Check();
    $http.get("http://localhost:3000/sanpham/" + $scope.id).then(function (response) {
        $scope.spchitiet = response.data;
        $scope.spchitiet.priceOld = $scope.spchitiet.price / 5 + $scope.spchitiet.price;
        $scope.spchitiet.price = formatPrice($scope.spchitiet.price);
        $scope.spchitiet.soldCount = formatCount($scope.spchitiet.soldCount);
        $scope.spchitiet.priceOld = formatPrice($scope.spchitiet.priceOld);
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
        })
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

myApp.controller('GioHangCtrl', function ($scope, $rootScope, $http) {
    $rootScope.Check();
    $scope.TongTien = 0;
    $http.get('http://localhost:3000/user/' + $rootScope.UserId).then(function (response) {
        $scope.UserData = response.data;
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

    $scope.formatPrice = function (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
});


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

    $scope.formatPrice = function (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

});


myApp.controller('qldanhmucCtrl', function ($scope, $http, $rootScope) {
    $rootScope.Check();
    $scope.NewDanhMuc = {
        id: "",
        name: "",
        img: ""
    }
    $http.get("http://localhost:3000/danhmuc").then(function (response) {
        $scope.danhmuc = response.data;
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });
    $http.get("http://localhost:3000/sanpham").then(function (response) {
        $scope.sanpham = response.data;
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });
    
    $scope.getSoLuong = function (id) {
        return $scope.sanpham.filter((sp) => sp.danhmuc == id).length;
    };
});