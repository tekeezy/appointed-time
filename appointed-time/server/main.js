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

  arrival: function(_id, date) {
    // Tasks.update(this._id, {
    //   $set: { checked: ! this.checked },
    // });
    console.log(_id);
    console.log(date);
    // Groups.updateOne(
    //   {"member.member_id":_id},
    //   {$set : {"member.arrival" : date}},
    // )
  },
});

// Meteor.publish('messages', function tasksPublication() {
//     return Messages.find();
// });
