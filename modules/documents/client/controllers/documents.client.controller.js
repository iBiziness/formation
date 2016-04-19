(function () {
  'use strict';

  angular
    .module('documents')
    .controller('DocumentsController', DocumentsController);

  DocumentsController.$inject = ['$scope', '$state', 'documentResolve', 'formResolve', '$window', 'Authentication', 'FileUploader'];

  function DocumentsController($scope, $state, document, form, $window, Authentication, FileUploader) {
    var vm = this;

    vm.document = document;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.formDocument = form;
    vm.prepareFieldOptions = prepareFieldOptions;

    function prepareFieldOptions() {
      vm.formDocument.fields.forEach(function(field) {
        if (field.fieldOptions)
          field.fieldOptionsArray = field.fieldOptions.split("\n");
      });
    }

    // Remove existing Document
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.document.$remove($state.go('documents.list'));
      }
    }

    // Save Document
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.documentForm');
        return false;
      }

      console.log(vm.document.values);
      vm.document.values['file'] = vm.fileUrl;

      // TODO: move create/update logic to service
      if (vm.document._id) {
        vm.document.$update(successCallback, errorCallback);
      } else {

        // by default document type is employment_form
        vm.document.form = vm.formDocument._id;
        vm.document.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('documents.view', {
          documentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    vm.fileUrl = '';
    vm.fileName = '';
    vm.uploadFile = uploadFile;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/documents/upload',
      alias: 'documentFile',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      vm.fileName = fileItem._file.name;
      vm.success = null;
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      vm.fileUrl = response.fileUrl;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failuploadFileed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    function uploadFile() {
      console.log('uploadFile');
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      // debugger;
      vm.uploader.clearQueue();
      vm.fileName = '';
      return false;
    }
  }
}());
