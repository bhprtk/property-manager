'use strict';

var app = angular.module('propertyApp');

app.service('Properties', function($http) {

  this.getAll = () => $http.get('/properties');

  this.create = property => $http.post('/properties', property);

  this.update = property => $http.put(`/properties/${property._id}`, property);

  this.remove = property => $http.delete(`/properties/${property._id}`);

  this.sortRentMinToMax = range => $http.get(`/properties/rent-min-max?min=${range.min}&max=${range.max}`);

  this.sortUtilMinToMax = range => $http.get(`/properties/util-min-max?min=${range.min}&max=${range.max}`);

});



app.service('Tenants', function($http) {

  this.getAll = () => $http.get('/tenants');

  this.create = tenant => $http.post('/tenants', tenant);

  this.update = tenant => $http.put(`/tenants/${tenant._id}`, tenant);

  this.remove = tenant => $http.delete(`/tenants/${tenant._id}`);
});
