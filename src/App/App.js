import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../NotefulForm/AddFolder";
import AddNote from "../NotefulForm/AddNote";
import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import apiContext from "../apiContext";
import config from "../config";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.PORT_URL}/notes`),
      fetch(`${config.PORT_URL}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    return (
      <>
        <ErrorBoundary>
          {["/", "/folder/:folderId"].map(path => (
            <Route exact key={path} path={path} component={NoteListNav} />
          ))}
          <Route path="/note/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={NotePageNav} />
          <Route path="/add-note" component={NotePageNav} />
        </ErrorBoundary>
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state.folders;

    return (
      <>
        <ErrorBoundary>
          {["/", "/folder/:folderId"].map(path => (
            <Route exact key={path} path={path} component={NoteListMain} />
          ))}
          <Route path="/note/:noteId" component={NotePageMain} />

          <Route exact path="/add-folder" component={AddFolder} />

          <Route
            exact
            path="/add-note"
            component={AddNote}
            folder={this.state.folders}
          />
        </ErrorBoundary>
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (
      <apiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </apiContext.Provider>
    );
  }
}

export default App;
