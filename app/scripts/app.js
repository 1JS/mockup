'use strict';

angular.module('mockupApp', [
        'ngRoute',
        'ui.bootstrap',
        'app.entity',
        'app.audit'
    ])
    .config([
        '$routeProvider',
        function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/entity.html',
                controller: 'MainCtrl'
            })
            .when('/audit', {
                templateUrl: 'views/audit.html',
                controller: 'AuditCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
