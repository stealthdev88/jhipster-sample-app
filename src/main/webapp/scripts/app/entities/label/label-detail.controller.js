'use strict';

angular.module('sampleapplicationApp')
    .controller('LabelDetailController', function ($scope, $rootScope, $stateParams, entity, Label, Operation) {
        $scope.label = entity;
        $scope.load = function (id) {
            Label.get({id: id}, function(result) {
                $scope.label = result;
            });
        };
        $rootScope.$on('sampleapplicationApp:labelUpdate', function(event, result) {
            $scope.label = result;
        });
    });
