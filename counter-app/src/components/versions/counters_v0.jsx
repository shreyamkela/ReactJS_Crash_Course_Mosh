// Reset button of Counters component has to reset the state of the child counter components, as we have to update the value property of the state of each counter, when reset is clicked. But reset is a part of counters class instance and thus it cannot change the state of the child counter instances. The child counter instances have the counter value inside their state and the counters instance cannot change this.
// This is because we are trying to manage the state of counter object from 2 places. One is inside the counter object itself when we use handleIncrement and the other is from outside that is the counters parent instance which is trying to changes state of all counters when reset is clicked. Thus there is no single source of truth i.e the state should of counter instance should be managed from only one place. Also, the local state object of counter class is executed only once - when a new counter object is created
// To fix this we need to remove the local state from counter component and have a single source of truth governed by counters component.
// We control the increment from the counters component and reflect it on the individual counter with the help of arrow functions inside the tags while rending the count display. Thus the counter components will be fully controlled by the counters component, they will not have their own local states.
// This is implemented in counters_v1

// There is 1 counters component that is the parent to 4 child counter components

import React, { Component } from "react";
import Counter from "./counter_v1";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleReset = () => {
    const counters = this.state.counter.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterID => {
    // console.log("Event Handler Called", counterID);
    const counters = this.state.counters.filter(c => c.id !== counterID);
    /* 
    Here weare filtering out the key counterID from the counters list in the state of counters class. We have to remove counterID key-value pair from the counters list in the state, but we cannot do this by directly manipulating the state and set the state ourselves. In react, we let react change the state using setState, otherwise react wont be able to register the change. 
    To filter out the counterID key value pair from the counters list, we make a new const counters and save into it all the key-value pairs (of counters list) except the counterID key value pair. c => c.id !==counterID is defining c as an iterator variable to iterate over the list and filter out the counterID form the list - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter.
    Thus we do not change the state directly, when a counter is deleted. Rather we make a new counters list and override the old counters list using this new counters list, with the setState method. With setState, react knows that there is a change in state and therefore will register it render again.
    */
    // this.setState({ counters: counters }); // Can also be written as below
    this.setState({ counters }); // Destructuring
  };

  render() {
    return (
      <div>
        <button
          onclick={this.handleReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {/* <Counter />
        <Counter />
        <Counter />
        <Counter /> Instead of hardcoding 4 Counter components to pass them here, we can set 4 counters in the state and then pass that state object here. THis is done below*/}
        {this.state.counters.map(counter => (
          /* <Counter
            key={counter.id}
            value={counter.value}
            id={counter.id}
            onDelete={this.handleDelete}
          /> We have used onDelete={this.handleDelete} to register an event handler prop that passes a reference to this.handleDelete so that counter object can refer to this method of the counters class. We could not have added handleDelete method in counter class itself as handleDelete manipulates the state of counters class and the component that owns a piece of the state, should be the one modifying it. Now in counter class, we can reference this method for the current object and use this event handler for the deletion of that particular counter object. This is raising and handling of events. Counter class will raise an event and Counters class will handle that event. Counters class provides the handleDelete method which can be instantiated by counter object for the current object and can be used to delete the object. */
          // Can also add selected = true tag here - https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
          // This whole counter tag is to send children props to the counter object. This can be used for example when we distribute components of dialog boxes to consumers and they can specify their own warning messages in the dialog box components through this children preperty. This is used to pass complex elements as children of the property
          /* <Counter key={counter.id} value={counter.value}>
            <h4>Counter #{counter.id}</h4>
          </Counter> */
          // We have used value={counter.value} and id={counter.id} above, we can reduce the code here by sending the whole counter variable (declared in map()) to the current counter object
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.handleDelete}
          />
        ))}
        {/* Map all the items in the counters list of the state object. Map each to a counter object with a key equal to counter id */}
      </div>
    );
  }
}

export default Counters;
