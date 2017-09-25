import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../imports/collections.js';
Template["step-4"].helpers({
  results : function() {
    //console.log("test1 " + Meteor.users.find());

    //console.log("test44    " + Meteor.userId());
    var groups = Groups.findOne({"member.member_id":Meteor.userId()});

    var member = groups.member;
    var mem_id = new Array();
    for(var i=0; i< member.length; i++) {
      mem_id.push(member[i].member_id);
    }
    var users = Meteor.users.find({"_id":{$in:mem_id}});
    var values = new Array();

    users.forEach((param) => {
      // console.log("test1" + item._id);
      // member.forEach((mem) => {
      //   console.log("sok "+mem._id);
      // })
      member.forEach((item) => {
        if(item.member_id == param._id) {
          if(item.attendance == true) {
            param.arrival = item.arrival;
            param.comment = "굳잡!";
          } else {
            param.arrival = "아직 도착 ㄴㄴ";
            param.comment = "당신의 정신상태는?";
          }
        }
      })
      values.push(param);
      console.log(param);
    });



    return values;
  }
});

function fn1(param) {
  console.log(param);
}
