import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import apiContext from "../apiContext";
import config from "../config";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    onDeleteNote: () => {}
  };

  static contextType = apiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.PORT_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      // .then(res => {
      //   if (!res.ok) return res.json().then(e => Promise.reject(e));
      //   return res.json();
      // })
      // .then(() => {
      //   this.context.deleteNote(noteId);
      //   // allow parent to perform extra behaviour
      //   this.props.onDeleteNote(noteId);
      // })
      // .catch(error => {
      //   console.error({ error });
      // });
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.context.deleteNote(noteId);
        }
      })
      .then(() => this.props.history.goBack())
      .catch(error => console.log(error));
  };

  render() {
    const { notes = [] } = this.context;
    const noteId = this.props.id;
    let note = notes.find(note => note.id === noteId) || {
      id: noteId,
      modified: new Date().toISOString()
    };

    let date = new Date(note.modified);
    let dateNormalizer = format(date, "do MMM YYYY");

    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified <span className="Date">{dateNormalizer}</span>
          </div>
        </div>
      </div>
    );
  }
}

// format(this.props.modified, "Do MMM YYYY");

Note.propTypes = {
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func
};

Note.defaultProps = {
  id: "",
  modified: "",
  name: ""
};
