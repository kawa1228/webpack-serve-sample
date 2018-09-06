import React from "react";
import { render } from "react-dom";

export default class Sample extends React.Component {
  constructor() {
    console.log('hoge')
  }

  render() {
    return (
      <div>
        <h1>Hello Aya Kawasumi</h1>
      </div>
    );
  }
}

