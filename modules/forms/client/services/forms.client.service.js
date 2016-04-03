(function () {
  'use strict';

  angular
    .module('forms.services')
    .factory('FormsService', FormsService);

  FormsService.$inject = ['$resource'];

  function FormsService($resource) {
    return $resource('api/forms/:formId', {
      formId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
