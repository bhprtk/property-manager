'use strict';

var app = angular.module('propertyApp');


app.controller('homeController', function() {

});

app.controller('tenantsController', function($scope, Tenants) {
  Tenants.getAll()
    .then(res => {
      $scope.tenants = res.data;
    });

  $scope.createTenant = () => {
    Tenants.create($scope.newTenant)
      .then(res => {
        $scope.tenants.push(res.data);
        $scope.newTenant = {};
      });
  };

  var editingIndex;
  $scope.editTenant = (tenant) => {
    editingIndex = $scope.tenants.indexOf(tenant);
    $scope.tenantToEdit = angular.copy(tenant);
  };

  $scope.cancelEdit = () => {
      $scope.tenantToEdit = null;
    };

  $scope.saveEdit = () => {
    Tenants.update($scope.tenantToEdit)
      .then(() => {
        $scope.tenants[editingIndex] = $scope.tenantToEdit;
        $scope.tenantToEdit = null;
      })
      .catch(err => {
        console.error(err);
      });
  };

  $scope.removeTenant = (tenant) => {
    var r = confirm("Are you sure you want to delete this tenant?");
    if(r){
      Tenants.remove(tenant)
        .then(() => {
          var index = $scope.tenants.indexOf(tenant);
          $scope.tenants.splice(index, 1);
        })
        .catch(err => {
          console.error(err);
        });
      }
   };

});








app.controller('propertiesController', function($scope, Properties) {
  Properties.getAll()
    .then(res => {
      $scope.properties = res.data;
    });

  $scope.createProperty = () => {
    Properties.create($scope.newProperty)
      .then(res => {
        $scope.properties.push(res.data);
        $scope.newProperty = {};
      });
  };

  var editingIndex;
  $scope.editProperty = (property) => {
    editingIndex = $scope.properties.indexOf(property);
    $scope.propertyToEdit = angular.copy(property);
  };

  $scope.cancelEdit = () => {
      $scope.propertyToEdit = null;
    };

  $scope.saveEdit = () => {
    Properties.update($scope.propertyToEdit)
      .then(() => {
        $scope.properties[editingIndex] = $scope.propertyToEdit;
        $scope.propertyToEdit = null;
      })
      .catch(err => {
        console.error(err);
      });
  };

  $scope.removeProperty = (property) => {
    var r = confirm("Are you sure you want to delete this property?");
    if(r){
      Properties.remove(property)
        .then(() => {
          var index = $scope.properties.indexOf(property);
          $scope.properties.splice(index, 1);
        })
        .catch(err => {
          console.error(err);
        });
      }
   };

   $scope.sortBy = (order) => {
       if($scope.sortOrder === order) {
         $scope.sortOrder = `-${order}`;
       } else {
         $scope.sortOrder = order;
       }
     };

     $scope.sortUtil = {};


  $scope.sortRentFunc = () => {
    Properties.sortRentMinToMax($scope.sortRent)
      .then(res => {
        $scope.properties = res.data;
      })
  };

  $scope.sortUtilFunc = () => {
    Properties.sortUtilMinToMax($scope.sortUtil)
      .then(res => {
        $scope.properties = res.data;
      })
  };



  $scope.rentClick = () => {
    $scope.openSortUtilities = false;
  };
  $scope.utilitiesClick = () => {
    $scope.openSortUtilities = true;
  };









});
