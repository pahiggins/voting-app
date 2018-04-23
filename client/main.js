import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});