//External imports
import React from 'react';
import { connect } from 'react-redux';

//Internal imports
import Payments from './Payments';

//Right header component definition
class Header extends React.Component {
    //console.log(this.props);
    //Helper method implemented in the render() method below
    renderContentRight() {
        //showing buttons dependent of auth state
        switch (this.props.auth) {
            //if no auth state accessible (loading time)
            case null:
                //keep as it is
                return;
            //if user is not logged in
            case false:
                //show the authentication page with login button
                return [
                    <li key="1"><a className="grey item" href="/auth/google">Login with Google</a></li>,
					<li key="2"><a className="grey item" href="/auth/facebook">Login with Facebook</a></li>
                ];
            //if user is already logged in
            default:
                //show the dashboard page with logout, credits info and payments buttons
                return [
                    <li key="1">
                        <div className="grey item">
                            Credits: {this.props.auth.credits}
                        </div>
                    </li>,
                    <li key="2">
                        <Payments />
                    </li>,
                    <li key="3">
                        <a className="grey item" href="/api/logout">
                            Logout
                        </a>
                    </li>
                ];
        }
    }
    //Render method for the Header class
    render() {
        return (
            //Navigation-bar
            <nav>
                {/*Top bar*/}
                <div className="ui inverted fixed tiny menu">
                    {/*menu buttons from right aligned*/}
                    <ul className="right menu">
                        {/*content of the menu button list is defined in helper method renderContentRight() above*/}
                        {this.renderContentRight()}
                    </ul>
                </div>
            </nav>
        );
    }
}
//Mapping the changed auth state to the overall props system
function mapStateToProps(state) {
    //output of the Header component
    return { auth: state.auth };
}
//Make the Header component and its stats accessible to other files 
export default connect(mapStateToProps)(Header);