import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

//Local Files
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount(){
    this.props.signout();
    setTimeout(() => {
      browserHistory.push('/');
    }, 3000);
  }

  render(){
    return (
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
        <div className="container">
          <h1 className="title">
            See you later!
          </h1>
          <h2 className="subtitle">
            You'll be redirected back to the front page soon
          </h2>
        </div>
      </div>
      </section>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuth: state.auth.authenticated
  }
}
export default connect(mapStateToProps, actions)(Signout);
