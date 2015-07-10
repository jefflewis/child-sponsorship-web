'use strict';

angular.module('childSponsorshipWebApp')
  .controller('ChildrenListController', function ($scope, $state, popupService, $window, Child) {
    // Fetch all children. Issues a GET to /api/children
    $scope.children = Child.query();

    $scope.deleteChild = function(child) { // Delete a child. Issues a DELETE to /children/:id
      if (popupService.showPopup('Really delete this?')) {
        child.$delete(function() {
          $window.location.href = ''; //redirect to home
        });
      }
    };
  })
  .controller('ChildrenViewController', function ($scope, $stateParams, Child) {
    //Get a single child. Issues a GET to /children/:id
    $scope.child = Child.get({ id: $stateParams.id });
  })
  .controller('ChildrenCreateController', function ($scope, $state, popupService, $stateParams, Child, apiService) {
    //create new child instance. Properties will be set via ng-model on UI
    $scope.child = new Child();

    $scope.datepicker = function () {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 25 // Creates a dropdown of 15 years to control year
      });
    };

    $(document).ready(function() {
      $('input#input_text, textarea#textarea1').characterCounter();
    });

    $scope.addChild = function() { //create a new child. Issues a POST to /children
      $scope.child.$save(function() {
        // On success go back to home i.e. children state.
        $state.go('children');
      });
    };
  })
  .controller('ChildrenEditController', function ($scope, $state, $stateParams, Child) {
    $scope.updateChild = function() { //Update the edited child. Issues a PUT to /api/children/:id
      $scope.child.$save(function() {
        $state.go('children'); // on success go back to home i.e. children state.
      });
    };

    $scope.loadChild = function() { //Issues a GET request to /api/children/:id to get a child to update
      $scope.child = Child.get({ id: $stateParams.id });
    };

    $scope.loadChild(); // Load a child which can be edited on UI
  })
  .controller('ChildrenPhotosController', function ($scope, $http, $timeout, $rootScope ,$state, $stateParams, Child, FileUploader, apiService) {
    $scope.uploader = new FileUploader();
    // $scope.$watch('files', function () {
    //     $scope.upload($scope.files);
    // });

    $scope.child = Child.get({ id: $stateParams.id });

    // $scope.upload = function (files) {
    //
    //   apiService.get('/signed_url')
    //   .success( function (data, status, headers, config) {
    //     $scope.signed_form = data;
    //     console.log('data: ');
    //     console.log($scope.signed_form);
    //
    //     if (files && files.length) {
    //       for (var i = 0; i < files.length; i++) {
    //         var file = files[i];
    //
    //         file.upload = Upload.upload({
    //             url: $scope.signed_form.url,
    //             method: 'POST',
    //             fields: {
    //                 key: file.name,
    //                 AWSAccessKeyId: $scope.signed_form.access_id,
    //                 acl: $scope.signed_form.acl,
    //                 policy: $scope.signed_form.policy,
    //                 signature: $scope.signed_form.signature,
    //                 'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
    //                 filename: file.name
    //             },
    //             file: file
    //         });
    //
    //         file.upload.then(function (response) {
    //             $timeout(function () {
    //                 file.result = response.data;
    //             });
    //         }, function (response) {
    //             if (response.status > 0) {
    //               $scope.errorMsg = response.status + ': ' + response.data;
    //             }
    //         });
    //
    //         file.upload.progress(function (evt) {
    //             file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    //         });
    //
    //       }
    //     }
    //
    //   })
    //   .error( function (data, status) {
    //     console.log('error: ' + status);
    //     $rootScope.$broadcast("signedUrl.failed", status);
    //   });
    // };

    $scope.uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
      $scope.upload(fileItem);
    };

    $scope.upload = function(fileItem) {
      apiService.get('/signed_url')
      .success( function (data, status, headers, config) {
        $scope.signed_form = data;
        console.log(data)
        $scope.uploader.url = $scope.signed_form.url;
        $scope.uploader.formData[0] = {
          key: fileItem.file.name,
          AWSAccessKeyId: $scope.signed_form.access_id,
          acl: $scope.signed_form.acl,
          policy: $scope.signed_form.policy,
          signature: $scope.signed_form.signature,
          'Content-Type': fileItem.type === null || fileItem.type === '' ? 'application/octet-stream' : fileItem.type,
          filename: fileItem.name
        };

        $scope.uploader.autoUpload = true;
        $scope.uploader.withCredentials = true;
        console.log($scope.uploader);
        console.log($scope.signed_form);

        $http({
          method: 'POST',
          url: $scope.signed_form.url,
          headers: {
              'Content-Type': fileItem.type
          },
          data: fileItem._file
        })
        .then(function(res) {
            console.log(res);
        });

      });
    };

    // CALLBACKS
    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

  })
  .controller('ChildrenSponsorContoller', function ($scope, $state, $stateParams, Child, apiService) {
    // Fetch all available Children (with no user_id)
    apiService.get('/children/available')
    .success( function (data, status, headers, config) {
      $scope.available = data;
    })
    .error( function(data, status) {
      alert('error: ' + status);
      $rootScope.$broadcast("children.available.failed", error);
    });
  });