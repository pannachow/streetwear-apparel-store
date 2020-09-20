import React from 'react';
import Item from './Item';
import './Shop.css';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllItems: true,
      selectedItem: null
    };
  }

  imgClick(item) {
    this.setState({
      selectedItem: item,
      showAllItems: false
    });
  }
  
  addItem(item) {
    this.props.addToBasket(item);
  }

  updateState() {
    this.setState({showAllItems: true});
  }

  render() {

    let items = this.props.products.map((item) => (
      <div key={item.id}>
        <img src={item.image} alt={item.title} onClick={(e) => this.imgClick(item)}/>
        <ul>
          <li>{item.name}</li>
          <li>£{item.price.toFixed(2)}</li>
          <li>{item.colour}</li>
        </ul>
        {/* Not sure how to conditionally render this select menu; only if size exists should size selector be shown*/}
        {/* <select>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select> */}
        <button
          onClick={(e) => this.addItem(item)}
          className={!item.added ? "" : "active"}
          title={!item.added ? "" : "Click to reset button"}
          >
            {!item.added ? "Add to basket" : "Item added!"}
          </button>
      </div>
    ));

    return (
      <div className="Shop">
        <h3>PRODUCTS</h3>
        <hr/>
        {/* shop toggles between showing all items or a selected item */}
        {
          this.state.showAllItems
          ?
            <div className="items">
              {items}
            </div>
          : <Item
              showItem={this.state.selectedItem}
              updateState={(e) => this.updateState()}
              addItem={(item) => this.addItem(item)}
            />
        }
      </div>
    );
  }

}

export default Shop;
