//External imports
import React from 'react';
import { connect } from 'react-redux';

//Internal imports
import { fetchSurveys } from '../../actions';

//Describing the SurveyList component showing a list of already created surveys inside the dashboard
class SurveyList extends React.Component {
    //place to define all actions which have to be executed directly after mount of the component
    componentDidMount() {
        //ensuring that the list is refreshed after every call of the fetch Surveys action creator
        this.props.fetchSurveys();
    }
    //helper method for rendering the surveysList as cards
    renderSurveys() {
        //reverse() is sorting the list from newest to the oldest
        //map() is iterating through the objects and creating cards for each survey object
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="ui yellow card fluid" key={survey._id}>
                    <div className="content">
                        <span className="header">
                            {survey.title}
                        </span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right floated">
                            {/*DB date format has to be formated to a user friendly date format*/}
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="extra content">
                        <div className="ui buttons">
                            <button className="ui positive button">Yes: {survey.yes}</button>
                            <div className="or"></div>
                            <button className="ui negative button">No: {survey.no}</button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    //rendering the content of the component
    render() {
        return (
            <div style={{ margin: '70px 40px 40px 200px' }}>
                {this.renderSurveys()}
            </div>
        );
    }
}
//funtion to pull redux state data from the redux store and make it accessible in the props system
function mapStateToProps(state) {
    //console.log(state); // to investigate what's accessible in the state object
    return {
        //mapping the state values of surveyList (defined in the surveyList component) to props used in this file
        surveys: state.surveys
    };
}
//Make SurveyList component accessible to other files
//connect() makes the redux store data accessible which is then used in the mapStateToProps() function and the fetchSurveys action from the action creators
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);