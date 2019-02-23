import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a

class Counter extends Component {
  state = {
    count: 0,
    tags: []
  };

  //   constructor() { //
  //       // This is required for event handler handleIncrement. Can also use arrow function event handlers instead of binding the event handler using constructor, but that method is experimental according to Mosh. Can just use this constructor and non-arrow function event handler if it breaks
  //       // New instance of the counter has to be bound with a new instance of handleIncrement. A work around for this is using handleIncrement as an arrow function.  Arrow functions dont rebind 'this', rather they inherit 'this'
  //     // Counter is a child class of Component. Therefore it has to first call super() for Component inside this constructor, before Counter can implement its own code in the constructor. Counter has to inherit all, inside the constructor and then only it can use this keyword.
  //     super();
  //     // console.log("Constructor", this);
  //     // Now we need the bind method to bind the instance created by constructor, to the handleIncrement, so that each time handleIncrement is referenced, it points to the current instance. This is possible by the property in that functions in JS are objects. Therefore functions themselves can have properties and methods. One of the methods is bind method- this.handleIncrement.bind(this) - will return a new instance of handleIncrement. Inside this new instance of the function, this keyword will always refer to the current counter object. This can be used to reset the handleIncrement function so that handleIncrement can be used with a new instance of Counter. Otherwise, each different counter object/cart item will be using the same counter which is bad.
  //     // this.handleIncrement.bind(this); // bind a new instance of handleIncrement to the current this
  //     this.handleIncrement = this.handleIncrement.bind(this); // bind a new instance of handleIncrement to the current this, and return as this.handleIncrement, so that this.handleIncrement of the current object is different than this.handleIncrement of the previous object
  //   }

  styles = {
    // CSS styles object to be passed into jsx. Properties are written in camel case.
    fontSize: 10,
    fontWeight: "bold"
  };

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

  //   handleIncrement() { // Binding the handleIncrement event handler using constructor
  //     // This is an event handler
  //     // Increment the counter
  //     console.log("Increment Clicked", this); // NOTE this gives error. We use handleIncrement as a reference and so we cannot use this keyword, because this keyword cannot point to anything when it is being manipulated by its reference. To manipulate this keyword with reference we need to add constructor to this counter class. When a constructor is added, then the reference would be able to use the this keyword as constructor will construct the object. In all other methods, such as renderTags we use renderTags() therefore it is not a reference rather we are using the methods of a class as if they were static methods. But in handleIncrement we treat handleIncrement as a nonstatic method, as if a class object is using it. So without the this being constructed, we cannot use this. There we have to use the constructor.
  //   }

  handleIncrement = product => {
    // id is passed with the arrow function inside onCLick. That id is the product
    // Using arrow function to serve handleIncrement event handler, without binding with constructor. This method is experimental according to Mosh. Can just use the constructor and non-arrow function event handler if it breaks
    // This is an event handler
    // Increment the counter
    console.log("Increment Clicked", this); // NOTE this gives error. We use handleIncrement as a reference and so we cannot use this keyword, because this keyword cannot point to anything when it is being manipulated by its reference. To manipulate this keyword with reference we need to add constructor to this counter class. When a constructor is added, then the reference would be able to use the this keyword as constructor will construct the object. In all other methods, such as renderTags we use renderTags() therefore it is not a reference rather we are using the methods of a class as if they were static methods. But in handleIncrement we treat handleIncrement as a nonstatic method, as if a class object is using it. So without the this being constructed, we cannot use this. There we have to use the constructor.
    // this.state.count++; // This doesnt work in React. React does not know that counter is updated and does not update the view. To update the counter we have to use a method provided by the Component class - setState
    this.setState({ count: this.state.count + 1 }); // What ever has to be updated in the state is mentioned in the setState. It will checnge/override the current properties of state. This is different than angular in which changes are reflected automatically using monkey pipe
    // When setState is used, React registers an async call to the render method. That is, render will be called sometime after set state is called.
    console.log(product);
  };

  render() {
    return (
      <div>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        {/*
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
         onClick of react is not the same as onclick of html. This onClick can take a reference to a function NOTE: it cannot call a function or a function with parameteres. We can define another arrow functiondoHandleIncrement to pass an id into handleIncrement so that an id also goes with the particular button clicked. Or, we can straight away pass an arrow function inside the onClick that passes an id into handleIncrement and calls it
        */}
        <button
          onClick={() => {
            this.handleIncrement({ id: 1 });
          }}
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
