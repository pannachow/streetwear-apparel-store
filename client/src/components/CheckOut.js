import React from 'react';
import './CheckOut.css';

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          country: '',
          postcode: '',
          items: this.props.items,
          // total + 5 for postage
          total: this.props.total + 5
        };
      }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    submitOrder(event) {
        event.preventDefault();
        console.log('Submitted:', this.state)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            country: '',
            postcode: ''
        });
        this.props.onClick();
    }

    render() {

        return (
            <div className="CheckOut">
                <p>Enter shipping and contact information:</p>
                <form onSubmit={(e) => this.submitOrder(e)}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={this.state.lastName}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="email"
                        className="formSpan"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="address"
                        className="formSpan"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="city"
                        className="formSpan"
                        placeholder="City"
                        value={this.state.city}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={this.state.country}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <input
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        value={this.state.postcode}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    <span className="formSpan"><b>TOTAL: £{this.state.total} (inc. £5 postage)</b></span>
                    <button className="formSpan" type="submit">PLACE ORDER</button>
                </form>
            </div>
        );
    }

}

export default CheckOut;