import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';
import './main.html';

import '../lib/collections.js';




Session.set('HideCompTasks',false);





Template.task.helpers({
	MainAll() {
			if(Session.get('HideCompTasks'))
			    return tasksDB.find({'Complete':false})
			else
			{
			    return tasksDB.find({});
			}
	

  	},
  	userLoggedin(){
  		if(Meteor.user())
  			return Meteor.user().username;
  	},
  	userID(){
  		return tasksDB.findOne({_id:this._id}).postedby;
  	},
  	isPrivate(){
  		if(tasksDB.findOne({_id:this._id}).Status=="Private"){
  			if(Meteor.user()){
  				if(Meteor.user()._id==tasksDB.findOne({_id:this._id}).PrivateOwner){
  					console.log("private");
  					return true;
  				}
  			}
  		}
  		return false;
  	},

  	isPublic(){
  		if(tasksDB.findOne({_id:this._id}).Status=="Public"){
  			console.log("public");
			return true;
  		}
  		return false;
  	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY",
});

Template.add.events({
  	'change .js-add'(event) {
	   var taskpath = $("#taskpath").val();
	   $("#taskpath").val('');
      	console.log ("Test");
      	tasksDB.insert({'Task':taskpath, 'Complete':false , 'Owner':Meteor.user()._id,'Status':"Public",'PrivateOwner':"",'user':Meteor.user().username});
  	
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
	'click .js-completed'(event){
		var elementname="completed" + this._id;
		var val = document.getElementById(elementname);

		tasksDB.update({'_id':this._id},{$set:{'Complete':val.checked}});

	},
	
	

	'click .js-statuschange'(event){
		console.log("saving");
		var elementname = "#TaskStatus" + this._id;
		var val = $(elementname).val();
		console.log(val);
		var ownerval = "";
		if(val == "Private"){
			ownerval = Meteor.user()._id;
		}
		tasksDB.update({'_id':this._id},{$set:{'PrivateOwner':ownerval,'Status':val}});
	}
});


Template.mainbody.events({
	'click .js-hidecompleted'(event){
	    var elementname="completed"
	    console.log(elementname);
		Session.set('HideCompTasks',document.getElementById(elementname).checked);
		console.log (Session.get('HideCompTasks'));
	}
});