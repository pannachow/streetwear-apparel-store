import React from 'react';
import CheckOut from './CheckOut';
import './BasketView.css';

class BasketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOut: false,
    };
  }

  // toggles view for this component, depending on whether checkout has already taken place or not
  checkOut() {
    this.setState({ checkOut: true });
  }

  render() {
    const itemsJsx = this.props.items.map((item) => {
      const product = this.props.products.find((product) => product.id === item.product_id);
      return (
        <tr key={item.id}>
          <td>{product.name}</td>
          <td>£{product.price.toFixed(2)}</td>
          <td>{product.colour}</td>
          <td>{item.quantity}</td>
          <td>£{(item.quantity * product.price).toFixed(2)}</td>
          <td>
            <button onClick={(e) => this.props.removeFromBasket(product)}>Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        {
          !this.state.checkOut
            ?
            <div className="BasketView">
              <table className="basket-table">
                <thead>
                  <tr>
                    <td>ITEM</td>
                    <td>PRICE</td>
                    <td>COLOUR</td>
                    <td>QUANTITY</td>
                    <td>TOTAL</td>
                    <td>REMOVE ITEM</td>
                  </tr>
                </thead>
                <tbody>
                  {itemsJsx}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="total"><p>£{this.props.totalPrice.toFixed(2)}</p></td>
                    <td><button onClick={(e) => this.checkOut()}>CHECK OUT</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            : <CheckOut totalPrice={this.props.totalPrice} items={this.props.items} onClick={() => this.props.clearBasket()} />
        }
      </div>
    );
  }

}

export default BasketView;
