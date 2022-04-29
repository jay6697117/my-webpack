'use strict';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './css/index.css';
import './css/search.less';
import logo from './img/logo.png';
// console.log('logo:', logo);

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      str: 'Search Text 6'
    };
  }
  handleClick() {
    alert('别点我');
  }
  render() {
    return (
      <div className='search-text'>
        <img src={logo} alt='logo' />
        <button onClick={this.handleClick.bind(this)}>{this.state.str}</button>
      </div>
    );
  }
}

ReactDom.render(<Search />, document.getElementById('root'));
