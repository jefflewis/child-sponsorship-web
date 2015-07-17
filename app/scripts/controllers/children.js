'use strict';

angular.module('childSponsorshipWebApp')
  .controller('ChildrenListController', function ($scope, $state, $window, Child) {
    // Fetch all children. Issues a GET to /api/children
    $scope.children = Child.query();
    $('.modal-trigger').leanModal();
    $('.materialboxed').materialbox();

    $scope.openModal = function (child) {
      $('#modal1').openModal();
      $scope.currentChild = child;
      console.info('child', $scope.currentChild.name);
    };

    $scope.closeModal = function () {
      $('#modal1').closeModal();
    };

    // $scope.deleteObject = function(object) {
    //   console.info('child', object.name);
    //   var name = object.name;
    //   object.$delete(function() {
    //     Materialize.toast(name + ' has been deleted', 4000);
    //     window.location.reload()
    //   });
    // };

    $scope.$on('child.deleted', function(e, error) {
      $state.reload();
    });
  })
  .controller('ChildrenViewController', function ($scope, $stateParams, Child) {
    //Get a single child. Issues a GET to /children/:id
    $scope.child = Child.get({ id: $stateParams.id });
    $scope.birthdayDate = moment($scope.child.birthdate).format("MMMM Do, YYYY");
    console.info('child: ', $scope.child);
  })
  .controller('ChildrenCreateController', function ($scope, $state, $stateParams, Child, apiService) {
    $scope.child = new Child();

    $scope.$on('$viewContentLoaded', function(){
      $('textarea#description').characterCounter();
    });

    $scope.datepicker = function () {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 25 // Creates a dropdown of 15 years to control year
      });
    };

    $scope.addChild = function() {
      $scope.child.$save(function(data) {
        // On success go back to home i.e. children state.
        $state.go('viewChild', {id: data.id});
      });
    };
  })
  .controller('ChildrenEditController', function ($scope, $state, $stateParams, Child) {

    $scope.$on('$viewContentLoaded', function(){
      $('.materialize-textarea').characterCounter();
    });

    $scope.updateChild = function() {
      $scope.child.$update(function() {
        $state.go('viewChild', {id: $scope.child.id});
      });
    };

    $scope.datepicker = function () {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 25 // Creates a dropdown of 15 years to control year
      });
    };

    $scope.loadChild = function() {
      $scope.child = Child.get({ id: $stateParams.id });
    };

    $scope.loadChild();
  })
  .controller('ChildrenPhotosController', function ($scope, $http, $state, $stateParams, Child, FileUploader, apiService) {
    $scope.uploader = new FileUploader(
      // Get the presigned URL from the server
      apiService.get('/signed_url')
      .success( function (data, status, headers, config) {
        $scope.signed_form = data;
        // Set properties on the uploader file to auth with AWS
        $scope.uploader.url = $scope.signed_form.url;
        $scope.uploader.withCredentials = true;
        $scope.uploader.autoUpload = true;
        $scope.uploader.removeAfterUpload = true;
      })
    );
    $scope.child = Child.get({ id: $stateParams.id });

    var guid = function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
    };

    var uuid = guid();

    $scope.upload = function(fileItem) {
      // Upload the file to S3
      $http({
        method: 'POST',
        url: $scope.signed_form.url,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: fileItem._file
      });
    };

    $scope.setFormData = function(fileItem) {
      fileItem.formData[0] = {
        key: 'uploads' + '\//' + $scope.child.name + '-' + $scope.child.id + '/' + guid() + fileItem._file.name,
        AWSAccessKeyId: $scope.signed_form.access_id,
        acl: $scope.signed_form.acl,
        policy: $scope.signed_form.policy,
        signature: $scope.signed_form.signature,
        'Content-Type': fileItem._file.type === null || fileItem._file.type === '' ? 'application/octet-stream' : fileItem._file.type,
        filename: fileItem._file.name,
        success_action_status: '201'
      };
    };

    $scope.uploader.onAfterAddingFile = function (fileItem) {
      fileItem.index = $scope.uploader._nextIndex - 1;
      console.info('onAfterAdding', fileItem);
    };

    $scope.uploader.onBeforeUploadItem = function(fileItem) {
      $scope.setFormData(fileItem);
      console.info('onBeforeUploadItem', fileItem);
    };

    $scope.uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);

      for (var index in addedFileItems) {
        $scope.setFormData(addedFileItems[index]);
        console.info('onAfterAddingAll.fileItem', index);
      }
    };

    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', response);
      var xmlDoc = $.parseXML( response );
      var xml = $( xmlDoc );
      var url = xml.find( "Location" ).text();
      apiService.post('/children/' + $scope.child.id + '/photos/new', { url: url, caption: 'test' })
      .success( function (data, status, headers, config) {
        Materialize.toast('Upload Successfull!');
      })
      .error( function( status ) {
        Materialize.toast('Error uploading image');
      } )
    };

    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
        Materialize.toast('Error uploading image - ' + fileItem);
    };

    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        // console.info('onCompleteItem', fileItem, response, status, headers);
    };

    // CALLBACKS
    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };


    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };


    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };

    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

  })
  .controller('ChildrenAvailableContoller', function ($scope, $state, $stateParams, Child, apiService, authService, StripeCheckout) {
    // Fetch all available Children (with no user_id)
    apiService.get('/children/available')
    .success( function (data, status, headers, config) {
      $scope.available = data;
    })
    .error( function(data, status) {
      alert('error: ' + status);
      Materialize.toast('There was an error retrieving available children: ', data + ' - ' + status);
      $rootScope.$broadcast("children.available.failed", error);
    });

    $scope.sponsor = function(child) {
      var user = authService.currentUser();
      var handler = StripeCheckout.configure({
        image: 'images/default.png',
        email: user.email,
        token: function(token) {
          apiService.post(('/charge'), {stripeToken: token, child_id: child.id, user_id: user.id })
          .success( function (data, status, headers, config) {
            Materialize.toast(child.name + ' has been sponsored!', 4000);
            $state.go('userChildren');
          })
          .error( function (data, status) {
            Materialize.toast('Error with payment: ' + data + ' - ' + status, 4000);
            $state.reload();
          });
        }
      });

      // Open Checkout with further options
      handler.open({
        name: "Child Sponsorship",
        description: child.name + ' — ' + child.description,
        "panel-label": "Sponsor — $35"
      });
      // Close Checkout on page navigation
      $(window).on('popstate', function() {
        handler.close();
      });
    };
  });;