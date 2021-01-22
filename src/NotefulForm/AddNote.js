import React, { Component } from "react";
import "./AddNote.css";
import ValidationError from "../ValidationError";
import apiContext from "../apiContext";

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

  static contextType = apiContext;

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
    const { name, content, folder } = this.state;
    const { folders = [], notes = [] } = this.context;
    console.log(`Name: ${name.value}`);
    console.log(`Content: ${content.value}`);
    console.log(`Folder: ${folder.value}`);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const JSONBody = JSON.stringify({
      name: name.value,
      content: content.value,
      folder: folder.value
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: JSONBody,
      redirect: "follow"
    };

    fetch("http://localhost:9090/notes", options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  }

  render() {
    const { folders = [], notes = [] } = this.context;
    const noteNameError = this.validateNoteName();
    const noteContentError = this.validateNoteContent();
    const folderNameError = this.validateFolderName();
    const options = folders.map(folder => (
      <option value={folder.id}>{folder.name}</option>
    ));

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
            required
            onChange={e => this.updateNoteName(e.target.value)}
          />
        </div>
        {this.state.name.changed && <ValidationError message={noteNameError} />}
        <div className="form-group">
          <label htmlFor="content">Note Content</label>
          <textarea
            type="text"
            className="content-input"
            name="content"
            id="content"
            minlength="3"
            defaultValue="Note Content"
            required
            onChange={e => this.updateNoteContent(e.target.value)}
          />
        </div>
        {this.state.content.changed && (
          <ValidationError message={noteContentError} />
        )}
        <div className="form-group">
          <label htmlFor="folder">Select A Folder</label>
          <select
            type="text"
            className="folder-input"
            name="folder"
            id="folder"
            defaultValue="Folder Name"
            required
            onChange={e => this.updateFolderName(e.target.value)}
          >
            {options}
          </select>
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
