// For previous version refer counters_v1
// To change both navbar and counters component when a counter is deleted or added, we need to move the state of Counters component up by 1 level (as navbar and counters component are siblings). Their parent is the app itself i.e app.js. So if the state is controlled by the app itself, it can be used by the children navbar and counters component, by using props.
// This is done in counters_v2. All the state and methods that modify the state i.e the event handler methods are moved up to the App itself
// NOTE Here navbar and counters component are siblings. What if there are 2 nodes that we want to update that dont have such a close relationship? In big projects their are many nodes that have inter related updates bu are very far away in the tre structure. To tackle updates in such cases, we use reducers such as Redux
// In redux, the updates are in global therefore every has access to it. Also, here we have move the state update to App, which is essentially global. So here, we could potentially be doing what Redux does actually.

import React, { Component } from "react";
import Counter from "./counter_v2";

class Counters extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>

        {this.props.counters.map(counter => (
          // take in list of counters as a prop
          // Map all the items in the counters list of the state object. Map each to a counter object with a key equal to counter id
          // This whole counter tag is to send children props to the counter object. This can be used for example when we distribute components of dialog boxes to consumers and they can specify their own warning messages in the dialog box components through this children preperty. This is used to pass complex elements as children of the property
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            // Counter component raises an event which bubbles up to the parent i.e counters comp. Counters comp doesnt handle it rather it bubbles it up to the App component, which has the handler. This is where Redux can be used, to reduce these bubble ups. With redux, a change in the counter component which also has to be reflected on the navbar, can directly be handled, without the 2 bubble ups.
          />
        ))}
      </div>
    );
  }
}

export default Counters;
