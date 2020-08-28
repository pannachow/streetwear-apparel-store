import React from 'react';
import Item from './Item';
import './Shop.css';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basketItems: []
    };
  }

  onClick(id) {
    // console.log('Product:', id);
    // console.log(this.state.basketItems);
    let newItem = this.props.stock.find((item) => item.id === id);
    this.setState({basketItems: [...this.state.basketItems, newItem]});
    // need to pass this up to app so it can pass down to basket!!!
  }

  render() {

    let items = this.props.stock.map((item) => (
      <div key={item.id}>
        <img src={item.imgUrl} alt={item.title}/>
        <ul>
          <li>{item.name}</li>
          <li>£{item.price}</li>
          <li>{item.colour}</li>
        </ul>
        {/* Need to work this through; ideally, if no size, no select is generated; if size exists, render options with specified sizes in item.size */}
        <select>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <br/>
        <button onClick={(e) => this.onClick(item.id)}>Add to basket</button>
      </div>
    ));

    return (
      <div className="Shop">
        <h3>PRODUCTS</h3>
        <div className="items">
          {items}
        </div>
        <Item/>
      </div>
    );
  }

}

export default Shop;
