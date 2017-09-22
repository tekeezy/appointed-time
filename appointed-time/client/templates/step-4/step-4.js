import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.step2.helpers({
  results : function() {
    return Meteor.users.find({ "_id": { $ne: Meteor.user()._id}});
  }
});
