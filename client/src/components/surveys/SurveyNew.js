//External imports
import React from 'react';
import { reduxForm } from 'redux-form'; //to control input data in forms (keep or delete after leaving the form)

//Internal imports
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

//Describing the SurveyNew component showing the SurveyNew and SurveyReview content
class SurveyNew extends React.Component {
    //definition of the component level state if user has made input and validateion of the input was correct or already has pushed the next button for review the inputs
    //classic react component level state creation:
    /*
    constructor(props) {
        super(props);
        this.state = { new: true };
    }
    */
    //Redux Form much more compact component level initial state creation:
    //showFormReview is free to be selected
    state = { showFormReview: false };
    //helper function to render the content dependent on the state of this component
    renderContent() {
        // if the state has already changed to true after input, validation und pushing the next button in the SurveyForm compionent
        if (this.state.showFormReview === true) {
            //show the SurveyFormReview component
            return <SurveyFormReview
                //when the back button in the review form is pushed state is set back to false to show the input form again
                onCancel={() => this.setState({ showFormReview: false })}
            />;
        }
        //is state is still false, show the SurveyForm component
        return <SurveyForm
            //but when next button will pe pushed the state has to be changed to true and the review page is displayed as configured above
            //configuration is used in the onSubmit() function in the form tag of the SurveyForm component containing a verification if there are no errors
            onSurveySubmit={() => this.setState({ showFormReview: true })}
        />;
    }
    //Rendering the content
    render() {
        return (
            //little border to the top
            <div style={{ margin: '30px 0px 0px 0px' }}>
                {/*centered container for complete form*/}
                <div>
                    {/*importing the renderContent helper function above*/}
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}
//Make SurveyNew component accessible and give reduxForm() helper access to other files
export default reduxForm({
    //description of the options object of reduxForm() shown also in the console when logging
    //with this option a new created form gets empty input fields without activated destroy option of Redux-Form
    form: 'surveyForm'
})(SurveyNew);