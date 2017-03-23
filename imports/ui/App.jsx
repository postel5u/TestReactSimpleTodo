
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';
import { Users } from '../api/users.js';
import User from './User.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideCompleted: false,
            subscribtion : {
              users: Meteor.subscribe('allUsers')
            }
        };
    }

    componentWillUnMount(){
      this.state.subscribtion.users.stop();
    }

    handleSubmit(event) {
        event.preventDefault();
        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        Meteor.call('tasks.insert', text);
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    renderUsers(){
      let users = this.props.users;
      //console.log(users);
      return users.map((user)=>{
        return (
          <User
            key={user._id}
            user={user}
          />
        );
      });
    }

    render() {
        return (
            <div className="container">
                <div className="block">
                <header>
                    <h1>Chat !!</h1>
                    <AccountsUIWrapper />
                </header>

                <ul>
                  {this.renderTasks()}
                </ul>

                { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Entrer un message"
                        />
                    </form> :''
                }
                </div>
                <div className="block">
                    <header>
                        <h1>User list !!</h1>
                    </header>
                    <ul>
                        {this.renderUsers()}
                    </ul>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};



export default createContainer(() => {
    Meteor.subscribe('tasks');
    return {
        tasks: Tasks.find({}).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
        users: Meteor.users.find({}).fetch(),
    };

}, App);


//Hidecompleted
/*
 <label className="hide-completed">
 <input
 type="checkbox"
 readOnly
 checked={this.state.hideCompleted}
 onClick={this.toggleHideCompleted.bind(this)}
 />
 Hide Completed Tasks
 </label>
 */
