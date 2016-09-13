var app = angular.module('app');

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './app/states/home/homeTemplate.html',
            controller: 'homeCtrl'
        });

    $urlRouterProvider
        .otherwise('home');
});
