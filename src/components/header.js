import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

//Local files
import * as actions from '../actions';

class Header extends Component {

      constructor(props){
        super(props);
        this.state = {
          isMobile: false
        }
      }

      renderAuthButtons(){
				if(this.props.currentUserRole === 'admin'){
					if (this.props.authenticated) {
	          return [
	            <div className="navbar-item" key='HeaderFirstName'><Link to='/'>Welcome {this.props.currentUserFirstName}!</Link></div>,
								<div className="navbar-item" key='HeaderAddPost'><Link to="/addPost">Add Post</Link></div>,
	            <div className="navbar-item" key='HeaderSignOut'><Link to="/signout">Sign out</Link></div>
	          ]
	        } else {
	          return [
							<div className="navbar-item" key='HeaderSignIn'><Link to="/signin">Sign in</Link></div>,
							<div className="navbar-item" key='HeaderSignUp'><Link to="/signup">Sign up</Link></div>
						]
	        }
				} else {
					if (this.props.authenticated) {
	          return [
	            <div className="navbar-item" key='HeaderFirstName'><Link to='/'>Welcome {this.props.currentUserFirstName}!</Link></div>,
	            <div className="navbar-item" key='HeaderSignOut'><Link to="/signout">Sign out</Link></div>
	          ]
	        } else {
	          return [
							<div className="navbar-item" key='HeaderSignIn'><Link to="/signin">Sign in</Link></div>,
							<div className="navbar-item" key='HeaderSignUp'><Link to="/signup">Sign up</Link></div>
						]
	        }
				}
      }

      render(){
        return (
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <Link className="navbar-item" to="/home">
                  <img src="https://cdn1.iconfinder.com/data/icons/stone-age/500/Caveman_4-512.png" alt="caveman" style={{marginRight: 15}} />
                  Caveman Coder
                </Link>

                <div className={`navbar-burger burger + ${this.state.isMobile ? 'is-active' : ''}`} data-target="navMenuExample"
                  onClick={() => {this.setState({isMobile: !this.state.isMobile})}}>
                   <span></span>
                   <span></span>
                   <span></span>
                 </div>
              </div>

              <div id="navMenuExample" className={`navbar-menu + ${this.state.isMobile ? 'is-active' : ''}`}>
                <div className="navbar-end">
                  {this.renderAuthButtons()}
                </div>
              </div>
            </div>
          </nav>
        );
      }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated,
    currentUserFirstName: state.currentUserFirstName,
		currentUserRole: state.currentUserRole
  }
}

export default connect(mapStateToProps, actions)(Header);
