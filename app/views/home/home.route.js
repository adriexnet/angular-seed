(function () {
    'use strict';

    angular
      .module('main')
      .config(config);

    function config($stateProvider) {
        $stateProvider
        .state('home', {
            parent: 'singlePage',
            url: '/home',
            templateUrl: 'home.tpl.html',
            controller: 'HomeController', 
            controllerAs: 'vm'
        });
    }
})();