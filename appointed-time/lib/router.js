import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function() {
  FlowRouter.go('/clients');
  //FlowRouter.go('/step-1');
});

Accounts.onLogout(function() {
  FlowRouter.go('/');
});

FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    if(Meteor.userId()) {
      BlazeLayout.render('login');
    }
  }],
    action: function () {
        BlazeLayout.render('login');
    }
});

FlowRouter.route('/clients', {
    action: function () {
        BlazeLayout.render('after');
    }
});

FlowRouter.route('/step-1', {
    action: function () {
        BlazeLayout.render('step-1');
    }
});

FlowRouter.route('/step-2', {
    action: function () {
        BlazeLayout.render('step-2');
    }
});

FlowRouter.route('/step-3', {
    action: function () {
        BlazeLayout.render('step-3');
    }
});

FlowRouter.route('/step-4', {
    action: function () {
        BlazeLayout.render('step-4');
    }
});

// FlowRouter.route('/', {
//     action: function () {
//       Tracker.autorun(function() {
//         if(!Meteor.userId()) {
//           FlowLayout.render("login");
//         } else {
//           FlowLayout.render("second");
//         }
//       })
//     }
// });
