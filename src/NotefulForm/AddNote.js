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
      },
      content: {
        value: "",
        changed: false
      },
      folder: {
        value: "",
        changed: false
      }
    };
  }

  updateNoteName(name) {
    this.setState({
      name: { value: name, changed: true }
    });
  }
  updateNoteContent(content) {
    this.setState({
      content: { value: content, changed: true }
    });
  }
  updateFolderName(folder) {
    this.setState({
      folder: { value: folder, changed: true }
    });
  }

  validateNoteName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Note name is required.";
    } else if (name.length < 3) {
      return "Note name must be at least 3 characters.";
    }
  }
  validateNoteContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Note content is required.";
    } else if (content.length < 3) {
      return "Note content must be at least 3 characters.";
    }
  }

  validateFolderName() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return "A folder must be selected.";
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
          <label htmlFor="name">Note Name</label>
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
          <label htmlFor="content">Note Content</label>
          <input
            type="text"
            className="content-input"
            name="content"
            id="content"
            defaultValue="Note Content"
            onChange={e => this.updateNoteContent(e.target.value)}
          />
        </div>
        {this.state.content.changed && (
          <ValidationError message={noteContentError} />
        )}
        <div className="form-group">
          <label htmlFor="folder">Select A Folder</label>
          <input
            type="text"
            className="folder-input"
            name="folder"
            id="folder"
            defaultValue="Folder Name"
            onChange={e => this.updateFolderName(e.target.value)}
          />
        </div>
        {this.state.folder.changed && (
          <ValidationError message={folderNameError} />
        )}

        <button
          type="submit"
          className="name-button"
          disabled={
            this.validateNoteName() ||
            this.validateNoteContent() ||
            this.validateFolderName()
          }
        >
          Add Note
        </button>
      </form>
    );
  }
}
