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

    var time= event.target.regTime.value;
    var member = event.target.regMember;
    var members = [];

    var idx=0;
    for(var i=0; i<member.length; i++) {
      if(member[i].checked) {
        members[idx++] = member[i].value;
      }
    }

    var param = {
      time: time,
      member:members
    };

    Meteor.call("register", param, function(e, r){

    });
    location.href="/step-3"
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
