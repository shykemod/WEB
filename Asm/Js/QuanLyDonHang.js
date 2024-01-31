myApp.controller('qldonhangCtrl', function ($scope, $rootScope, $http) {
    $rootScope.Check();
    $scope.billInfo = {
        idUser: "",
        ten: "",
        sdt: "",
        diachi: "",
        loinhan: "",
        sanpham: [
        ],
        tongtien: 0,
        id: 0
    };

    const InfoBackdropModal = new bootstrap.Modal(document.getElementById('InfoBackdrop'), {
        keyboard: false
    });

    $http.get("http://localhost:3000/bill").then(function (response) {
        $scope.ListDonHang = response.data;
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
        console.log(error);
    });


    $scope.ShowInfo = function (id) {
        $http.get("http://localhost:3000/bill/" + id).then(function (response) {
            $scope.billInfo = response.data;
        }).catch(function (error) {
            alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
            console.log(error);
        });
        InfoBackdropModal.show()
    }
});