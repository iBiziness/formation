'use strict';

/**
 * Module dependencies
 */
var documentsPolicy = require('../policies/documents.server.policy'),
  documents = require('../controllers/documents.server.controller');

module.exports = function (app) {
  // Documents collection routes
  app.route('/api/documents').all(documentsPolicy.isAllowed)
    .get(documents.list)
    .post(documents.create);

  app.route('/api/documents/upload').post(documents.uploadFile);

  // Single document routes
  app.route('/api/documents/:documentId').all(documentsPolicy.isAllowed)
    .get(documents.read)
    .put(documents.update)
    .delete(documents.delete);


  // Finish by binding the document middleware
  app.param('documentId', documents.documentByID);
};
