(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', '$state', 'formResolve', '$window', 'Authentication'];

  function FormsController($scope, $state, form, $window, Authentication) {
    var vm = this;
    var formFieldDefaultValues = { 'type': 'Text', 'cols': '12' };
    vm.formDoc = form;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};

    vm.formField = angular.copy(formFieldDefaultValues);
    vm.editField = editField;
    vm.removeField = removeField;
    vm.saveField = saveField;
    vm.cancelField = cancelField;

    vm.save = save;
    vm.publish = publish;
    vm.remove = remove;

    // Start editing a field
    function editField(field) {
      vm.formField = field;
    }

    // Remove existing field
    function removeField(field) {
      if ($window.confirm('Are you sure you want to delete this field?')) {
        var index = vm.formDoc.fields.indexOf(field);
        vm.formDoc.fields.splice(index, 1);
      }
    }

    // Save a field
    function saveField(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.fieldForm');
        // vm.fieldForm.$setSubmitted();
        return false;
      }

      var field = vm.formField;
      if (!vm.formDoc.fields) {
        vm.formDoc.fields = [];
      }
      var index = vm.formDoc.fields.indexOf(field);
      if (index < 0) {
        vm.formDoc.fields.push(field);
      }
      vm.formField = angular.copy(formFieldDefaultValues);
      $scope.$broadcast('show-errors-reset', 'vm.fieldForm');
    }

    // Cancel editing a field
    function cancelField() {
      vm.formField = angular.copy(formFieldDefaultValues);
      $scope.$broadcast('show-errors-reset', 'vm.fieldForm');
    }

    // Save Form
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.formForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.formDoc._id) {
        vm.formDoc.$update(successCallback, errorCallback);
      } else {
        
        vm.formDoc.status = 'draft';
        vm.formDoc.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('forms.view', {
          formId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Remove existing Form
    function publish() {
      if ($window.confirm('Are you sure you want to publish?')) {
        vm.formDoc.status = 'published';
        vm.formDoc.$update($state.go('forms.list'));
      }
    }

    // Remove existing Form
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.formDoc.$remove($state.go('forms.list'));
      }
    }

  }
}());
