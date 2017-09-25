import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../imports/collections.js'

// Groups = new Mongo.Collection('groups');
//
// Meteor.subscribe('groups');

Template['step-1'].helpers({
  list : function() {
    return Groups.find({"member.member_id" : Meteor.userId()});
  }
});

Template['step-1'].events({
  'click .moim'(event) {
    var temp = this;
    location.href = "/step-3/" + this._id;
  }
})
