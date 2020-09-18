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
      const res1 = await fetch("http://localhost:3001/product");
      const res2 = await fetch("http://localhost:3001/basket");
      const products = await res1.json();
      const basket = await res2.json();
      // const [products, basket] = await Promise.all(
      //   fetchJson("http://localhost:3001/product"),
      //   fetchJson("http://localhost:3001/basket"),
      // )
      this.setState({ stock: products, basket: basket });
    } catch (error) {
      console.log("ERROR in componentDidMount():", error);
    }
  }

  // METHODS

  //itemAdded method is how the 'add to basket' button state is toggled in shop and item view
  //it searches the existing stock array to update the selected item's 'added' true/false value
  itemAdded(item) {
    let updatedStock = this.state.stock;
    let itemIndex = updatedStock.findIndex ((i) => i.id === item.id);
    updatedStock[itemIndex]['added'] = !updatedStock[itemIndex]['added'];
    this.setState({stock: updatedStock});
  }

  //addToBasket method called in shop and item view
  addToBasket(item) {
    // first checks to toggle the 'add to basket' button text
    if (item['added']) {
      this.itemAdded(item);
      return;
      // this returns and exits the method; essentially returning the button to default value if clicked on twice
    }
    if (!item['added']) {
      // if item's added property is false, change it true, updates button text to 'item added!'
      this.itemAdded(item);
    }
    // resets basket view message, if order has already been placed
    if (this.state.orderPlaced) {
      this.setState({orderPlaced: false});
    }
    // updates current basket total
    let sum = this.state.total;
    sum += item['price'];
    // updates current basket quantity
    let itemCount = this.state.basketItems;
    itemCount++;
    // if basket already includes the item, update total & quantity
    if (this.state.basket.includes(item)) {
      item['quantity']++;
      this.setState({
        total: sum,
        basketItems: itemCount
      });
    // if item not in basket, add item, update total & quantity
    } else {
      this.setState({
        basket: [...this.state.basket, item],
        total: sum,
        basketItems: itemCount
      });
    }
  }

  // removeFromBasket called in basketView
  removeFromBasket(selectedItem) {
    // first checks to toggle the 'add to basket' button text
    if (selectedItem['added']) {
      this.itemAdded(selectedItem);
    }
    let itemIndex = this.state.basket.findIndex (item => item.id === selectedItem.id);
    let updatedBasket = [...this.state.basket];
    let removedItem = this.state.basket[itemIndex];
    let sum = this.state.total;
    // updates current basket quantity
    let itemCount = this.state.basketItems;
    itemCount--;
    // updates current basket total
    sum -= removedItem['price'];
    // if there is more than 1 of the same item in basket, reduce quantity of that item by 1
    if (removedItem['quantity'] > 1) {
      removedItem['quantity']--;
      updatedBasket.splice(itemIndex, 1, removedItem)
    } else {
      // if only 1 of the item in cart, delete it and update basket
      updatedBasket.splice(itemIndex, 1);
    }
    this.setState({
      basket: updatedBasket,
      total: sum,
      basketItems: itemCount
    });
  }

  // clearBasket method called in checkOut view
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
