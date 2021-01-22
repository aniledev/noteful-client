import React from "react";
import "./AddFolder.css";

export default function AddFolder(props) {
  const { className, ...otherProps } = props;
  return (
    <form
      className={["AddFolder", className].join(" ")}
      action="#"
      {...otherProps}
    >
      <h2>Add a new folder</h2>

      <div className="form-group">
        <label>Folder Name *</label>
        <input
          type="text"
          className="name-input"
          name="name"
          id="name"
          defaultValue="New Folder"
        />
      </div>
      <button type="submit" className="name-button">
        Add Folder
      </button>
      <div className="input-hint">* required field</div>
    </form>
  );
}
