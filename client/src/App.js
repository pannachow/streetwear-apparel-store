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
      basket: []
      // view: 'Shop'
    };
  }

  changeView(selectedView) {
    this.setState({ view: selectedView });
    console.log(this.state.view);
  }

  addToBasket(item) {
    if (this.state.basket.includes(item)) {
      item['quantity']++;
    } else {
      this.setState({basket: [...this.state.basket, item]});
      // console.log('Basket now contains:', this.state.basket);
    }
  }

  removeFromBasket(selectedItem) {
    let itemIndex = this.state.basket.findIndex (item => item.id === selectedItem.id);
    let updatedBasket = [...this.state.basket];
    let removedItem = this.state.basket[itemIndex];
    if (removedItem['quantity'] > 1) {
      removedItem['quantity']--;
      updatedBasket.splice(itemIndex, 1, removedItem)
    } else {
      updatedBasket.splice(itemIndex, 1);
    }
    this.setState({basket: updatedBasket});
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
                <Shop stock={this.state.stock} addToBasket={item => this.addToBasket(item)}/>
              </Route>
              <Route path="/basket">
                <Basket items={this.state.basket} removeFromBasket={item => this.removeFromBasket(item)}/>
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
