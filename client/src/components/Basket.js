import React from 'react';
import './Basket.css';

class Basket extends React.Component {

  onClick(id) {
    let selectedItem = this.props.items.find((item) => item.id === id);
    this.props.removeFromBasket(selectedItem);
    console.log(selectedItem, id, 'removed from basket.');
  }

  render() {

    let items;
    let price;
    let colour;
    let quantity;
    let total;
    let removeItem;
    let emptyBasket;

    if (this.props.items.length > 0) {
      items = this.props.items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ));
      price = this.props.items.map((item) => (
        <p key={item.id}>{item.price}</p>
      ));
      colour = this.props.items.map((item) => (
        <p key={item.id}>{item.colour}</p>
      ));
      quantity = this.props.items.map((item) => (
        <p key={item.id}>{item.quantity}</p>
      ));
      total = this.props.items.map((item) => (
        <p key={item.id}>{item.quantity*item.price}</p>
      ));
      removeItem = this.props.items.map((item) => (
        <p key={item.id} onClick={(e) => this.onClick(item.id)}>Delete</p>
      ));
      emptyBasket = <br/>
    } else {
      emptyBasket = <p>No items!</p>
    }

    return (
      <div className="Basket">
        <h3>BASKET</h3>
        <hr/>
        <div className="basket-grid">
          <div>ITEM</div>
          <div>PRICE</div>
          <div>COLOUR</div>
          <div>QUANTITY</div>
          <div>TOTAL</div>
          <div>REMOVE ITEM</div>
          {/* Item rows */}
          <div>{items}</div>
          <div>{price}</div>
          <div>{colour}</div>
          <div>{quantity}</div>
          <div>{total}</div>
          <div>{removeItem}</div>
        </div>
        {emptyBasket}
      </div>
    );
  }

}

export default Basket;
