import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar_v1";
import Counters from "./components/counters_v2";

// State and event handlers were previously present in Counters component (counters_v1). But we moved them up to its parent i.e App.js, when navbar was introduced. We reuired that state changes update both the counters comp and the navabar comp therefore we have to move the state and the handlers from counters to app itself

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  // Lifecycle hooks:
  // NOTE Lifecycle hook - Constructor - Constructor of the Component which has a state, is the perfect place to initialize that state. Inside constructor we dont need to use setState and we can directly set the state
  // We cannot use lifecycle hooks inside a stateless functional component, as lifecycle hooks use class components
  // NOTE Lifecycle hook - componentDidMount - This executes after the render method - This is the perfect place to write AJAX calls to get data from server, after the component has been rendered. Once the new data arrives, we can use setState inside so as to change the state of the component. Additionally, component is mounted means that the component is in the browser DOM. render changes the virtual DOM and then React updates the browser DOM and then the component is said to be mounted
  // After all the children have also been rendered, then only the app mounts

  constructor() {
    super();
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log("App - Mounted"); // Printed after the render
    // AJAX call
  }

  handleReset = () => {
    // remember that to register clicks we use onClick and not onclick
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterID => {
    // console.log("Event Handler Called", counterID);
    const counters = this.state.counters.filter(c => c.id !== counterID);
    /* 
    Here weare filtering out the key counterID from the counters list in the state of counters class. We have to remove counterID key-value pair from the counters list in the state, but we cannot do this by directly manipulating the state and set the state ourselves. In react, we let react change the state using setState, otherwise react wont be able to register the change. NOTE if we want to set state directly, we do it by setting the state inside the constructor
    To filter out the counterID key value pair from the counters list, we make a new const counters and save into it all the key-value pairs (of counters list) except the counterID key value pair. c => c.id !==counterID is defining c as an iterator variable to iterate over the list and filter out the counterID form the list - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter.
    Thus we do not change the state directly, when a counter is deleted. Rather we make a new counters list and override the old counters list using this new counters list, with the setState method. With setState, react knows that there is a change in state and therefore will register it render again.
    */
    // this.setState({ counters: counters }); // Can also be written as below
    this.setState({ counters }); // Destructuring
  };

  handleIncrement = counter => {
    // This state changer/event handler was firstly present in the counter component. But as we wanted single source of truth so we moved all the control to counters component
    // console.log("Increment Clicked", counter);
    const counters = [...this.state.counters]; // ...this.state.counters uses the spread operator to clone all the items of the counters list (of the state object) into a new counters const
    /* // But cloning with the spread operator makes such a link between the const counters object and the counters list of the state object, that when  const counters is updated, it also changes the counters list of state object. 
    That is we are directly manipulating the state which will not be registered by react. We do not want to increment the other counter components when only 1 is changing. Therefore, we increment only the individual counter item that is changing for this current thread of execution
    // This can be demonstrated by the following:
    counters[0].value++;
    console.log(this.state.counters[0]);
    // Thus we will increment only the individual item (which is changing) of counters list. To do this we need the index of this particular counter id-value pair in the counters list
    */
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  render() {
    console.log("App - Rendered");

    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        {/* Can pass the number of counters by simply - this.state.counters.length. But we need not count in the navbar those counter comp which have value zero. Therefore we filter and count only those that have value > 0*/}
        <main className="container">
          <Counters
            counters={this.state.counters} // Pass list of counters to the counters comp
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />{" "}
          {/* Pass reference to counters comp when counters comp raises an event */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
