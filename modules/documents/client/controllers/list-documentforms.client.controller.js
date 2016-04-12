(function () {
  'use strict';

  angular
    .module('documents')
    .controller('DocumentFormsListController', DocumentFormsListController);

  DocumentFormsListController.$inject = ['FormsService'];

  function DocumentFormsListController(FormsService) {
    var vm = this;

    vm.forms = FormsService.query();
  }
}());
