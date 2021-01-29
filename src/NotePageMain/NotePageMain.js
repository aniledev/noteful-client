import React from "react";
import Note from "../Note/Note";
import apiContext from "../apiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    history: { goBack: () => {} },
    match: {
      params: {}
    }
  };

  static contextType = apiContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const noteId = parseInt(this.props.match.params.noteId);
    const note = findNote(notes, noteId) || { content: "" };
    console.log(note, notes, noteId);
    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}
