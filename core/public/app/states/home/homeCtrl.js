app.controller('homeCtrl', function ($state, $scope, whoismyrepsvc) {

  $scope.senators = [];
  $scope.senatorsArray = [];
  $scope.toggleSenators = false;

  $scope.representatives = [];
  $scope.repsArray = [];
  $scope.toggleRepresentatives = false;

  $scope.toggleError = false;
  $scope.error = "";
  $scope.bindRep = {};

  $scope.states = [
    'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MS', 'MO', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
    'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WV', 'WI', 'WY'
  ];

  $scope.getStateRep = function (select) {
    if ($scope.select.state && $scope.select.rep === 'senator') {
      $scope.getSenByState($scope.select.state);
      $scope.toggleRepresentatives = false;
      $scope.toggleSenators = true;
    }
    else if ($scope.select.state && $scope.select.rep === 'representative') {
      $scope.getRepsByState($scope.select.state);
      $scope.toggleSenators = false;
      $scope.toggleRepresentatives = true;
    }
    else if ($scope.select.state && !$scope.select.rep) {
      $scope.error = "please select a representative";
      $scope.toggleError = true;
    }
    else if (!$scope.select.state && $scope.select.rep) {
      $scope.error = "please select a state";
      $scope.toggleError = true;
    }
    else if (!$scope.select.state && !$scope.select.rep) {
      $scope.error = "please select a state and representative";
      $scope.toggleError = true;
    }
  };

  $scope.getRepsByState = function (state) {
    whoismyrepsvc.findRepresentativesByState(state)
      .then(function (response) {
        $scope.toggleError = false;
        $scope.representatives = response.results;
      })
  };

  $scope.getSenByState = function (state) {
    whoismyrepsvc.findSenatorsByState(state)
      .then(function (response) {
        $scope.toggleError = false;
        $scope.senators = response.results;
      })
  };

  $scope.toggleSenator = function ($index, senator) {
    $scope.bindRep = senator;
    $scope.bindRep.firstName = senator.name.split(" ")[0];
    $scope.bindRep.lastName = senator.name.split(" ")[1];
  };

  $scope.toggleRepresentative = function ($index, rep) {
    $scope.bindRep = rep;
    $scope.bindRep.firstName = rep.name.split(" ")[0];
    $scope.bindRep.lastName = rep.name.split(" ")[1];
  };

  /*  $scope.$watch('select.selected', function (newValue, oldValue) {
   if (newValue === 'senator' && $scope.select.state) {
   $scope.getSenByState($scope.select.state);
   $scope.toggleRepresentatives = false;
   $scope.toggleSenators = true;
   } else if (newValue === 'representative' && $scope.select.state) {
   $scope.getRepsByState($scope.select.state);
   $scope.toggleSenators = false;
   $scope.toggleRepresentatives = true;
   }
   });*/
});
