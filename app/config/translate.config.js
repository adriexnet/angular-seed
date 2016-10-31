(function () {
    'use strict';

    angular
      .module('main')
      .config(config);

    function config($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }

})();