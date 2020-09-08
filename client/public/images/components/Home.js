import React from 'react';
import './Home.css';

class Home extends React.Component {

  render() {

    return (
      <div className="Home">
        <h2>"Skate culture for the many and the few."</h2>
        <hr/>
        <div className="grid">
          <div>
            some text
          </div>
          <img src="/images/goofcru-home1.jpg" alt="skateboard in sunlight"/>
        </div>
      </div>
    );
  }

}

export default Home;
