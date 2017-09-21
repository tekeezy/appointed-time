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

    console.log(event.target);
    var temp="";
    //var bitcoin = event.target.text.value;
    //var address = event.target.address.value;
    // var friendAddress = '';
    Meteor.call("test", temp);
    location.href="../public/js/step-3.html"
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
