import React from 'react';
import CheckOut from './CheckOut';
import './BasketView.css';

class BasketView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOut: false
    };
  }

  checkOut() {
    this.setState({checkOut: true});
  }

  render() {

    let itemsJsx = this.props.items.map((item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>£{item.price}</td>
            <td>{item.colour}</td>
            <td>{item.quantity}</td>
            <td>£{item.quantity*item.price}</td>
            <td>
                <button onClick={(e) => this.props.onClick(item.id)}>Delete</button>
            </td>
        </tr>
    ));

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
                      <td className="total"><p>£{this.props.total}</p></td>
                      <td><button onClick={(e) => this.checkOut()}>CHECK OUT</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          : <CheckOut total={this.props.total} items={this.props.items} onClick={() => this.props.clearBasket()}/>
        }
      </div>
    );
  }

}

export default BasketView;
