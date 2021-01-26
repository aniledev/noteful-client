import React from "react";

// use createContext to initialize context for use in application

export default React.createContext({
  notes: [],
  folders: [],
  // empty update functions
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  handleAddNote: () => {},
  handleAddFolder: () => {},
  handleDeleteNote: () => {}
});
