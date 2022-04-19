'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './css/search.less';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      str: 'Search Text 66'
    };
  }
  handleClick() {
    alert('别点我');
  }
  render() {
    return (
      <div className='search-text'>
        <button onClick={this.handleClick.bind(this)}>
          {this.state.str}
        </button>
      </div>
    );
  }
}

ReactDom.render(<Search />, document.getElementById('root'));
