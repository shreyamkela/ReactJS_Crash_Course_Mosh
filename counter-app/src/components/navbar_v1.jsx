// The navbar does not have any state and is thus a Stateless Functional Component
// Thus there is no use of class and extending Component.
// We can simply write the returned react fragment as an arrow function
// This is done here. For the previous version, refer navbar_v0
// Can the counters_v2 and counter_v2 be also changed to an arrow function, as they do not have any state?

import React from "react"; // We remove the Component import. We need the React import for the JSX syntax

const NavBar = ({ totalCounters }) => {
  // We cannot use 'this' keyword as this is an arrow function. We pass the props a parameter or we use object destructuring to pass the totalCounters prop of the props
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge badge-pill badge-secondary m-2">
          {/* Add a badge that shows the counter on the navbar */}
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
