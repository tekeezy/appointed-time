import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template['step-3'].onCreated(() => {
  console.log("Template['step-3'].onCreated");

  this.time = new ReactiveVar(0);
  this.appointTime = new Date(new Date().getTime() + 999*60*17);
  Template['step-3'].timeTicker();
});

Template['step-3'].timeTicker = () => {
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
  time: () => {
    return time.get();
  }
});
