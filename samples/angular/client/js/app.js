'use strict';

var app = angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.memoryServices'
]).
run(function($rootScope) {
  tr8n.init("73a5623cda1c6428e", "f332e95cb38b92a66", {"source": "angular"}, function() {
//      $rootScope.tr = window.tr;
//      $rootScope.trl = window.trl;
  });
}).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/employees', {templateUrl: 'partials/employee-list.html', controller: 'EmployeeListCtrl'});
    $routeProvider.when('/employees/:employeeId', {templateUrl: 'partials/employee-detail.html', controller: 'EmployeeDetailCtrl'});
    $routeProvider.when('/employees/:employeeId/reports', {templateUrl: 'partials/report-list.html', controller: 'ReportListCtrl'});
    $routeProvider.otherwise({redirectTo: '/employees'});
}]);

app.filter('unsafe', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);