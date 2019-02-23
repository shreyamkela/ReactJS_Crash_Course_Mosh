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
  render() {
    return (
      <div>
        {/* <Counter />
        <Counter />
        <Counter />
        <Counter /> Instead of hardcoding 4 Counter components to pass them here, we can set 4 counters in the state and then pass that state object here. THis is done below*/}
        {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} /> // Can also add selected = true tag here - https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
        ))}{" "}
        {/* Map all the items in the counters list of the state object. Map each to a counter object with a key equal to counter id */}
      </div>
    );
  }
}

export default Counters;
