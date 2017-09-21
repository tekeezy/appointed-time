Accounts.onLogin(function() {
  FlowRouter.go('/clients');
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
