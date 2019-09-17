//External imports
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

//Internal imports
import * as actions from '../actions';

//Payments component definition
class Payments extends React.Component {
    render() {
        //debugger;
        return (
            //implementation of the standard Stripe checkout component
            <StripeCheckout
                //header of the stripe component
                name="Survey"
                //description below the stripe component header
                description="5$ for 24 months prime access"
                //predefined amount in the credit cards amount form field
                amount={500}
                //token={token => console.log(token)} // here we can get additional info from the card owner
                token={token => this.props.handleToken(token)}
                //stripe key to identify the software's Stripe account owner
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
				<i className="large cart plus icon"></i>
            </StripeCheckout>
        );
    }
}
//Make the Payments component and its stats accessible to other files
export default connect(null, actions) (Payments);