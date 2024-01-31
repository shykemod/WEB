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
            element.price = $rootScope.formatPrice(element.price);
            element.soldCount = formatCount(element.soldCount);
        });
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });

    $http.get("http://localhost:3000/sanpham?_limit=18&_sort=datePosted").then(function (response) {
        $scope.spmoi = response.data;
        $scope.spmoi.forEach(element => {
            element.price = $rootScope.formatPrice(element.price);
            element.soldCount = formatCount(element.soldCount);
        });
    }).catch(function (error) {
        alertMessage("Có vẻ như đã xảy ra lỗi", "danger");
    });
});
