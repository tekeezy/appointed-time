import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Groups = new Mongo.Collection('groups');
//
// Meteor.subscribe('groups');

Template['step-2'].helpers({
  friends : function() {
    return Meteor.users.find({ "_id": { $ne: Meteor.user()._id}});
  }
});

Template['step-2'].events({
  "click #back": function(event) {
    location.href="/step-1";
  },
  "submit form": function (event) {
    event.preventDefault();


    var title= event.target.title.value;
    var time= event.target.regTime.value;
    var member = event.target.regMember;
    var members = new Array();
    var idx=0;
    var temp = new Object();
    temp.member_id=Meteor.userId(),
    temp.attendance=false;
    temp.arrival=null;
    members.push(temp);
    for(var i=0; i<member.length; i++) {
      if(member[i].checked) {
        var aJson = new Object();
        aJson.member_id = member[i].value;
        aJson.attendance = false;
        aJson.arrival = null;
        members.push(aJson);
      }
    }

    var param = {
      title:title,
      time: time,
      member:members
    };

    Meteor.call("register", param, function(e, r){

    });
    Meteor.call("getWithdraw", members, function(e, r) {

        location.href="/step-1"

    });
 },
})
