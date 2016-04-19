'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Document = mongoose.model('Document'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an document
 */
exports.create = function (req, res) {
  var document = new Document(req.body);
  document.user = req.user;

  document.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(document);
    }
  });
};

/**
 * Show the current document
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var document = req.document ? req.document.toJSON() : {};

  // Add a custom field to the Document, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Document model.
  document.isCurrentUserOwner = !!(req.user && document.user && document.user._id.toString() === req.user._id.toString());

  res.json(document);
};

/**
 * Update an document
 */
exports.update = function (req, res) {
  var document = req.document;

  document.title = req.body.title;
  document.content = req.body.content;

  document.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(document);
    }
  });
};

/**
 * Delete an document
 */
exports.delete = function (req, res) {
  var document = req.document;

  document.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(document);
    }
  });
};

/**
 * List of Documents
 */
exports.list = function (req, res) {

  var where = {};
  // check if admin
  if (req.user.roles.indexOf("admin") < 0)
    where = { user: req.user };
  Document.find(where).sort('-created').populate('user', 'displayName').populate('form', 'name').exec(function (err, documents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(documents);
    }
  });
};

/**
 * Document middleware
 */
exports.documentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Document is invalid'
    });
  }

  Document.findById(id).populate('user', 'displayName').populate('form', 'name fields').exec(function (err, document) {
    if (err) {
      return next(err);
    } else if (!document) {
      return res.status(404).send({
        message: 'No document with that identifier has been found'
      });
    }
    req.document = document;
    next();
  });
};

/**
 * Update file
 */
exports.uploadFile = function (req, res) {
  console.log('uploadFile on server !!!');
  var user = req.user;
  var upload = multer(config.uploads.profileUpload).single('documentFile');

  if (user) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading.'
        });
      } else {
        var fileUrl = config.uploads.profileUpload.dest + req.file.filename;
        res.json({
          fileUrl: fileUrl
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
