import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://github-note-taker.firebaseio.com/')


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: [],
    }
  }

  init(username) {
    var self = this;
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes',
    });

    getGithubInfo(username).then(function(data){
      self.setState({
        bio: data.bio,
        repos: data.repos,
      });
    })
  }

  componentDidMount() {
    this.init(this.props.params.username)
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    base.removeBinding(this.ref);
    this.init(nextProps.params.username);
  }

  handleAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    })
  }

  render(){
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
            addNote={(newNote) => this.handleAddNote(newNote)}
          />
        </div>
      </div>
    );
  }
};

export default Profile;
