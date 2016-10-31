(function () {
    'use strict';

    angular
        .module('main')
        .config(config);

    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }

})();