import React from 'react';
import BasketView from './BasketView';
import './Basket.css';

class Basket extends React.Component {

  render() {
    return (
      <div className="Basket">
        <h3>BASKET</h3>
        <hr/>
        {
          this.props.items.length > 0
          // if there are items in basket, show the basket
          ? <BasketView
              stock={this.props.stock}
              items={this.props.items}
              total={this.props.total}
              clearBasket={(e) => this.props.clearBasket()}
              removeFromBasket={(product) => this.props.removeFromBasket(product)}
            />
          // if there are no items in basket show empty basket component (see below)
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
