(function () {
  'use strict';

  angular
    .module('documents.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('documents', {
        abstract: true,
        url: '/documents',
        template: '<ui-view/>'
      })
      .state('documents.list', {
        url: '',
        templateUrl: 'modules/documents/client/views/list-documents.client.view.html',
        controller: 'DocumentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Documents List'
        }
      })
      .state('documents.start', {
        url: '/start',
        templateUrl: 'modules/documents/client/views/start-document.client.view.html',
        controller: 'DocumentFormsListController',
        controllerAs: 'vm',
        resolve: {
          documentResolve: newDocument
        },
        data: {
          roles: ['user'],
          pageTitle: 'Choose a form for your application'
        }
      })
      .state('documents.create', {
        url: '/:formId/start',
        templateUrl: 'modules/documents/client/views/form-document.client.view.html',
        controller: 'DocumentsController',
        controllerAs: 'vm',
        resolve: {
          documentResolve: newDocument,
          formResolve: getForm
        },
        data: {
          roles: ['user'],
          pageTitle: 'Start a document'
        }
      })
      .state('documents.edit', {
        url: '/:documentId/edit',
        templateUrl: 'modules/documents/client/views/form-document.client.view.html',
        controller: 'DocumentsController',
        controllerAs: 'vm',
        resolve: {
          documentResolve: getDocument,
          formResolve: newForm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Document {{ documentResolve.title }}'
        }
      })
      .state('documents.view', {
        url: '/:documentId',
        templateUrl: 'modules/documents/client/views/view-document.client.view.html',
        controller: 'DocumentsController',
        controllerAs: 'vm',
        resolve: {
          documentResolve: getDocument,
          formResolve: newForm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Document {{ documentResolve.title }}'
        }
      });
  }

  getDocument.$inject = ['$stateParams', 'DocumentsService'];
  function getDocument($stateParams, DocumentsService) {
    return DocumentsService.get({
      documentId: $stateParams.documentId
    }).$promise;
  }

  newDocument.$inject = ['DocumentsService'];
  function newDocument(DocumentsService) {
    return new DocumentsService();
  }

  getForm.$inject = ['$stateParams', 'FormsService'];
  function getForm($stateParams, FormsService) {
    return FormsService.get({
      formId: $stateParams.formId
    }).$promise;
  }

  newForm.$inject = ['FormsService'];
  function newForm(FormsService) {
    return new FormsService();
  }

}());
