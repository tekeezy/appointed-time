import { Accounts } from 'meteor/accounts-base';

/*
Accounts.onLogin(function() {
  FlowRouter.go('/clients');
  //FlowRouter.go('/step-1');
});
*/

// 로그아웃할 경우 실행
Accounts.onLogout(function() {
  FlowRouter.go('/');
});

// 라우터 그룹
const UserRoutes = FlowRouter.group({
  triggersEnter: [function(context, redirect, stop) {
    console.log('router.js: FlowRouter.group UserRoutes: triggersEnter');
    console.log("router.js: FlowRouter.group UserRoutes: Meteor.loggingIn: " + Meteor.loggingIn());
    console.log("router.js: FlowRouter.group UserRoutes: Meteor.user: " + Meteor.user());

    if ( ! Meteor.loggingIn() && ! Meteor.user()) {
      console.log('router.js: FlowRouter.group UserRoutes: FlowRouter.go(\'/\')');
      //FlowRouter.go('/');
      redirect('/');
      //stop();
    }
  }]
});

FlowRouter.route('/', {
  /*
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId()) {
      BlazeLayout.render('login');
    }
  }],
  */
  action: function () {
    console.log("router.js: FlowRouter.route /: action");
    console.log("router.js: FlowRouter.route /: User: " + Meteor.user());

    // 로그인하면 실행
    Accounts.onLogin(function() {
      console.log("router.js: FlowRouter.route /: Accounts.onLogin");
      FlowRouter.go('/clients');
      //FlowRouter.go('/step-1');
    });

    BlazeLayout.render('login');
  }
});

UserRoutes.route('/clients', {
  action: function () {
    console.log("router.js: UserRoutes.route /clients: action");
    console.log("router.js: UserRoutes.route /clients: User: " + Meteor.user());
    BlazeLayout.render('after');
  }
});

UserRoutes.route('/step-1', {
  action: function () {
    console.log("router.js: UserRoutes.route /step-1: action");
    console.log("router.js: UserRoutes.route /step-1: User: " + Meteor.user());
    BlazeLayout.render('step-1');
  }
});

UserRoutes.route('/step-2', {
  action: function () {
    console.log("router.js: UserRoutes.route /step-2: action");
    console.log("router.js: UserRoutes.route /step-2: User: " + Meteor.user());
    BlazeLayout.render('step-2');
  }
});

UserRoutes.route('/step-3', {
  action: function () {
    console.log("router.js: UserRoutes.route /step-3: action");
    console.log("router.js: UserRoutes.route /step-3: User: " + Meteor.user());
    BlazeLayout.render('step-3');
  }
});

UserRoutes.route('/step-4', {
  action: function () {
    console.log("router.js: UserRoutes.route /step-4: action");
    console.log("router.js: UserRoutes.route /step-4: User: " + Meteor.user());
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
