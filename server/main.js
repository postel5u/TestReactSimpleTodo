import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/users.js';
Meteor.startup(() => {
  // code to run on server at startup
  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": "b47d1df59a8d459eb0f0daad46e4311f",
        "secret": "835e9fca63034e6996f3aa7b4c03896a"
      }
    },
    { upsert: true }
  );
});
