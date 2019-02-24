// Use this with counter_v2 and index.js which renders <Counters> component
// For newer version refer counters_v2
// The navbar is at the same level as counters component. But there is no parent child relationship between counters component and navbar, rather they are siblings. How do we pass state between siblings? What we want to do is change the navbar count according to the bumber of counters, which is controlled by the counters component.
// To change both navbar and counters component when a counter is deleted or added, we need to move the state of Counters component up by 1 level (as navbar and counters component are siblings). Their parent is the app itself i.e app.js. So if the state is controlled by the app itself, it can be used by the children navbar and counters component, by using props.
// This is done in counters_v2. All the state and methods that modify the state i.e the event handler methods are moved up to the App itself
// NOTE Here navbar and counters component are siblings. What if there are 2 nodes that we want to update that dont have such a close relationship? In big projects their are many nodes that have inter related updates bu are very far away in the tre structure. To tackle updates in such cases, we use reducers such as Redux
// In redux, the updates are in global therefore every has access to it. Also, here we have move the state update to App, which is essentially global. So here, we could potentially be doing what Redux does actually.

// There is 1 counters component that is the parent to 4 child counter components. The counter components are fully controlled by the counters component and there is no local state in the counter components. The counter components are 'controlled' components - no local state. A controlled component receives all the data via props and raises events when ever any data needs to be changed. The controller component handles these events and sends the data via props.
// For previous version refer counters_v0

import React, { Component } from "react";
import Counter from "./counter_v2";

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
    Here weare filtering out the key counterID from the counters list in the state of counters class. We have to remove counterID key-value pair from the counters list in the state, but we cannot do this by directly manipulating the state and set the state ourselves. In react, we let react change the state using setState, otherwise react wont be able to register the change. 
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
    return (
      <div>
        <button
          onClick={this.handleReset}
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
            onIncrement={this.handleIncrement}
          />
        ))}
        {/* Map all the items in the counters list of the state object. Map each to a counter object with a key equal to counter id */}
      </div>
    );
  }
}

export default Counters;
