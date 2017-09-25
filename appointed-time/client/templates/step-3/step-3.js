import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Groups } from '../../../imports/collections.js'



Template['step-3'].onCreated(() => {
  console.log("Template['step-3'].onCreated");
  Meteor.subscribe('groups', groupCB);
  this.time = new ReactiveVar();

  //console.log(Groups.findOne({'member.member_id':Meteor.userId()}));
  // console.log(Meteor.groups.findOne(member.member_id:Meteor.user().username ));
  //this.appointTime = new Date(new Date().getTime() + 999*60*17);
});

function groupCB() {
  let appointTime = new Date(Groups.findOne({'member.member_id':Meteor.userId()}).targetTime);
  Template['step-3'].timeTicker(appointTime);

  // var cursor = Groups.find({});
  // cursor.forEach(function(elem){
  //   console.log(elem.targetTime);
  // })
}
Template['step-3'].timeTicker = (appointTime) => {
    let timeTicker = function() {
      let date = new Date();
      let distance = appointTime.getTime() - date.getTime();

      let hour = parseInt(distance / 1000 / 60 / 60);
      let min = parseInt(distance / 1000 / 60) - hour * 60;
      let sec = parseInt(distance / 1000) - (hour * 60 * 60 + min * 60);

      if (distance < 1000) {
        time.set("지각!!");
      } else {
        let str = "";

        if (hour) str += hour + "시간 ";
        if (min || hour) str += min + "분 ";
        str += sec + "초";

        time.set(str);
      }
    };

    timeTicker();
    Meteor.setInterval(timeTicker, 1000);
}

Template['step-3'].helpers({

  time() {

    return time.get();
  }
});
Template['step-3'].events({
    "submit form": function (event) {
      Meteor.call("arrival", Meteor.userId(), new Date(), function(e, r){
        location.href="/step-4";
      });

    }
});
