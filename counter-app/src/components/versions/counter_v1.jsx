// Reset button of Counters component has to reset the state of the child counter components, as we have to update the value property of the state of each counter, when reset is clicked. But reset is a part of counters class instance and thus it cannot change the state of the child counter instances. The child counter instances have the counter value inside their state and the counters instance cannot change this. Refer - https://stackoverflow.com/questions/47182888/what-does-the-single-source-of-truth-mean
// This is because we are trying to manage the state of counter object from 2 places. One is inside the counter object itself when we use handleIncrement and the other is from outside that is the counters parent instance which is trying to changes state of all counters when reset is clicked. Thus there is no single source of truth i.e the state should of counter instance should be managed from only one place. Also, the local state object of counter class is executed only once - when a new counter object is created
// There is no link between the reset state change in Counters component to the individual states of the counter components. To fix this we need to remove the local state from counter component and have a single source of truth governed by counters component.
// We control the increment from the counters component and reflect it on the individual counter with the help of arrow functions inside the tags while rending the count display. Thus the counter components will be fully controlled by the counters component, they will not have their own local states.
// This is implemented in counter_v2

// There are 4 counter components inside 1 counters component

import React, { Component } from "react"; // using { Component } with object destructuring - https://stackoverflow.com/questions/41768205/difference-between-import-react-and-import-component-syntax , https://medium.com/@AnnaJS15/a-simple-guide-to-destructuring-props-in-react-f02e6e51143a. For eg, in the object { key: value } if key and value variables have the same name then it can be just written as { key }

class Counter extends Component {
  state = {
    // This will be removed if the counters component fully controls the counter component and there is no local state in the counter components
    // NOTE state instance is executed only once - when a new counter object is created
    // count: 0, // NOTE count is renamed to value when adding this.props.counter.value. Counters class is sending into counter class instance a prop counter which has the id, value, etc of the current counter
    value: this.props.counter.value, // value has been set for each counter in the Counters component and can be used here
    id: this.props.counter.id // Using the id set by props
    // tags: []
  }; // Difference between props and state - Props are read only objects that are associated with objects, and props of one components can be read by other components. Props can be sent as inputs to a component. Props are defined when we use an object in JSX. For eg, <Counter prop1="..." prop2="..."> ... </Counter>. Input porps can set the state. State is readable and writable (setState()) but is local to a component. State of one component cannot be accessed by other components

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

  // renderTags() {
  //   // To pass an if else inside JSX. Here if there are no tags, we output the below string, otherwise we output the tags themselves
  //   if (this.state.tags.length === 0) return <p> There are no tags! </p>;

  //   return (
  //     // To pass an iterate kind of method inside JSX. Now here we have eto include the tags list. We do this by using the unordered list tag. Then inside that we need to render each list item. We dont have loops in JSX, like in angular but we have the map function that we can use inside JSX to list all the elements inside an object. indie the map function we use an arrow function to list each item using li tag. Rach list item needs to have a unique id for React to be able to function properly (because if the list ids are same then react doesnt know how to track individual item changes inside the list), and for that we save the value of tage as the key itself, for the li tag
  //     <ul>
  //       {this.state.tags.map(tag => (
  //         <li key={tag}> {tag} </li>
  //       ))}
  //     </ul>
  //   );
  // }

  //   handleIncrement() { // Binding the handleIncrement event handler using constructor
  //     // This is an event handler
  //     // Increment the counter
  //     console.log("Increment Clicked", this); // NOTE this gives error. We use handleIncrement as a reference and so we cannot use this keyword, because this keyword cannot point to anything when it is being manipulated by its reference. To manipulate this keyword with reference we need to add constructor to this counter class. When a constructor is added, then the reference would be able to use the this keyword as constructor will construct the object. In all other methods, such as renderTags we use renderTags() therefore it is not a reference rather we are using the methods of a class as if they were static methods. But in handleIncrement we treat handleIncrement as a nonstatic method, as if a class object is using it. So without the this being constructed, we cannot use this. There we have to use the constructor.
  //   }

  handleIncrement = product => {
    // This will be removed if the counters component fully controls the counter component and there is no local state in the counter components
    // id is passed with the arrow function inside onCLick. That id is the product
    // Using arrow function to serve handleIncrement event handler, without binding with constructor. This method is experimental according to Mosh. Can just use the constructor and non-arrow function event handler if it breaks
    // This is an event handler
    // Increment the counter
    console.log("Increment Clicked", this); // NOTE this gives error. We use handleIncrement as a reference and so we cannot use this keyword, because this keyword cannot point to anything when it is being manipulated by its reference. To manipulate this keyword with reference we need to add constructor to this counter class. When a constructor is added, then the reference would be able to use the this keyword as constructor will construct the object. In all other methods, such as renderTags we use renderTags() therefore it is not a reference rather we are using the methods of a class as if they were static methods. But in handleIncrement we treat handleIncrement as a nonstatic method, as if a class object is using it. So without the this being constructed, we cannot use this. There we have to use the constructor.
    // this.state.count++; // This doesnt work in React. React does not know that counter is updated and does not update the view. To update the counter we have to use a method provided by the Component class - setState
    this.setState({ value: this.state.value + 1 }); // What ever has to be updated in the state is mentioned in the setState. It will checnge/override the current properties of state. This is different than angular in which changes are reflected automatically using monkey pipe
    // When setState is used, React registers an async call to the render method. That is, render will be called sometime after set state is called.
    console.log(product);
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
