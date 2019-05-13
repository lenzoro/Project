import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import '../lib/collections.js';
Template.mainbody.helpers({
  tasks() {
    return tasksDB.find({});
  },
});

Template.add.events({
  'click js-add'(event, instance) {
   var namepath = $("#namepath").val();
   $("#namepath").val('');
      console.log ("Test")
      tasksDB.insert({"Task":taskpath, "createdon":new Date().getTime() , "postedby":Meteor.user()._id});
  },
});
