import React from 'react';
import './Item.css';

class Item extends React.Component {

  // toggles view between shop and item
  onClick() {
    this.props.updateState();
  }

  render() {

    return (
      <div className="Item">
        <div className="grid">
          <img
            id={this.props.showItem.id}
            className="mainImage"
            src={this.props.showItem.image}
            alt={this.props.showItem.name}
          />
          <div className="text">
            <h3>{this.props.showItem.name}</h3>
            <p>{this.props.showItem.description}</p>
            <p>£{this.props.showItem.price.toFixed(2)}</p>
            <p>Colour: {this.props.showItem.colour}</p>
            <button 
              onClick={(e) => this.props.addItem(this.props.showItem.id)} 
              className={!this.props.showItem.added ? "" : "active"}
              title={!this.props.showItem.added ? "" : "Click to reset button"}
              >
                {!this.props.showItem.added ? "Add to basket" : "Item added!"}
            </button>
            <p><span style={{fontSize: "1.8em"}}>&#8630;</span> <span className="link" onClick={(e) => this.onClick()}>Back to shop</span></p>
          </div>
        </div>
      </div>
    );
  }

}

export default Item;
