import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './accounts-config.js';


Template.after.helpers({
  friends : function() {
    return Meteor.users.find({ "_id": { $ne: Meteor.user()._id}});
  }
});

Template.after.events({
  "submit form": function (event) {
    event.preventDefault();
    location.href="/333"
    //
    // var bitcoin = event.target.text.value;
    // var address = event.target.address.value;
    // // var friendAddress = '';
    // Meteor.call("temp", temp);
 },
})


// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
