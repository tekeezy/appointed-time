import { Meteor } from 'meteor/meteor';
import '../friends.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods( {
  test: function(aaa, bbb) {
    console.log('aaa: ' + f_ddress);
    console.log('bbb: ' + balance);
  },
})
