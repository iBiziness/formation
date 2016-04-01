(function () {
  'use strict';

  angular
    .module('documents')
    .controller('DocumentsController', DocumentsController);

  DocumentsController.$inject = ['$scope', '$state', 'documentResolve', '$window', 'Authentication'];

  function DocumentsController($scope, $state, document, $window, Authentication) {
    var vm = this;

    vm.document = document;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
