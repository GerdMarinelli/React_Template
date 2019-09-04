//External imports
import React from 'react';
import { connect } from 'react-redux'; //Redux Form doesn't care about fetching data out of the redux store, so we here need the normal redux connect functionality
import { withRouter } from 'react-router-dom'; //to get access to the history object of react-router in the component's props system also without having react-router in this component

//Internal Imports
import * as actions from '../../actions';

//Definition of the SurveyFormReview component making use of the onCancel() function, the formValues props, the react-router history object props and the submitSurvey() function
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    return (
        <div>
            <h6>Please check and confirm your entries</h6>
            {/*surveys fields content*/}
            {/*Survey Title*/}
            <div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
            </div>
            {/*Subject Line*/}
            <div>
                <div>
                    <label>Subject Line</label>
                    <div>{formValues.subject}</div>
                </div>
            </div>
            {/*eMail Body*/}
            <div>
                <div>
                    <label>eMail Body</label>
                    <div>{formValues.body}</div>
                </div>
            </div>
            {/*Recipients List*/}
            <div>
                <div>
                    <label>Recipients List</label>
                    <div>{formValues.recipients}</div>
                </div>
            </div>
            {/*Back button with redirect to the /surveys/new path, onCancel() comes from SurveyNew component*/}
            <button className="red btn-flat left white-text" onClick={onCancel}>
                Back
                {/*Icon in back button*/}
                <i className="material-icons right">arrow_back</i>
            </button>
            {/*Submit button*/}
            {/*onClick triggers the submitSurvey() action creator and references the formValues of redux store*/}
            {/*by adding the history object of redux-router, the history state is send to the action creator by clicking the send button*/}
            {/*arrow function in onClick() is used to not be executed directly with loading (because of a function in onClick), but only when the user clicks the button*/}
            <button type="submit" className="teal btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                {/*Icon in send survey button*/}
                <i className="material-icons right">email</i>
                </button>
        </div>
    );
};
//funtion to pull redux state data from the redux store and make it accessible in the props system
function mapStateToProps(state) {
    //console.log(state); // to investigate what's accessible in the state object
    return {
        //mapping the state values of surveyForm (defined in the surveyForm component) to props used in this file
        formValues: state.form.surveyForm.values
    };
}
//Make SurveyFormReview component accessible to other files
//connect() makes the redux store data accessible which is then used in the mapStateToProps() function and the actions from the action creators
//component is wrapped by the withRouter() function similar to the connect() function to make this component accessible to the react-router routes history
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));