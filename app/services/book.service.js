(function () {
    'use strict';

    angular
        .module('main')
        .service('bookService', indicatorService);

    function indicatorService($q, $http) {

        return { 
            findAll: findAll
        };

        function findAll() {
            var deferred = $q.defer();

            $http.get('/api/books').then(success, error);

            function success(response) {
                deferred.resolve(response);
            }

            function error(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }
    }
})();