'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Document Schema
 */
var DocumentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    trim: true,
    required: 'Application type is required'
  },

  company_name: {
    type: String,
    default: '',
    trim: true
  },
  company_registration: {
    type: String,
    default: '',
    trim: true
  },

  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  age: {
    type: Number,
    default: '',
    trim: true,
    required: 'Age cannot be blank'
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'Email cannot be blank'
  },
  mobile: {
    type: String,
    default: '',
    trim: true,
    required: 'Mobile number cannot be blank'
  },

  education: {
    type: String,
    default: '',
    trim: true,
    required: 'Education cannot be blank'
  },
  awards: {
    type: String,
    default: '',
    trim: true
  },
  patents: {
    type: String,
    default: '',
    trim: true
  },
  certifications: {
    type: String,
    default: '',
    trim: true
  },

  experience: {
    type: String,
    default: '',
    trim: true,
    required: 'Experience cannot be blank'
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Document', DocumentSchema);
