// The navbar does not have any state and is thus a Stateless Functional Component
// Thus there is no use of class and extending Component
// We can simply wrtie the returned react fragment as an arrow function
// This is done in navbar_v1

import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
          <span className="badge badge-pill badge-secondary m-2">
            {/* Add a badge that shows the counter on the navbar */}
            {this.props.totalCounters}
          </span>
        </a>
      </nav>
    );
  }
}

export default NavBar;
