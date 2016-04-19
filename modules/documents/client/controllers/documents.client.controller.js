(function () {
  'use strict';

  angular
    .module('documents')
    .controller('DocumentsController', DocumentsController);

  DocumentsController.$inject = ['$scope', '$state', 'documentResolve', 'formResolve', '$window', 'Authentication'];

  function DocumentsController($scope, $state, document, form, $window, Authentication) {
    var vm = this;

    vm.document = document;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.formDocument = form;
    // prepareFieldOptions();

    console.log(vm.formDocument);
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
  }
}());
