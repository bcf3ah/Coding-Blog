import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {Link} from 'react-router';

//Local Files
import * as actions from '../../actions';
import '../../styles/signin.css';


class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleFormSubmit(){
    const email = this.state.email;
    const password = this.state.password;
    //need to do login logic here!
    this.props.signin({email, password});//the response to this request should be the JWT now!
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }




  render(){
    return (
      <div className="login-wrapper columns login-page">
        <div className="column">
          <section className="hero is-fullheigh is-darkt">
            <div className="hero-heading">
              <Link className="navbar-item" to="/home">
                <img src="https://cdn1.iconfinder.com/data/icons/stone-age/500/Caveman_4-512.png" alt="caveman" />
              </Link>
              <div className="section has-text-centered">
                <h1 className="title">Sign in</h1>
              </div>
              <br />
            </div>
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column is-4 is-offset-4">
                    <div className="login-form">
                      <p className="control has-icon has-icon-right">
                        <input className="input email-input" type="text" placeholder="jsmith@example.org"
                          value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                        <span className="icon user">
                          <i className="fa fa-user"></i>
                        </span>
                      </p>
                      <br />
                      <p className="control has-icon has-icon-right">
                        <input className="input password-input" type="password" placeholder="●●●●●●●"
                          value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                        <span className="icon user">
                          <i className="fa fa-lock"></i>
                        </span>
                      </p>
                      <p className="control login">
                        <button className="button is-success is-outlined is-large is-fullwidth"
                          onClick={this.handleFormSubmit.bind(this)}>Sign in</button>
                      </p>
                    </div>
                    <div className="section forgot-password">
                      <p className="has-text-centered">
                        <a data-tip="React-tooltip">Forgot Password</a>
                        <ReactTooltip place="left" type="dark" effect="solid">
                          <span>Huh. You should do something about that.</span>
                        </ReactTooltip>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signin);
