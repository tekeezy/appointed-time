import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../imports/collections.js'

// Groups = new Mongo.Collection('groups');
//
// Meteor.subscribe('groups');

Template['step-1'].helpers({
  list : function() {
    return Groups.find();
  }
});
