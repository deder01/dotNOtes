var React = require('react');
var Router = require('react-router').Router;
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      bio: {
        name: "David Eder",
      },
      notes: [1,2,3],
      repos: ['a','b','c'],
    };
  },


  componentDidMount: function(){
    this.ref = new Firebase('https://dot-notes-2b058.firebaseio.com/');
    this.init(this.props.params.username);
  },

  init: function(username) {
    var self = this;
    var childRef = this.ref.child(username);
    this.bindAsArray(childRef, 'notes');

    helpers.getGithubInfo(username).then(function(data){
      self.setState({
        bio: data.bio,
        repos: data.repos,
      });
    })
  },

  componentWillReceiveProps: function(nextProps) {
    this.unbind('notes');
    this.init(nextProps.params.username);
  },

  componentWillUnmount: function() {
    this.unbind('notes');
  },

  handleAddNote: function(newNote) {
    // update firebase with new note
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },

  render: function(){
    return(
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />  
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
            username={this.props.params.username} 
            notes={this.state.notes} 
            addNote={this.handleAddNote}
          />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
