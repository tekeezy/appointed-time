import { Meteor } from 'meteor/meteor';
import { Groups } from '../imports/collections.js'

Meteor.startup(() => {
  console.log("test "+Groups.find({}).count());
});

Meteor.methods( {
  register: function(param) {

    Groups.insert({
      groupName: param.title,
      targetTime: param.time,
      member : param.member,
    });
  },

  arrival: function(_id, date, gid) {
    // Tasks.update(this._id, {
    //   $set: { checked: ! this.checked },
    // });
    Groups.update(
      {"_id":gid, "member.member_id":_id},
      {$set:{"member.$.arrival":date.toLocaleString(), "member.$.attendance": true}})
  },
});

// Meteor.publish('messages', function tasksPublication() {
//     return Messages.find();
// });
