import React from 'react';
import BasketView from './BasketView';
import './Basket.css';

class Basket extends React.Component {

  onClick(id) {
    let selectedItem = this.props.items.find((item) => item.id === id);
    this.props.removeFromBasket(selectedItem);
  }

  render() {

    return (
      <div className="Basket">
        <h3>BASKET</h3>
        <hr/>
        {
          this.props.items.length > 0
          ? <BasketView
              items={this.props.items}
              total={this.props.total}
              onClick={(id) => this.onClick(id)}
              clearBasket={(e) => this.props.clearBasket()}
            />
          : <EmptyBasket status={this.props.orderStatus}/>
        }
      </div>
    );
  }

}

class EmptyBasket extends React.Component {

  render() {
    return (
      <div>
      {
        this.props.status
        ? <p>Order placed successfully - thank you! :)</p>
        : <p>No items!</p>
      }
      </div>
    );
  }
}

export default Basket;
