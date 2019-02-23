import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a

class Counter extends Component {
  state = {
    count: 0
  };

  render() {
    // return <h1> Hello World </h1>; // No error
    // return <h1> Hello World </h1> <button> Increment </button>; // Gives error as each react element has to have a parent if the element has more than 1 tags. This is because babel does not know the wrapper tag for this element and is confused whether to treat the element as a <h1> or as a <button>. Therefore, we define a parent tag to solve this, and call it a <div>. Another work around this is to use <React.Fragment> instead of <div> as including a parent <div> will make include an unneccessary div element otside our h1 and button
    // return ( // without using <div>
    //   <React.Fragment>
    //     <h1> Hello World </h1>
    //     <button> Increment </button>
    //   </React.Fragment>
    return (
      // using <div>
      <div>
        <span>{this.formatCount()}</span>
        <button> Increment </button>
      </div>
    );
  } // If we use <span>{this.formatCount()}</span> without the {} then it will print on the browser this.formatCount() as string. Therefore we need to destructure the object as we are using jsx/html and not plain js here.

  formatCount() {
    const { count } = this.state; // Save value of the count key of this.state into a count variable - object destructuring
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
