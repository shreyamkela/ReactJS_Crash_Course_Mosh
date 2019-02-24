// There are 4 counter components inside 1 counters component. The counter components are fully controlled by the counters component and there is no local state in the counter components. The counter components are 'controlled' components - no local state
// For previous version refer counter_v1

import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a. For eg, in the object { key: value } if key and value variables have the same name then it can be just written as { key }

class Counter extends Component {
  styles = {
    // CSS styles object to be passed into jsx. Properties are written in camel case.
    fontSize: 10,
    fontWeight: "bold"
  };

  render() {
    // On chrome developer tools we can see what is being changed with each render. It would show that only this below div is changing.
    //console.log("props", this.props); // All react components have a JS property called props and here it contains all the attributes set by the counters component

    return (
      <div>
        {/* <h4>{this.props.children}</h4> This is how we pass a children of a property i.e children props, from the counters component into the counter component*/}
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
            this.handleIncrement({ id: this.state.id }); // Could also have written id: this.props.id but as a good practice we pass the properties into the state and them use them by using the state object
          }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* We are using this.handleIncrement and not this.handleIncrement() here as we are passing a reference to handleIncrement and not calling handleIncrement(). In vanilla JS it would have been handleIncrement() here but his is how it is done in JSX, as here we reference it */}
        {/* {this.renderTags()} */}
        {/*This is how we comment in JSX, i.e multiline comment within curly braces. Here we have passed the if else method into JSX. We can also directly do an if else kind of structure inside JSX using && operator*/}
        {/* {this.state.tags.length === 0 && "Please create a new tag!"} */}
        {/* This is using if else with &&, directly inside JSX. In Javascript, we can apply logical operators even on non-boolean objects. The && and || operators actually return the value of one of the specified operands, so if these operators are used with non-Boolean values, they will return a non-Boolean value - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators . This uses the Truthy and falsy concept of javascript - https://stackoverflow.com/questions/35642809/understanding-javascript-truthy-and-falsy . In truthy, if all the operands are true, then the final operand is the result*/}
        <button
          // onClick={this.props.onDelete}
          onClick={() => {
            this.props.onDelete(this.props.counter.id);
          }}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* NOTE In React -  The component that owns a piece of the state, should be the one modifying it. Therefore we cannot have a counter_v1 component deleting itself from the state of counters (when we want to delete a counter component from counters). Thus we have to include the delete logic into counters itself. Different counters are listed in the state of counters class and if we want to remove any then delete logic should also be in the counters class only  */}
        {/*We have used onDelete={this.handleDelete} in Counters class, to register an event handler prop that passes a reference to this.handleDelete so that counter object can refer to this method of the counters class. We could not have added handleDelete method in counter class itself as handleDelete manipulates the state of counters class and the component that owns a piece of the state, should be the one modifying it. Now in counter class, we can reference this method for the current object and use this event handler for the deletion of that particular counter object. This is raising and handling of events. Counter class will raise an event and Counters class will handle that event. Counters class provides the handleDelete method which can be instantiated by counter object for the current object and can be used to delete the object.*/}
        {/* Thus onClick will make a reference or instantiate the handleDelete method of Counters class for this object as onDelete has been set as a prop in Counters class */}
        {/* We us the arrow function this.props.onDelete(this.props.counter.id) so as to pass the id of the counter object that we want to delete, to the Counters object */}
      </div>
    );
  }

  getBadgeClasses() {
    // Passing functions into jsx
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary"; //  Appending this CSS to the classes variable depending on the count. If not zero, colour is blue, else it is zero and yellow/warning colour
    return classes;
  }

  formatCount() {
    // Passing functions into jsx
    const { value: count } = this.state; // Save value of the count key of this.state into a count variable - object destructuring
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
