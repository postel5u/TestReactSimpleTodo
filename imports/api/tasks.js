/**
 * Created by debian on 21/03/17.
 */


import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
export const Tasks = new Mongo.Collection('tasks');
if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}
Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            reported : 0,
            reportedBy : new Array(),
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        const task = Tasks.findOne(taskId);
        if (task && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },
    'tasks.report'(taskId) {
        check(taskId, String);
        const task = Tasks.findOne(taskId);
        const user = Meteor.userId();

        if(task.reportedBy.includes(user)==false){
            if(task.reported >= 10) {
                Tasks.remove(taskId)
            }else{
                task.reported++;
                console.log(Meteor.userId());
                console.log(task.reportedBy);
                Tasks.update(taskId,{ $set: {reported : task.reported}});
                Tasks.update(taskId,  {$push: {reportedBy : user}});
                console.log(taskId);

                document.getElementById(taskId).className= "fa fa-thumbs-down"
            }
        }
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});