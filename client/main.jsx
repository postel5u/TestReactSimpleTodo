

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import Home from '../imports/ui/Home.jsx';



Meteor.startup(() => {

    render(<Home />, document.getElementById('render-target'));

});

