'use strict';

angular.module('childSponsorshipWebApp')
  .service('popupService',function($window){
      this.showPopup=function(message){
          return $window.confirm(message);
      }
  });