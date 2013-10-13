'use strict';
var viajar = angular.module('me-quede-sin-viajar.services',[]);


viajar.service('statsService', function($http) {
    return {
        getPeopleLeft: function(callback){
            var url = "/api/v1/stats/people";
            $http.get(url).success(function(data) {
                 callback(data);
            });
        }
    };
});