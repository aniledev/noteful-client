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

  static defaultProps = {
    history: { goBack: () => {} }
  };

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
      .then(response => {
        if (!response.ok) {
          return response.json().then(event => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        this.context.handleAddFolder(responseJson);
        this.setState({ folderName: "" });
        this.props.history.goBack();
      })
      .catch(error => alert("Something went wrong"));
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
            placeholder="New Folder"
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
