import React from 'react';
import './App.css';

const API_URL = "http://www.omdbapi.com/?apikey=2d9169e9&t=moonstruck";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: null
    };
  }

  componentDidMount() {
    let options = {
      "method": "GET"
    };
    fetch(API_URL, options)
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        arr.push(json);
        this.setState({ object: json });
      })
      .catch(error => {
        console.log("ERROR in componentDidMount():", error);
      });
  }

  render() {

    console.log(arr[0]);
    return (
      <div className="App">
        <h1>Here is the app</h1>
      </div>
    );
  }

}

export default App;
