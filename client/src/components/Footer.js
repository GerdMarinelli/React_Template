//External imports
import React from 'react';
import { Link } from 'react-router-dom';

//Footer component definition
class Footer extends React.Component {
    //Render method for the Footer class
    render() {
        return (
            <div className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                    <div className="ui stackable inverted divided grid">
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 1</h4>
                            <div className="ui inverted link list">
                                <Link to="/surveys" className="item">Link One</Link>
                                <Link to="/surveys" className="item">Link Two</Link>
                                <Link to="/surveys" className="item">Link Three</Link>
                                <Link to="/surveys" className="item">Link Four</Link>
                            </div>
                        </div>
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 2</h4>
                            <div className="ui inverted link list">
                                <Link to="/surveys" className="item">Link One</Link>
                                <Link to="/surveys" className="item">Link Two</Link>
                                <Link to="/surveys" className="item">Link Three</Link>
                                <Link to="/surveys" className="item">Link Four</Link>
                            </div>
                        </div>
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 3</h4>
                            <div className="ui inverted link list">
                                <Link to="/surveys" className="item">Link One</Link>
                                <Link to="/surveys" className="item">Link Two</Link>
                                <Link to="/surveys" className="item">Link Three</Link>
                                <Link to="/surveys" className="item">Link Four</Link>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <h4 className="ui inverted header">Footer Header</h4>
                            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                        </div>
                    </div>
                    <div className="ui inverted section divider"></div>
                    <img className="ui centered small image" src="/res/pics/piterion_logo_transparent.png" alt="piterion-logo" />
                    <div className="ui horizontal inverted small divided link list">
                        <Link to="/surveys" className="item">Site Map</Link>
                        <Link to="/surveys" className="item">Contact Us</Link>
                        <Link to="/surveys" className="item">Terms and Conditions</Link>
                        <Link to="/surveys" className="item">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        );
    }
}
//Make the Fotter component accessible to other files 
export default Footer;