import React from "react";
import PropTypes from "prop-types"; // use conditional rendering to display the error message
export default function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
}

ValidationError.propTypes = {
  message: PropTypes.striing
};

