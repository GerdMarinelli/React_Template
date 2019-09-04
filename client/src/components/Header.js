//External imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Internal imports
import Payments from './Payments';

//Haeder component definition
class Header extends React.Component {
    //console.log(this.props);
    //Helper method implemented in the render() method below
    renderContent() {
        //showing buttons dependent of auth state
        switch (this.props.auth) {
            //if no auth state accessible (loading time)
            case null:
                //keep as it is
                return;
            //if user is not logged in
            case false:
                //show the authentication page with login button
                return (
                    <li><a className="ui inverted blue basic button" href="/auth/google">Login with Google</a></li>
                );
            //if user is already logged in
            default:
                //show the dashboard page with logout, credits info and payments buttons
                return [
                    <li key="1"><div className="ui inverted blue basic button">Credits: {this.props.auth.credits}</div></li>,
                    <li key="2"><Payments /></li>,
                    <li key="3"><a className="ui inverted blue basic button" href="/api/logout">Logout</a></li>
                ];
        }
    }
    //Render method for the Header class
    render() {
        return (
            //Navigation-bar
            <nav>
                {/*Top bar*/}
                <div className="ui inverted menu">
                    {/*Logo*/}
                    <Link
                        //Link to the root page of the app
                        to={this.props.auth ? '/surveys' : '/'}
                        //Logo definition from the ui framework
                        className="item"
                        //little border to the left
                        style={{margin: '0 0 0 10px'}}
                    >
                        {/*Logo content, can also be a pic file*/}
                        Survey
                    </Link>
                    {/*menu buttons from right aligned*/}
                    <ul className="right menu">
                        {/*content of the menu button list is defined in helper method renderContent() above*/}
                        {this.renderContent()}
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