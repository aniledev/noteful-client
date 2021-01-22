import React from "react";

// use conditional rendering to display the error message
export default function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
}
