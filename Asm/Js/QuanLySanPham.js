myApp.controller('qlsanphamCtrl', function ($scope, $rootScope, $http) {
    $rootScope.Check();

    $scope.NewSP = {
        id: 0,
        name: "",
        img: "",
        price: 0,
        count: 0,
        soldCount: 0,
        datePosted: "",
        danhmuc: ""
    }
    $scope.ObjSp = {
        id: 0,
        name: "",
        img: "",
        price: 0,
        count: 0,
        soldCount: 0,
        datePosted: "",
        danhmuc: ""
    }
    $scope.Load = function () {
        $http.get("http://localhost:3000/sanpham").then(function (response) {
            $scope.ListSanPham = response.data;
        }).catch(function (error) {
            alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            console.log(error);
        });

        $http.get("http://localhost:3000/danhmuc").then(function (response) {
            $scope.dsDanhmuc = response.data;
        }).catch(function (error) {
            alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            console.log(error);
        });
    }

    $scope.Load()

    $scope.Them = function () {
        if ($scope.NewSP.name == "") {
            alert("Vui lòng nhập Tên sản phẩm");
            return;
        }
        if (Number($scope.NewSP.price) <= 0) {
            alert("Vui lòng nhập Giá sản phẩm > 0");
            return;
        }
        if (Number($scope.NewSP.count) <= 0) {
            alert("Vui lòng nhập Số lượng sản phẩm > 0");
            return;
        }
        var fileInput = document.getElementById('AnhSp');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.NewSP.img = e.target.result;
                    $scope.NewSP.datePosted = new Date().toLocaleDateString('vi-VN'),
                        $http.post('http://localhost:3000/sanpham', $scope.NewSP).then(function (response) {
                            $scope.NewSP = {
                                id: 0,
                                name: "",
                                img: "",
                                price: 0,
                                count: 0,
                                soldCount: 0,
                                datePosted: "",
                                danhmuc: ""
                            }
                            fileInput.value = "";
                            $scope.Load();
                            alert("Thêm thành công");
                        }).catch(function (error) {
                            alert("Thêm thất bại");
                        });
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert("Vui lòng nhập ảnh");
            return;
        }
    }

    $scope.Xoa = function (id) {
        if (confirm("Bạn có chắc chắn muốn xóa") == true) {
            $http.delete("http://localhost:3000/sanpham/" + id).then(function (response) {
                $scope.Load();
                alert("Xóa thành công");
            }).catch(function (error) {
                alert("Có vẻ như đã xảy ra lỗi");
            });
        }
    };

    $scope.ViewSua = function (item) {
        $scope.ObjSp.id = item.id;
        $scope.ObjSp.name = item.name;
        $scope.ObjSp.img = item.img;
        $scope.ObjSp.price = item.price;
        $scope.ObjSp.count = item.count;
        $scope.ObjSp.danhmuc = item.danhmuc;
        $scope.ObjSp.datePosted = item.datePosted;
    }

    const suaBackdropModal = new bootstrap.Modal(document.getElementById('SuaBackdrop'), {
        keyboard: false
    });

    $scope.Sua = function () {
        if ($scope.ObjSp.name == "") {
            alert("Vui lòng nhập Tên sản phẩm");
            return;
        }
        if (Number($scope.ObjSp.price) <= 0) {
            alert("Vui lòng nhập Giá sản phẩm > 0");
            return;
        }
        if (Number($scope.ObjSp.count) <= 0) {
            alert("Vui lòng nhập Số lượng sản phẩm > 0");
            return;
        }

        var fileInput = document.getElementById('AnhSp2');
        var file = fileInput.files[0];

        var updateDanhMuc = function () {
            $http.put('http://localhost:3000/sanpham/' + $scope.ObjSp.id, $scope.ObjSp).then(function (response) {
                $scope.ObjSp = {
                    id: 0,
                    name: "",
                    img: "",
                    price: 0,
                    count: 0,
                    soldCount: 0,
                    datePosted: "",
                    danhmuc: ""
                };
                fileInput.value = "";
                $scope.Load();
                alert("Sửa thành công");
                suaBackdropModal.hide();
            }).catch(function (error) {
                alert("Sửa thất bại");
            });
        };

        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.ObjSp.img = e.target.result;
                    updateDanhMuc();
                });
            };
            reader.readAsDataURL(file);
        } else {
            updateDanhMuc();
        }
    };

});

//Done