// 'use strict';
// 
// /**
//  * @ngdoc function
//  * @name childSponsorshipWebApp.controller:MainCtrl
//  * @description
//  * # LoginCtrl
//  * Controller of the childSponsorshipWebApp
//  */
// angular.module('childSponsorshipWebApp')
//   .controller('LoginCtrl', function ($scope, $location, $cookieStore, authService, apiService) {
// 
//     $scope.invalid = false;
// 
//     $scope.login = function() {
//       if (this.email === undefined || this.password === undefined) {
//         $scope.invalid = true;
//         return;
//       }
// 
//       $scope.login = function() {
//         var credentials = {
//           email: this.email,
//           token:    this.token
//         };
// 
//         var success = function(data) {
//           var token = data.token;
// 
//           api.init(token);
// 
//           $cookieStore.put('token', token);
//           $location.path('/');
//         };
// 
//         var error = function(){
//           // TODO: Apply user notification here.
//         };
// 
//       authorization.login(credentials).success(success).error(error);
// 
//       };
//     };
//   });