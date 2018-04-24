import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import Items from '../api/Items';
import Item from './Item';

class App extends Component {
  addItems(event) {
    event.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();

    if (itemOne !== '' && itemTwo !== '') {
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if (!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        }
      });
    }
  }
  showAll() {
    if (this.props.showAll) {
      Session.set('showAll', false);
    } else {
      Session.set('showAll', true);
    }
  }
  render() {
    if (!this.props.ready) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Level Up Voting</h1>
        <LoginButtons />
        <button onClick={this.showAll.bind(this)}>
          Show {this.props.showAll ? 'One' : 'All'}
        </button>
        <main>
          <form className="new-items" onSubmit={this.addItems.bind(this)}>
            <input type='text' ref='itemOne' />
            <input type='text' ref='itemTwo' />
            <button type='submit'>Add Items</button>
          </form>
          {this.props.items.map(item => <Item key={item._id} item={item} />)}
        </main>
      </div>
    );
  }
}

export default createContainer(() => {
  let itemsSub = Meteor.subscribe('allItems');
  let showAll = Session.get('showAll');

  return {
    showAll,
    ready: itemsSub.ready(),
    items: Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App);