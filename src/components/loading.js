import React from 'react';
import Spinner from 'react-spinkit';

const Loading = (props) => {
  return (
    <section className="hero is-fullheight">
    <div className="hero-body has-text-centered">
      <span style={{margin: 'auto'}}><Spinner name="wave" /></span>
    </div>
    </section>
  );
}

export default Loading;
