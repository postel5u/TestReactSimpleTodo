import React, { Component, PropTypes } from 'react';
import { Users } from '../api/users.js';
import { Meteor } from 'meteor/meteor';

export default class User extends Component {

  render(){
    return (
      <li>
        <span className="text">
          <strong>{this.props.user.username}</strong>
        </span>
      </li>
    );
  }
}

User.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    user: PropTypes.object.isRequired
};
