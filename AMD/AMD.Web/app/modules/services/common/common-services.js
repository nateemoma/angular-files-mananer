
angular.module('amdApp').service('commonServices', ['$modal', '$q', function ($modal, $q) {

    var service = {};

    service.modalConfirm = function (msg) {

        var deferred = $q.defer();

        $modal.open({
            templateUrl: 'app/modules/services/common/confirm-modal.html',
            size: 'md',
            backdrop: 'static',
            controller: function ($scope, $modalInstance) {

                $scope.msg = msg;

                $scope.ok = function () {
                    $modalInstance.close('ok');
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }).result.then(function (data) {
            deferred.resolve(data);
        }, function (data) {
            deferred.reject(data);
        });

        return deferred.promise;
    };
    return service;
}]);