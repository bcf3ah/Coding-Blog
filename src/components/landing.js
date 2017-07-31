import React, {Component} from 'react';
import {Link} from 'react-router';

//local files
import '../styles/landing.css';

class Landing extends Component {
  render(){
    return (
      <section className="hero is-primary is-fullheight landing-page">
        <div className="hero-head">
          <div className="container">
            <nav className="navbar is-transparent" style={{backgroundColor: "transparent"}}>
              <div className="navbar-brand">
                <Link className="navbar-item" to="/home">
                  <img src="https://cdn1.iconfinder.com/data/icons/stone-age/500/Caveman_4-512.png" alt="caveman"/>
                </Link>
              </div>

              <div id="navMenuExample" className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="field is-grouped">
                      <p className="control">
                        <a className="button is-primary" href="https://github.com/bcf3ah/ProgrammingBlog"  rel="noopener noreferrer" target="_blank">
                          <span className="icon">
                            <i className="fa fa-github"></i>
                          </span>
                          <span>GitHub</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns is-vcentered">
              <div className="column is-6 is-offset-6">
                <h1 className="title is-3">
                  Caveman Coder Blog
                </h1>
                <h2 className='subtitle'>Brian Fitzsimmons</h2>
                <br />
                  <div className="field is-grouped" style={{justifyContent: 'center'}}>
                    <p className="control">
                      <Link className="button is-rounded" to="/home" style={{backgroundColor: 'transparent', color:'white'}}>
                        Read
                      </Link>
                    </p>
                    <p className="control">
                      <Link to="/signup" className="button is-rounded" >
                        Sign up
                      </Link>
                    </p>
                    <p className="control">
                      <Link to="/signin" className="button is-rounded" >
                        Sign in
                      </Link>
                    </p>
                  </div>
            </div>
          </div>
        </div>
      </div>

      </section>

    );
  }
}

export default Landing;
