'use strict';

angular.module('app.entity', [])
    .controller('MainCtrl', [
        '$scope', '$modal',
        function ($scope, $modal) {

            $scope.properties = [
                {
                    key: 'Key1',
                    val: 'Value1'
                },
                {
                    key: 'Key2',
                    val: 'Value2'
                },
                {
                    key: 'Key3',
                    val: 'Value3'
                }
            ]

            $scope.add = function(property) {
                var modalInstance = $modal.open({
                    templateUrl: 'addProperty.html',
                    controller: 'addPropertyCtrl'
                });

                modalInstance.result.then(function (property){
                    $scope.properties.push(property);
                });
            };

            $scope.edit = function(property) {
                var modalInstance = $modal.open({
                    templateUrl: 'editProperty.html',
                    controller: 'editPropertyCtrl',
                    resolve: {
                        property: function () {
                            return property;
                        }
                    }
                });

                modalInstance.result.then(function (newProperty){
                    var index = $scope.properties.indexOf(property);
                    $scope.properties.splice(index, 1, newProperty);
                });
            };

            $scope.remove = function(property) {
                var modalInstance = $modal.open({
                    templateUrl: 'removeProperty.html',
                    controller: 'removePropertyCtrl'
                });

                modalInstance.result.then(function (remove){
                    if(remove) {
                        var index = $scope.properties.indexOf(property);
                        $scope.properties.splice(index, 1);
                    }
                });
            };
        }
    ])
    .controller('addPropertyCtrl', [
        '$scope', '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.property = {
                key: '',
                val: ''
            }

            $scope.add = function(property) {
                $modalInstance.close($scope.property);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ])
    .controller('editPropertyCtrl', [
        '$scope', '$modalInstance', 'property',
        function ($scope, $modalInstance, property) {
            $scope.newProperty = angular.copy(property);

            $scope.save = function() {
                $modalInstance.close($scope.newProperty);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ])   
    .controller('removePropertyCtrl', [
        '$scope', '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.yes = function() {
                $modalInstance.close(true);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);


angular.module('app.audit', [])
    .controller('AuditCtrl', [
        '$scope', '$modal',
        function ($scope, $modal) {
            $scope.revert = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'revertProperty.html',
                    controller: 'revertPropertyCtrl'
                });
            };
        }
    ])
    .controller('revertPropertyCtrl', [
        '$scope', '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.revert = function() {
                $modalInstance.close();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);