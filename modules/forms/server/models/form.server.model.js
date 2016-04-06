'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  fields: {
    type: Array,
    default: []
  },
  status: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Form', FormSchema);

// /* Test Schema */
// var DynamicFormSchema = new Schema({ any: Schema.Types.Mixed });
// mongoose.model('DynamicForm', DynamicFormSchema);
//
// var dynaform = new DynamicForm();
//
// dynaform.any = { x: [3, 4, { y: "changed" }] };
// dynaform.markModified('any');
// dynaform.save(); // anything will now get saved
//
// console.log('hello');
//
