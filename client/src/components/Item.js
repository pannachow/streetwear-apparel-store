import React from 'react';
import './Item.css';

class Item extends React.Component {

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
            src={this.props.showItem.imgUrl}
            alt={this.props.showItem.name}
          />
          <div className="text">
            <h3>{this.props.showItem.name}</h3>
            <p>{this.props.showItem.description}</p>
            <p>£{this.props.showItem.price}</p>
            <p>Colour: {this.props.showItem.colour}</p>
            <button onClick={(e) => this.props.addItem(this.props.showItem.id)}>Add to basket</button>
            <p><span style={{fontSize: "1.8em"}}>&#8630;</span> <span className="link" onClick={(e) => this.onClick()}>Back to shop</span></p>
          </div>
        </div>
      </div>
    );
  }

}

export default Item;
