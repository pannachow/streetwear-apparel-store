import React from 'react';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import Basket from './components/Basket';
import Inventory from './components/Inventory';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: Inventory,
      basket: [],
      basketItems: 0,
      total: 0,
      orderPlaced: false
    };
  }

  addToBasket(item) {
    if (this.state.orderPlaced) {
      this.setState({orderPlaced: false});
    }
    let sum = this.state.total;
    sum += item['price'];
    let itemCount = this.state.basketItems;
    itemCount++;
    if (this.state.basket.length === 0) {
      this.setState({viewBasket: true});
    }
    if (this.state.basket.includes(item)) {
      item['quantity']++;
      this.setState({
        total: sum,
        basketItems: itemCount
      });
    } else {
      this.setState({
        basket: [...this.state.basket, item],
        total: sum,
        basketItems: itemCount
      });
    }
  }

  removeFromBasket(selectedItem) {
    let itemIndex = this.state.basket.findIndex (item => item.id === selectedItem.id);
    let updatedBasket = [...this.state.basket];
    let removedItem = this.state.basket[itemIndex];
    let sum = this.state.total;
    let itemCount = this.state.basketItems;
    itemCount--;
    sum -= removedItem['price'];
    if (removedItem['quantity'] > 1) {
      removedItem['quantity']--;
      updatedBasket.splice(itemIndex, 1, removedItem)
    } else {
      updatedBasket.splice(itemIndex, 1);
    }
    if (updatedBasket.length === 0) {
      this.setState({viewBasket: false});
    }
    this.setState({
      basket: updatedBasket,
      total: sum,
      basketItems: itemCount
    });
  }

  clearBasket() {
    this.setState({
      basket: [],
      basketItems: 0,
      total: 0,
      orderPlaced: true
    });
  }

  render() {

    return (
      <div className="App">
          <Router>
            <nav>
              <div className="nav-grid">
                <h1>G<span className="goof">oo</span>f Cr<span className="goof">ü</span></h1>
                <div>
                  <span style={{fontSize: "1.6em"}}>&#8618; </span>
                  <NavLink exact to="/" className="link" activeClassName="active">Home</NavLink> /&nbsp;
                  <NavLink to="/shop" className="link" activeClassName="active">Shop</NavLink> /&nbsp;
                  <NavLink to="/about" className="link" activeClassName="active">About</NavLink> /&nbsp;
                  {
                    this.state.basketItems === 0
                    ? <NavLink to="/basket" className="link" activeClassName="active">Basket</NavLink>
                    : <NavLink to="/basket" className="link" activeClassName="active">Basket ({this.state.basketItems})</NavLink>
                  }
                </div>
              </div>
            </nav>
            <img src="/images/hero.jpg" alt="skateboarder in Dubrovnik" className="hero"/>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/shop">
                <Shop
                  stock={this.state.stock}
                  addToBasket={item => this.addToBasket(item)}
                />
              </Route>
              <Route path="/about">
                <About/>
              </Route>
              <Route path="/basket">
                <Basket 
                  items={this.state.basket}
                  removeFromBasket={item => this.removeFromBasket(item)}
                  clearBasket={(e) => this.clearBasket()}
                  showBasket={this.state.showBasket}
                  total={this.state.total}
                  orderStatus={this.state.orderPlaced}
                />
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
