import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a

class Counter extends Component {
  state = {
    count: 1,
    imageURL: "https://picsum.photos/200", // generate random image and pass into jsx
    tags: []
  };

  styles = {
    // CSS styles object to be passed into jsx. Properties are written in camel case.
    fontSize: 10,
    fontWeight: "bold"
  };

  // render() {
  // return <h1> Hello World </h1>; // No error
  // return <h1> Hello World </h1> <button> Increment </button>; // Gives error as each react element has to have a parent if the element has more than 1 tags. This is because babel does not know the wrapper tag for this element and is confused whether to treat the element as a <h1> or as a <button>. Therefore, we define a parent tag to solve this, and call it a <div>. Another work around this is to use <React.Fragment> instead of <div> as including a parent <div> will make include an unneccessary div element otside our h1 and button
  /*
    return ( // without using <div>
      <React.Fragment>
        <h1> Hello World </h1>
        <button> Increment </button>
      </React.Fragment>
    );
    */
  /*
    return ( // using <div> and not React.Fragment
    // The below passes an image into jsx
    <div>
      <img src={this.state.imageURL} alt="" />
      <span>{this.formatCount()}</span>
      <button> Increment </button>
    </div>
    // The below passes a class into jsx
    // The below passes bootstrap class
    <div>
      <span style={this.styles} className="badge badge-primary m-2">
        {this.formatCount()}
      </span>
      <button className="btn btn-secondary btn-sm"> Increment </button>
    </div>
    ); // className is keyword for passing class into jsx. badge is bootstrap class and m-2 provides 2 margin to badge. btn is button class and sm means small. the style attribute inside span is used to pass style sheet object into jsx. If we only need to pass say just 1 style then we can also use this syntax - style={ {fontSize: 30} } i.e directly entering the style object into jsx
    // If we use <span>{this.formatCount()}</span> without the {} then it will print on the browser this.formatCount() as string. Therefore we need to destructure the object as we are using jsx/html and not plain js here.
    // The HTML <span> tag is used for grouping and applying styles to inline elements. There is a difference between the span tag and the div tag. The span tag is used with inline elements whilst the div tag is used with block-level content.
    */

  renderTags() {
    // To pass an if else inside JSX. Here if there are no tags, we output the below string, otherwise we output the tags themselves
    if (this.state.tags.length === 0) return <p> There are no tags! </p>;

    return (
      // To pass an iterate kind of method inside JSX. Now here we have eto include the tags list. We do this by using the unordered list tag. Then inside that we need to render each list item. We dont have loops in JSX, like in angular but we have the map function that we can use inside JSX to list all the elements inside an object. indie the map function we use an arrow function to list each item using li tag. Rach list item needs to have a unique id for React to be able to function properly (because if the list ids are same then react doesnt know how to track individual item changes inside the list), and for that we save the value of tage as the key itself, for the li tag
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}> {tag} </li>
        ))}
      </ul>
    );
  }

  handleIncrement() {
    console.log("Increment Clicked");
  }

  render() {
    return (
      <div>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>{" "}
        {/* We are using this.handleIncrement and not this.handleIncrement() here as we are passing a reference to handleIncrement and not calling handleIncrement(). In vanilla JS it would have been handleIncrement() here but his is how it is done in JSX, as here we reference it */}
        {this.renderTags()}
        {/*This is how we comment in JSX, i.e multiline comment within curly braces. Here we have passed the if else method into JSX. We can also directly do an if else kind of structure inside JSX using && operator*/}
        {this.state.tags.length === 0 && "Please create a new tag!"}{" "}
        {/* This is using if else with &&, directly inside JSX. In Javascript, we can apply logical operators even on non-boolean objects. The && and || operators actually return the value of one of the specified operands, so if these operators are used with non-Boolean values, they will return a non-Boolean value - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators . This uses the Truthy and falsy concept of javascript - https://stackoverflow.com/questions/35642809/understanding-javascript-truthy-and-falsy . In truthy, if all the operands are true, then the final operand is the result*/}
      </div>
    );
  }

  getBadgeClasses() {
    // Passing functions into jsx
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary"; //  Appending this CSS to the classes variable depending on the count. If not zero, colour is blue, else it is zero and yellow/warning colour
    return classes;
  }

  formatCount() {
    // Passing functions into jsx
    const { count } = this.state; // Save value of the count key of this.state into a count variable - object destructuring
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
