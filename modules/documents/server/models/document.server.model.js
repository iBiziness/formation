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
    trim: true
  },
  company_name: {
    type: String,
    default: '',
    trim: true,
    required: 'Company Name cannot be blank'
  },
  company_registration: {
    type: String,
    default: '',
    trim: true,
    required: 'Commercial Registration cannot be blank'
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
  mobile: {
    type: String,
    default: '',
    trim: true,
    required: 'Mobile number cannot be blank'
  },
  experience: {
    type: String,
    default: '',
    trim: true,
    required: 'Experience cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Document', DocumentSchema);
