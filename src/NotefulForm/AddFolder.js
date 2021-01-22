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
      <div className="input_hint">* required field</div>
      <div className="form-group">
        <label>Folder Name *</label>
        <input
          type="text"
          className="name_input"
          name="name"
          id="name"
          defaultValue="New Folder"
        />
      </div>
    </form>
  );
}
