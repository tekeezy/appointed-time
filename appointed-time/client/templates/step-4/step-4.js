import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../imports/collections.js';
import { Session } from 'meteor/session'

Template["step-4"].helpers({
  results : function() {
    var gid = Session.get('gid');
    console.log(gid);
    var groups = Groups.findOne({'_id':gid});

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
    });



    return values;
  }
});

function fn1(param) {
  console.log(param);
}
