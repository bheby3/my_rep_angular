var app = angular.module('app');

app.service('whoismyrepsvc', function ($http) {


  this.findRepresentativesByState = function (state) {

    return $http({
      method: 'GET',
      url: '/representatives/' + state
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        return err.data;
      });
  };

  this.findSenatorsByState = function (state) {
    return $http({
      method: 'GET',
      url: '/senators/' + state
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        return err.data;
      });
  }

});