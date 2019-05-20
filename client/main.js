import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import '../lib/collections.js';
Template.task.helpers({
  MainAll() {
    return tasksDB.find({});
  },
  	userLoggedin(){
  		var logged = tasksDB.findOne({_id:this._id}).postedby;
  		return Meteor.users.findOne({_id:this._id}).username;
  	},
  	userID(){
  		return tasksDB({_id:this._id}).postedby;
  	},
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY",
});

Template.add.events({
  'change .js-add'(event) {
	   var taskpath = $("#taskpath").val();
	   $("#taskpath").val('');
      	console.log ("Test");
      	tasksDB.insert({"Task":taskpath, "createdon":new Date().getTime()}); //, "postedby":Meteor.user()._id});
  },
});
Template.task.events({
	'click .js-delete'(event, instance) {
	var taskID = this._id;
		console.log (taskID);
	$("#" + taskID).fadeOut("slow","swing", function(){
		console.log ("hi");
		tasksDB.remove({_id:taskID}); 	
	});
  },
})
