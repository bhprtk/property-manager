'use strict';

var app = angular.module('propertyApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/html/home.html',
      controller: 'homeController'
    })
    .state('properties', {
      url: '/properties',
      templateUrl: '/html/properties.html',
      controller: 'propertiesController'
    })
    .state('tenants', {
      url: '/tenants',
      templateUrl: '/html/tenants.html',
      controller: 'tenantsController'
    })








  $urlRouterProvider.otherwise('/home');
});
