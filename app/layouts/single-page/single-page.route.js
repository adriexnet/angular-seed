(function () {
    'use strict';

    angular
        .module('main')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('singlePage', {
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'single-page.tpl.html'
                    },
                    'header@singlePage': {
                        templateUrl: '../header.tpl.html'
                    },
                    'footer@singlePage': {
                        templateUrl: '../footer.tpl.html'
                    }
                }
            });
    }
})();