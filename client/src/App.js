import React from 'react';
import Home from './components/Home';
import Shop from './components/Shop';
import Basket from './components/Basket';
import Inventory from './components/Inventory';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: Inventory,
      view: 'Shop'
    };
  }

  changeView(selectedView) {
    this.setState({ view: selectedView });
    console.log(this.state.view);
  }

  render() {

    return (
      <div className="App">
          <Router>
            <nav>
              <div className="nav-grid">
                <h1>Goof Crü</h1>
                <div>
                  <Link to="/" className="link">Home</Link> /&nbsp;
                  <Link to="/shop" className="link">Shop</Link> /&nbsp;
                  About /&nbsp;
                  <Link to="/basket" className="link">Basket</Link>
                  {/* <span onClick={() => this.changeView('Basket')}>Basket</span> */}
                </div>
              </div>
            </nav>
            <img src="/images/hero.jpg" alt="skateboarder in Dubrovnik" className="hero"/>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/shop">
                <Shop stock={this.state.stock}/>
              </Route>
              <Route path="/basket">
                <Basket/>
              </Route>
            </Switch>
          </Router>
          <hr/>
          <div className="footer">
            © GOOF CRÜ 2020
          </div>
      </div>
    );
  }
}

export default App;
