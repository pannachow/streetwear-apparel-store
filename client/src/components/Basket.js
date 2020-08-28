import React from 'react';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
  }

  render() {

    return (
      <div className="Basket">
        <h3>BASKET</h3>
        {
          this.state.items
            ? <p>Show items</p>
            : <p>No items!</p>
        }
      </div>
    );
  }

}

export default Basket;
