'use strict';
angular.module('codegoblins.service', []);
angular.module('codegoblins.controller', []);
angular.module('codegoblins.filter', []);
angular.module('CodeGoblins', [
    'ui.router',
    'ngAnimate',
    'toastr',
    'lumx',
    'chart.js',
    'firebase',
    'mentio',
    'ngTagsInput',
    'angularMoment',
    'ngMaterial',
    'ngMessages',
    'angularUtils.directives.dirPagination',
    'angularUtils.directives.dirTerminalType',
    'oitozero.ngSweetAlert',
    'codegoblins.controller',
    'codegoblins.service',
    'codegoblins.filter'
  ])
  .run(['$rootScope', '$state', 'Refs', '$location', function($rootScope, $state, Refs, $location) {
    $rootScope._ = window._;
    //handle page authentication restriction
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, error) {
      var states = (toState.name !== 'about' && toState.name !== 'login' && toState.name !== 'questions' && toState.name !== 'public_question' && toState.name !== 'error_404' && toState.name !== 'home');
      if (!Refs.rootRef.getAuth() && states && !$location.search().token) {
        event.preventDefault(); 
        $state.go('error_404');
      }
    });
    
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'views/partials/index.client.view.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/partials/about.html'
      })
      .state('profile', {
        controller: 'ProfileCtrl',
        url: '/profile',
        templateUrl: 'views/users/profile.client.view.html'
      })
      .state('browse', {
        url: '/browse',
        templateUrl: 'views/users/browse.client.view.html',
        controller: 'BrowseCtrl',
      })
      .state('users', {
        url: '/profile/:id',
        templateUrl: 'views/users/public_profile.client.view.html',
        controller: 'PublicProfileCtrl'
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'views/questions/questions.client.view.html',
        controller: 'PublicQuestionsCtrl'
      })
      .state('public_question', {
        url: '/question/:id',
        templateUrl: 'views/questions/public_questions.client.view.html',
        controller: 'PublicQuestionsCtrl'
      })
      .state('ask_new_question', {
        url: '/new',
        templateUrl: 'views/questions/ask_new.client.view.html'
      })
      .state('edit_question', {
        url: '/edit/question/:id',
        templateUrl: 'views/questions/edit_question.client.view.html',
        controller: function($scope, $stateParams) {}
      })
      .state('error_404', {
        url: '/error_404',
        templateUrl: 'views/error.html'
      });
  }]);
