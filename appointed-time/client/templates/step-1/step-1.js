import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../../imports/collections.js'
import { ReactiveVar } from 'meteor/reactive-var';

Template['step-1'].onCreated(() => {
  Meteor.subscribe('users', temp);
  this.bal = new ReactiveVar();
  bal.set("로딩중...");
});

function temp() {
  var cont =Meteor.users.findOne({"_id":Meteor.userId()});
  Meteor.call("balance", cont.account, function(e, r){
    bal.set(r)
  });
}

Template['step-1'].helpers({
  list : function() {
    return Groups.find({"member.member_id" : Meteor.userId()});
  },
  balance() {
    return bal.get();
  }
});

Template['step-1'].events({
  'click .moim'(event) {
    var temp = this;
    location.href = "/step-3/" + this._id;
  }
})
