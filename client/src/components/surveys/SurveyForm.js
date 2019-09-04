//External imports
import React from 'react';
import { reduxForm, Field } from 'redux-form'; // to give Redux Form control to form design and stats management incl. the connect function
import { Link } from 'react-router-dom';

//Internal imports
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'; //outsourced email validation

//Describing the SurveyForm component showing a form for a user to add imput
class SurveyForm extends React.Component {
    //helper function to be rendered inside the render() function below
    renderFields() {
        return (
            <div className="ui form">
                {/*Survey Title field*/}
                <Field
                    //field definition from Redux Form
                    type="text"
                    //name = redux store stats/object description
                    name="title"
                    //components input value is stored as value in the central redux store
                    //component can also be replaced by an own component -> component={e.g. SurveyField}
                    //component="input"
                    component={SurveyField}
                    //self-made property to describe the label content in the SurveyField component
                    label="Survey Title"
                />
                {/*Subject Line field*/}
                <Field
                    type="text"
                    name="subject"
                    component={SurveyField}
                    label="Subject Line"
                />
                {/*eMail Body field*/}
                <Field
                    type="text"
                    name="body"
                    component={SurveyField}
                    label="eMail Body"
                />
                {/*Recipient List field*/}
                <Field
                    type="text"
                    name="recipients"
                    component={SurveyField}
                    label="Recipient List"
                />
            </div>
        );
    }
    //rendering the content of the component
    render() {
        return (
            <div>
                {/*form tag makes a Field tag submittable, function handleSubit() is from Redux Form*/}
                {/*the value variable can be used to store the value to a DB or to use it for other purpose*/}
                {/*<form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>*/}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {/*the Field tag has to contain some min. info to be displayed without an error: type, name and component*/}
                    {/* This Field tag is just for testing
                    <Field
                        //field definition from Redux Form
                        type="text"
                        //name = redux store stats/object description
                        name="surveyTitle"
                        //components input value is stored as value in the central redux store
                        //component can also be replaced by an own component -> component={e.g. SurveyField}
                        component="input"
                    />
                    */}
                {/*execution of the helper function above*/}
                    {this.renderFields()}
                    {/*Cancel button with redirect to the /surveys path*/}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                        {/*Icon in submit button*/}
                        <i className="material-icons right">close</i>
                    </Link>
                    {/*Next button*/}
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        {/*Icon in next button*/}
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
};
//Redux Form function to validate the inputs into the Field tags, values is the object to contain all inputs
function validate(values) {
    //empty object to contain all future error-messages
    //error definitions are automatically matched to the name prop of a Field tag by Redux Form
    const errors = {};
    //validation of the title input
    //if there is no title input at all
    if (!values.title) {
        errors.title = 'Please provide a title for this survey';
    }
    //validation of the subject input
    //if there is no subject input at all
    if (!values.subject) {
        errors.subject = 'Please provide a subject line for the email';
    }
    //validation of the body input
    //if there is no body input at all
    if (!values.body) {
        errors.body = 'Please provide some content for the email body';
    }
    //email format validation (has to be done before input validation)
    //validateEmails functions is defined in the utils folder for reusability and imported to this file
    //the ||'' is necessary because directly after loading there is no array, so we have to add an empty string into the consideration
    errors.recipients = validateEmails(values.recipients || '');
    //validation of the recipients input
    //if there is no recipient input at all
    if (!values.recipients) {
        errors.recipients = 'Please provide at least one recipient for this survey email';
    }
    return errors;
}
//Make SurveyForm component accessible to other files
//use connect function from Redux Form reduxForm() to make all stats accessible to the central Redux store
export default reduxForm({
    //all props managed by Redux Form
    //validation functionality
    validate: validate,
    //form functionality
    form: 'surveyForm',
    //normally Redux Form destroys all data when unmounting a form. When setting it to false the forms keep their inputs
    destroyOnUnmount: false
})(SurveyForm);