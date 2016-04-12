(function () {
  'use strict';

  angular
    .module('documents')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Documents',
      state: 'documents',
      type: 'dropdown',
      roles: ['*'],
      position: 2
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'documents', {
      title: 'Create Document',
      state: 'documents.start',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'documents', {
      title: 'List Documents',
      state: 'documents.list',
      roles: ['user', 'admin']
    });

  }
}());
