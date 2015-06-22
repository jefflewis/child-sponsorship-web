'use strict';

/**
 * @ngdoc overview
 * @name childSponsorshipWebApp
 * @description
 * # childSponsorshipWebApp
 *
 * Main module of the application.
 */
angular.module('childSponsorshipWebApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.gravatar'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

 // function authenticate($q, authService, $state, $timeout) {
 //   if (authService.isAuthenticated()) {
 //     // Resolve the promise successfully
 //     return $q.when()
 //   } else {
 //     // The next bit of code is asynchronously tricky.
 //     $timeout(function() {
 //       // This code runs after the authentication promise has been rejected.
 //       // Go to the log-in page
 //       $state.go('logInPage')
 //     })
 //     // Reject the authentication promise to prevent the state from loading
 //     return $q.reject()
 //   }
 // }{
 //    'auth': ['authService',
 //      function(authService) {
 //        return authService.isAuthorized();
 //      }
 //    ]
 //  };

  // For any unmatched url, redirect to /state1
  // $urlRouterProvider.otherwise('/', {
  //   templateUrl: 'views/splash.html',
  //   controller: 'SplashController'
  // });

  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('home', {
      url: '/',
      templateUrl: 'views/splash.html',
      controller: 'SplashController'
    })
    .state('children', {
      url: '/children',
      templateUrl: 'ChildrenListController',
      resolve: {
        childrenResource: 'Child',
        children: function (childrenResource) {
          return childResource.query();
        }
      }
    })
    .state('viewChild', {
      url: 'children/:id/view',
      templateUrl: 'partials/child/view.html',
      controller: 'ChildrenViewController'
    })
    .state('newChild', {
      url: '/children/new',
      tempalteUrl: 'partials/child/new.html',
      controller: 'ChildrenCreateController'
    })
    .state('editChild', {
      url: '/children/:id/edit',
      templateUrl: 'partials/child/edit.html',
      controller: 'ChildrenEditController'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'partials/user/index.html',
      controller: 'UsersListController',
      resolve: {
        usersResource: 'User',
        users: function(usersResource) { 
          return usersResource.query(); 
        }
      }
    })
    .state('viewUser', {
      url: 'users/:id/view',
      // resolve: { authenticate: authenticate },
      templateUrl: 'partials/user/view.html',
      controller: 'UsersViewController'
    })
    .state('newUser', {
      url: '/users/new',
      // resolve: { authenticate: authenticate },
      tempalteUrl: 'partials/user/new.html',
      controller: 'UsersCreateController'
    })
    .state('editUser', {
      url: '/users/:id/edit',
      // resolve: { authenticate: authenticate },
      templateUrl: 'partials/user/edit.html',
      controller: 'UsersEditController'
    });
})
.run(function ($state) {
  $state.go('login');
});
// .run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
//
//   $rootScope.$on('$routeChangeSuccess', function (event, current, last) {
//     if( authService.routeIsAccessible(current.$$route.accessRequired) ) {
//       $location.path(current.$$route.originalPath).replace();
//     } else {
//       if( authService.loggedIn() ) {
//         alert('Not authorized.');
//         $location.path(last.$$route.originalPath).replace();
//       } else {
//         localStorage.setItem('post-login-path', current.$$route.originalPath);
//         $location.path('/auth/login').replace();
//       }
//     }
//   });
// }]);
