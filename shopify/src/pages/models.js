import React from "react";

class Models extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {}

  render() {
    return (
      <div>
        <h1>Hvilken model har du</h1>
        <ul id="iphone">
          <li data-model="iphone8plus">8</li>
          <li data-model="iphone8plus">8 plus</li>
          <li data-model="iphone8plus">7 plus</li>
        </ul>

        <ul id="samsung">
          <li data-model="samsung8">Note 8</li>
          <li data-model="samsung8">S8+</li>
          <li data-model="samsung7">S7</li>
          <li data-model="samsung8">Note 4</li>
        </ul>
      </div>
    );
  }
}

export default Models;
