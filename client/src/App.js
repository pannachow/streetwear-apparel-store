import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import About from "./components/About";
import Basket from "./components/Basket";
import "./App.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

function fetchApi(url) {
  return fetch(BASE_URL + url);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      basket: [],
      totalQuantity: 0,
      totalPrice: 0,
      orderPlaced: false,
    };
  }
  async componentDidMount() {
    try {
      const [products, basket] = await Promise.all(
        fetchApi("/product").then((res) => res.json()),
        fetchApi("/basket").then((res) => res.json())
      );
      let totalQuantity = 0;
      let totalPrice = 0;
      for (const item of basket) {
        totalQuantity += item.quantity;
        const product = products.find(
          (product) => product.id === item.product_id
        );
        totalPrice += item.quantity * product.price;
      }
      this.setState({
        products: products,
        basket: basket,
        totalQuantity,
        totalPrice,
      });
    } catch (error) {
      console.log("ERROR in componentDidMount():", error);
    }
  }

  // METHODS

  //addToBasket method called in shop and item view
  async addToBasket(product) {
    // POST or PUT
    let item = this.state.basket.find((item) => item.product_id === product.id);
    if (item) {
      item.quantity++;
      await fetchApi("/basket", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } else {
      item = {
        product_id: product.id,
        quantity: 1,
      };
      this.state.basket.push(item);
      await fetchApi("/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    }

    // updates current basket total price
    let sum = this.state.totalPrice;
    sum += product.price;
    // updates current basket quantity
    let itemCount = this.state.totalQuantity;
    itemCount++;

    this.setState({
      basket: [...this.state.basket],
      totalPrice: sum,
      totalQuantity: itemCount,
      // resets basket view message, if order has already been placed
      orderPlaced: false,
    });
  }

  // removeFromBasket called in basketView
  async removeFromBasket(product) {
    const i = this.state.basket.findIndex(
      (item) => item.product_id === product.id
    );
    const item = this.state.basket[i];
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.state.basket.splice(i, 1);
        await fetchApi("/basket", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      } else {
        await fetchApi("/basket", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
    }
    // updates current basket total price
    let sum = this.state.totalPrice;
    sum -= product.price;
    // updates current basket quantity
    let itemCount = this.state.totalQuantity;
    itemCount--;
    this.setState({
      basket: [...this.state.basket],
      totalPrice: sum,
      totalQuantity: itemCount,
    });
  }

  // clearBasket method called in checkOut view
  async clearBasket() {
    for (let clearItem of this.state.basket) {
      await fetchApi("/basket", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clearItem),
      });
    }
    this.setState({
      basket: [],
      totalQuantity: 0,
      totalPrice: 0,
      orderPlaced: true,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <div className="nav-grid">
              <h1>
                G<span className="goof">oo</span>f Cr
                <span className="goof">ü</span>
              </h1>
              <div>
                <span style={{ fontSize: "1.6em" }}>&#8618; </span>
                <NavLink exact to="/" className="link" activeClassName="active">
                  Home
                </NavLink>{" "}
                /&nbsp;
                <NavLink to="/shop" className="link" activeClassName="active">
                  Shop
                </NavLink>{" "}
                /&nbsp;
                <NavLink to="/about" className="link" activeClassName="active">
                  About
                </NavLink>{" "}
                /&nbsp;
                {this.state.totalQuantity === 0 ? (
                  <NavLink
                    to="/basket"
                    className="link"
                    activeClassName="active"
                  >
                    Basket
                  </NavLink>
                ) : (
                  <NavLink
                    to="/basket"
                    className="link"
                    activeClassName="active"
                  >
                    Basket ({this.state.totalQuantity})
                  </NavLink>
                )}
              </div>
            </div>
          </nav>
          <img
            src="/images/hero.jpg"
            alt="skateboarder in Dubrovnik"
            className="hero"
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/shop">
              <Shop
                products={this.state.products}
                addToBasket={(item) => this.addToBasket(item)}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/basket">
              <Basket
                products={this.state.products}
                items={this.state.basket}
                removeFromBasket={(product) => this.removeFromBasket(product)}
                clearBasket={(e) => this.clearBasket()}
                totalPrice={this.state.totalPrice}
                orderStatus={this.state.orderPlaced}
              />
            </Route>
          </Switch>
        </Router>
        <hr />
        <div className="footer">© GOOF CRÜ 2020</div>
      </div>
    );
  }
}

export default App;
