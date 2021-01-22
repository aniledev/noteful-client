import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    // initialize state with a constructor
    super(props);
    this.state = {
      hasError: false
    };
  }

  // This lifecycle is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <h2>Could not display this content.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
