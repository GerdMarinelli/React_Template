//External imports
import React from 'react';
import { connect } from 'react-redux';

//Internal imports
import Payments from './Payments';

//Right header component definition
class Header extends React.Component {
	//console.log(this.props);
    //Render method for the Header class
    render() {
		//showing buttons dependent of auth state
		switch (this.props.auth) {
			//if no auth state accessible (loading time)
			case null:
				//keep as it is
				return null;
			//if user is not logged in
			case false:
				//show the authentication page with login button
				return(
					<nav>
						<div className="ui inverted fixed tiny menu">
							<div className="right menu">
								<div className="ui simple dropdown item">
									<i className="big sign-in icon"></i>
									<div className="menu">
										<a className="grey item" href="/auth/google">
											<i className="google icon"></i>
											Google
										</a>
										<a className="grey item" href="/auth/facebook">
											<i className="facebook icon"></i>	
											Facebook
										</a>
									</div>
								</div>
							</div>
						</div>
					</nav>
				);
			default:
				return (
					<nav>
						<div className="ui inverted fixed tiny menu">
							<div className="right menu">
								<div className="grey item">
									Credits: {this.props.auth.credits}
								</div>
								<div className="grey item">
									<Payments />
								</div>
								<a className="grey item" href="/api/logout">
									<i className="large sign-out icon"></i>
								</a>
							</div>
						</div>
					</nav>
				);
		};
    };
};
//Mapping the changed auth state to the overall props system
function mapStateToProps(state) {
    //output of the Header component
    return { auth: state.auth };
}
//Make the Header component and its stats accessible to other files 
export default connect(mapStateToProps)(Header);