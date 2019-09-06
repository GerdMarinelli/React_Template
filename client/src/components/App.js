//External imports
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//Internal imports
//const Header = () => <h2>Header</h2> //was only an intermediate step to show some content before creating the Header component
import Header from './Header';
//const Landing = () => <h2>Landing</h2> //was only an intermediate step to show some content before creating the Landing component
import Landing from './Landing';
//const Dashboard = () => <h2>Dashboard</h2> //was only an intermediate step to show some content before creating the Dashboard component
import Dashboard from './Dashboard';
//const SurveyNew = () => <h2>ServeyNew</h2> //was only an intermediate step to show some content before creating the SurveyNew component
import SurveyNew from './surveys/SurveyNew';
import Footer from './Footer';

//creation of the App component
class App extends React.Component {
    //actions to be executed after component was invoked
    componentDidMount() {
        //fetch info about the current user
        this.props.fetchUser();
    }
    //rendering the content of the App component
    render() {
        return (
            //container to keep some left and right hand space, also prerequisite for some further settings
            <div className="ui fluid container">
                {/*enabling of routing between paths*/}
                <BrowserRouter>
                    <div>
                        {/*Header is defined in the Header component*/}
                        <Header />
                        {/*relative paths to not have to make changes for dev and prod env or domain change in prod*/}
                        {/*"exact" avoids that components with same characters are imported*/}
                        <Route path="/" exact component={Landing} />
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" exact component={SurveyNew} />
                        {/*Footer is defined in the Footer component*/}
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
//Make class content available to other files
export default connect(null, actions)(App);