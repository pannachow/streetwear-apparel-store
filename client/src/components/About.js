import React from 'react';
import './About.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      message: '',
      messageSent: false
    };
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
        [name]: value
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      // currently this method only console.logs the submitted message
      console.log('Submitted:', this.state);
      this.setState({
          name: '',
          contact: '',
          message: '',
          messageSent: true
      });
  }

  render() {

    return (
      <div className="About">
        <h3>About</h3>
        <hr/>
        <div className="grid">
          <img src="images/goofcru.gif" alt="Sundown skateboard gif"/>
          <div>
            <h3>
              "Goof Crü is an independant streetwear brand, founded in 2020, in London. We produce genderless clothing and accessories sourced 
              from ethical manufacturers, which are screenprinted or embroidered by hand.
            </h3>
            <h3>  
              The brand was created to celebrate and empower the underdogs 
              and provide a non-elitest streetwear brand for EVERYONE."
            </h3>
            <p>
              As well as making clothing, we also offer free skateboarding lessons and produce 
              a quarterly zine with contributions from various writers, photographers, illustrators and artists. Please get in touch in you want your
              work to be featured!
            </p>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="message">
                <p>Send a message:</p>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleInputChange(e)}
                  placeholder="Enter name"
                />
              </div>
              <div className="message">
                <input
                  type="text"
                  name="contact"
                  value={this.state.contact}
                  onChange={(e) => this.handleInputChange(e)}
                  placeholder="Email address"
                />
              </div>
              <div className="message">
                <textarea
                  type="text"
                  name="message"
                  value={this.state.message}
                  onChange={(e) => this.handleInputChange(e)}
                  placeholder="Say something!"
                  rows="3"
                />
                <div>
                  <button
                    type="submit"
                    className={!this.state.messageSent ? "" : "active"}
                    >
                      {!this.state.messageSent ? "Submit" : "Message sent!"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default About;
