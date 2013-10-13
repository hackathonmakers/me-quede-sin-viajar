'use strict';

angular.module('me-quede-sin-viajar', ['me-quede-sin-viajar.controllers', 'me-quede-sin-viajar.services'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/stats/', {
    templateUrl: '/views/main.html',
    controller: 'mainController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
