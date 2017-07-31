import React, { Component } from 'react';
import 'babel-polyfill';

//Local Files
import '../styles/App.css';

class App extends Component {


  render() {
    return (
				<div>
					{this.props.children}
				</div>
    );
  }
}

export default App;
