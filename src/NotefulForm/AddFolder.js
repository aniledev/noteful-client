import React, { Component } from "react";
import "./AddFolder.css";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: ""
      }
    };
  }

  updateFolderName(name) {
    this.setState({
      name: { value: name }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    console.log("Name: ", name.value);
  }

  render() {
    return (
      <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add a new folder</h2>
        <div className="form-group">
          <label>Folder Name *</label>
          <input
            type="text"
            className="name-input"
            name="name"
            id="name"
            defaultValue="New Folder"
            onChange={e => this.updateFolderName(e.target.value)}
          />
        </div>
        <button type="submit" className="name-button">
          Add Folder
        </button>
        <div className="input-hint">* required field</div>
      </form>
    );
  }
}
