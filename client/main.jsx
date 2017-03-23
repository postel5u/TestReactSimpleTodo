

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import Home from '../imports/ui/Home.jsx';
import App from '../imports/ui/App.jsx';



Meteor.startup(() => {

    render(<App />, document.getElementById('render-target'));

});
