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

    vm.formField = formFieldDefaultValues;
    vm.editField = editField;
    vm.removeField = removeField;
    vm.saveField = saveField;
    vm.cancelField = cancelField;

    vm.save = save;
    // vm.publish = publish;
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
      vm.formField = formFieldDefaultValues;
    }

    // Cancel editing a field
    function cancelField() {
      vm.formField = formFieldDefaultValues;
    }

    // Save Form
    function save(isValid) {
      // console.log('000');
      // console.log(vm.form.formForm);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.formForm');
        return false;
      }
      // console.log('000');

      // TODO: move create/update logic to service
      if (vm.formDoc._id) {
        console.log('afa');
        vm.formDoc.$update(successCallback, errorCallback);
      } else {
        console.log('xxx');
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
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.formDoc.$remove($state.go('forms.list'));
      }
    }

  }
}());
