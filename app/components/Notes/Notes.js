import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';


Notes = ({username, notes, addNote}) => {
  return (
    <div>
      <h3> Notes for {this.props.username} </h3>
      <AddNote username={this.props.username} addNote={this.props.addNote} />
      <NotesList notes={this.props.notes} />
    </div>
  );
}

Notes.propTypes = {
  addNote: React.PropTypes.func.isRequired,
  notes: React.PropTypes.array.isRequired,
  username: React.PropTypes.string.isRequired,
};

export default Notes;
