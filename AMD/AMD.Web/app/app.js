(function () {

    'use strict'

    angular.module('amdApp', [
        'angularTreeview',
        'ng-context-menu',
        'ui.bootstrap',
        'ngRoute'
    ])
    .config(['$routeProvider', function ($routeProvider) {


        //$routeProvider.otherwise({ redirectTo: '/home' });
    }]);

})()