import React, { Component } from "react";
import "./AddNote.css";
import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        changed: false
      }
    };
  }

  updateFolderName(name) {
    this.setState({
      name: { value: name, changed: true }
    });
  }

  validateFolderName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "A folder name is required.";
    } else if (name.length < 3) {
      return "Folder name must be at least 3 characters long.";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    console.log(`Name: ${name.value}`);
  }

  render() {
    const noteNameError = this.validateNoteName();
    const noteContentError = this.validateNoteContent();
    const folderNameError = this.validateFolderName();

    return (
      <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add a new note</h2>
        <div className="form-group">
          <label>Note Name</label>
          <input
            type="text"
            className="name-input"
            name="name"
            id="name"
            defaultValue="New Note"
            onChange={e => this.updateNoteName(e.target.value)}
          />
        </div>
        {this.state.name.changed && <ValidationError message={noteNameError} />}
        <div className="form-group">
          <label>Note Content</label>
          <input
            type="text"
            className="content-input"
            name="content"
            id="content"
            defaultValue="Note Content"
            onChange={e => this.updateNoteContent(e.target.value)}
          />
        </div>
        {this.state.name.changed && (
          <ValidationError message={noteContentError} />
        )}
        <div className="form-group">
          <label>Select A Folder</label>
          <input
            type="text"
            className="folder-input"
            name="folder"
            id="folder"
            defaultValue="Folder Name"
            onChange={e => this.updateFolderName(e.target.value)}
          />
        </div>
        {this.state.name.changed && (
          <ValidationError message={folderNameError} />
        )}

        <button
          type="submit"
          className="name-button"
          disabled={this.validateFolderName()}
        >
          Add Folder
        </button>
      </form>
    );
  }
}
