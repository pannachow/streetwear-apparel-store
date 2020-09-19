import React from 'react';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import Basket from './components/Basket';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import './App.css';

// async function fetchJson(url) {
//   const res = await fetch(url);
//   return await res.json();
// }

const PRODUCT_URL = "http://localhost:3001/product";
const BASKET_URL = "http://localhost:3001/basket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [],
      basket: [],
      basketItems: 0,
      total: 0,
      orderPlaced: false
    };
  }
  async componentDidMount() {
    try {
      const res1 = await fetch(PRODUCT_URL);
      const res2 = await fetch(BASKET_URL);
      const products = await res1.json();
      const basket = await res2.json();
      // const [products, basket] = await Promise.all(
      //   fetchJson("http://localhost:3001/product"),
      //   fetchJson("http://localhost:3001/basket"),
      // )
      this.setState({
        stock: products,
        basket: basket,
      });
    } catch (error) {
      console.log("ERROR in componentDidMount():", error);
    }
  }

  // METHODS

  //addToBasket method called in shop and item view
  async addToBasket(product) {
    // POST or PUT
    let item = this.state.basket.find(item => item.product_id === product.id);
    if (item) {
      item.quantity++;
      await fetch(BASKET_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
    } else {
      item = {
        product_id: product.id,
        quantity: 1
      };
      this.state.basket.push(item);
      await fetch(BASKET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
    }

    // updates current basket total
    let sum = this.state.total;
    sum += product.price;
    // updates current basket quantity
    let itemCount = this.state.basketItems;
    itemCount++;

    this.setState({
      basket: [...this.state.basket],
      total: sum,
      basketItems: itemCount,
      // resets basket view message, if order has already been placed
      orderPlaced: false,
    });
  }

  // removeFromBasket called in basketView
  async removeFromBasket(product) {
    const i = this.state.basket.findIndex(item => item.product_id === product.id);
    const item = this.state.basket[i];
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.state.basket.splice(i, 1);
        await fetch(BASKET_URL, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        });
      } else {
        await fetch(BASKET_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        });
      }
    }
    // updates current basket total
    let sum = this.state.total;
    sum -= product.price;
    // updates current basket quantity
    let itemCount = this.state.basketItems;
    itemCount--;
    this.setState({
      basket: [...this.state.basket],
      total: sum,
      basketItems: itemCount
    });
  }

  // clearBasket method called in checkOut view
  async clearBasket() {
    for (let clearItem of this.state.basket) {
      await fetch(BASKET_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clearItem)
      });
    }
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
                <span style={{ fontSize: "1.6em" }}>&#8618; </span>
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
          <img src="/images/hero.jpg" alt="skateboarder in Dubrovnik" className="hero" />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/shop">
              <Shop
                stock={this.state.stock}
                addToBasket={item => this.addToBasket(item)}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/basket">
              <Basket
                stock={this.state.stock}
                items={this.state.basket}
                removeFromBasket={product => this.removeFromBasket(product)}
                clearBasket={(e) => this.clearBasket()}
                total={this.state.total}
                orderStatus={this.state.orderPlaced}
              />
            </Route>
          </Switch>
        </Router>
        <hr />
        <div className="footer">
          © GOOF CRÜ 2020
          </div>
      </div>
    );
  }
}

export default App;
