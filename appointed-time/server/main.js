import { Meteor } from 'meteor/meteor';
import '../friends.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods( {
  register: function(param) {
    console.log(param);
    //console.log('time: ' + param.time);
    console.log("테스트 : "+param.member.length);



  },
})
