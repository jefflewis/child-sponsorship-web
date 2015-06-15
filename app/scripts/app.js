'use strict';

/**
 * @ngdoc overview
 * @name childSponsorshipWebApp
 * @description
 * # childSponsorshipWebApp
 *
 * Main module of the application.
 */
angular
  .module('childSponsorshipWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngRoute'
  ])
  .config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl: 'views/splash.html',
      controller: 'SplashCtrl',
      accessRequired: null,
      title: 'Child Sponsorship'
    })
    .when('/auth/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      accessRequired: null,
      title: 'Child Sponsorship - Login'
    })
    .when('/auth/logout', {
      template: '',
      controller: 'LogoutCtrl',
      accessRequired: 1,
      title: 'Child Sponsorship - Logout'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      accessRequired: 1,
      title: 'Child Sponsorship - Home'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminCtrl',
      accessRequired: 9,
      title: 'Child Sponsorship - Admin'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      accessRequired: null,
      title: 'Child Sponsorship - Sign up'
    })
    .otherwise({
      redirectTo: '/signup',
      accessRequired: null,
      title: 'Child Sponsorship'
    });

    // $locationProvider.html5Mode(true);
  })
  .run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {

    $rootScope.$on('$routeChangeSuccess', function (event, current, last) {
      if( authService.routeIsAccessible(current.$$route.accessRequired) ) {
        $location.path(current.$$route.originalPath).replace();
      } else {
        if( authService.loggedIn() ) {
          alert('Not authorized.');
          $location.path(last.$$route.originalPath).replace();
        } else {
          localStorage.setItem('post-login-path', current.$$route.originalPath);
          $location.path('/auth/login').replace();
        }
      }
    });
  }]);
