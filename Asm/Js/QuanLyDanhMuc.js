
myApp.controller('qldanhmucCtrl', function ($scope, $http, $rootScope) {
    $rootScope.Check();
    $scope.NewDanhMuc = {
        id: "",
        name: "",
        img: ""
    }
    $scope.ObjDanhMuc = {
        id: "",
        name: "",
        img: ""
    }
    const suaBackdropModal = new bootstrap.Modal(document.getElementById('SuaBackdrop'), {
        keyboard: false
    });


    $scope.Load = function () {
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
    }

    $scope.Load();

    $scope.Them = function () {
        if ($scope.NewDanhMuc.id == "") {
            alert("Vui lòng nhập Đường dẫn");
            return;
        }
        if ($scope.NewDanhMuc.name == "") {
            alert("Vui lòng nhập Tên danh mục");
            return;
        }
        var fileInput = document.getElementById('AnhDanhMuc');
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.NewDanhMuc.img = e.target.result;
                    $http.post('http://localhost:3000/danhmuc', $scope.NewDanhMuc).then(function (response) {
                        $scope.NewDanhMuc = {
                            id: "",
                            name: "",
                            img: ""
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
    };

    $scope.ViewSua = function (item) {
        $scope.ObjDanhMuc.id = item.id;
        $scope.ObjDanhMuc.name = item.name;
        $scope.ObjDanhMuc.img = item.img;
    }

    $scope.Sua = function () {
        if ($scope.ObjDanhMuc.id == "") {
            alert("Vui lòng nhập Đường dẫn");
            return;
        }
        if ($scope.ObjDanhMuc.name == "") {
            alert("Vui lòng nhập Tên danh mục");
            return;
        }

        var fileInput = document.getElementById('AnhDanhMuc2');
        var file = fileInput.files[0];

        var updateDanhMuc = function () {
            $http.put('http://localhost:3000/danhmuc/' + $scope.ObjDanhMuc.id, $scope.ObjDanhMuc).then(function (response) {
                $scope.ObjDanhMuc = {
                    id: "",
                    name: "",
                    img: ""
                };
                fileInput.value = "";
                $scope.Load();
                alert("Sửa thành công");
                suaBackdropModal.hide();
            }).catch(function (error) {
                alert("Sửa thất bại, Đường dẫn đã tồn tại");
            });
        };

        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.ObjDanhMuc.img = e.target.result;
                    updateDanhMuc();
                });
            };
            reader.readAsDataURL(file);
        } else {
            updateDanhMuc();
        }
    };


    $scope.Xoa = function (id) {
        if (confirm("Bạn có chắc chắn muốn xóa") == true) {
            $http.delete("http://localhost:3000/danhmuc/" + id).then(function (response) {
                $scope.Load();
                alert("Xóa thành công");
            }).catch(function (error) {
                alert("Có vẻ như đã xảy ra lỗi");
            });
        }
    };

    $scope.getSoLuong = function (id) {
        try {
            return $scope.sanpham.filter((sp) => sp.danhmuc == id).length;
        } catch (error) {
            return 0;
        }
    };
});