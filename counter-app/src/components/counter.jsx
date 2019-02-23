import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a

class Counter extends Component {
  state = {
    count: 0,
    imageURL: "https://picsum.photos/200" // generate random image and pass into jsx
  };

  styles = {
    // CSS styles object to be passed into jsx. Properties are written in camel case.
    fontSize: 10,
    fontWeight: "bold"
  };

  render() {
    // return <h1> Hello World </h1>; // No error
    // return <h1> Hello World </h1> <button> Increment </button>; // Gives error as each react element has to have a parent if the element has more than 1 tags. This is because babel does not know the wrapper tag for this element and is confused whether to treat the element as a <h1> or as a <button>. Therefore, we define a parent tag to solve this, and call it a <div>. Another work around this is to use <React.Fragment> instead of <div> as including a parent <div> will make include an unneccessary div element otside our h1 and button
    // return ( // without using <div>
    //   <React.Fragment>
    //     <h1> Hello World </h1>
    //     <button> Increment </button>
    //   </React.Fragment>
    // );
    // return ( // using <div> and not React.Fragment
    // The below passes an image into jsx
    // <div>
    //   <img src={this.state.imageURL} alt="" />
    //   <span>{this.formatCount()}</span>
    //   <button> Increment </button>
    // </div>
    // The below passes a class into jsx
    // The below passes bootstrap class
    // <div>
    //   <span style={this.styles} className="badge badge-primary m-2">
    //     {this.formatCount()}
    //   </span>
    //   <button className="btn btn-secondary btn-sm"> Increment </button>
    // </div>
    // ); // className is keyword for passing class into jsx. badge is bootstrap class and m-2 provides 2 margin to badge. btn is button class and sm means small. the style attribute inside span is used to pass style sheet object into jsx. If we only need to pass say just 1 style then we can also use this syntax - style={ {fontSize: 30} } i.e directly entering the style object into jsx
    // If we use <span>{this.formatCount()}</span> without the {} then it will print on the browser this.formatCount() as string. Therefore we need to destructure the object as we are using jsx/html and not plain js here.
    // The HTML <span> tag is used for grouping and applying styles to inline elements. There is a difference between the span tag and the div tag. The span tag is used with inline elements whilst the div tag is used with block-level content.
  }

  formatCount() {
    // Can also pass functions into jsx
    const { count } = this.state; // Save value of the count key of this.state into a count variable - object destructuring
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
