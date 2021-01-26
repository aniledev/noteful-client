import React, { Component } from "react";
import PropTypes from "prop-types";
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
      folderId: {
        value: "",
        changed: false
      },
      modified: {
        value: ""
      }
    };
  }

  static contextType = apiContext;

  componentDidMount() {
    this.handleModified();
  }

  handleModified = () => {
    let today = new Date();
    let iso = today.toISOString();
    this.setState({ modified: iso });
  };

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

  updateFolderId(folderId) {
    this.setState({
      folderId: { value: folderId, changed: true }
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

  validateFolderId() {
    const folderId = this.state.folderId.value.trim();
    if (folderId.length === 0) {
      return "A folder must be selected.";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, content, folderId, modified } = this.state;
    console.log(`Name: ${name.value}`);
    console.log(`Content: ${content.value}`);
    console.log(`Folder: ${folderId.value}`);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const JSONBody = JSON.stringify({
      name: name.value,
      content: content.value,
      folderId: folderId.value,
      modified: modified
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: JSONBody,
      redirect: "follow"
    };

    fetch("http://localhost:9090/notes", options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong. Try again later.");
        } else if (res.ok) {
          if (!res.redirected) {
            window.location.href = "http://localhost:3000/";
          }
        }
      })
      .catch(error => alert(error.message));
  }

  render() {
    const { folders = [] } = this.context;
    const noteNameError = this.validateNoteName();
    const noteContentError = this.validateNoteContent();
    const folderNameError = this.validateFolderId();
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
            placeholder="New Note"
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
            placeholder="Note Content"
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
            placeholder="Folder Name"
            required
            onChange={e => this.updateFolderId(e.target.value)}
          >
            {options}
          </select>
        </div>
        {this.state.folderId.changed && (
          <ValidationError message={folderNameError} />
        )}

        <button
          type="submit"
          className="name-button"
          disabled={
            this.validateNoteName() ||
            this.validateNoteContent() ||
            this.validateFolderId()
          }
        >
          Add Note
        </button>
      </form>
    );
  }
}

AddNote.propTypes = {
  // define prop types here
  folder: PropTypes.array.isRequired
};

AddNote.defaultProps = {
  folder: []
};
