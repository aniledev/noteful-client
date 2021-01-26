import React, { Component } from "react";
import "./AddFolder.css";
import ValidationError from "../ValidationError";
import apiContext from "../apiContext";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        changed: false
      }
    };
  }

  static contextType = apiContext;

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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const JSONBody = JSON.stringify({ name: name.value });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: JSONBody,
      redirect: "follow"
    };

    fetch("http://localhost:9090/folders", options)
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
    const folderNameError = this.validateFolderName();

    return (
      <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add a new folder</h2>
        <div className="form-group">
          <label>Folder Name</label>
          <input
            type="text"
            className="name-input"
            name="name"
            id="name"
            defaultValue="New Folder"
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
