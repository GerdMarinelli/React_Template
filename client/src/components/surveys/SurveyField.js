//External imports
import React from 'react';

//Describing the SurveyField component showing a field with label and content to be reused for different input fields and making it accessible to other files
//({ input }) describes ES 2015 syntax for props.input
//the meta prop contains the error message defined in the validate() function in the SurveyForm component and several additional condition cases to be used for showing error messages
export default ({ input, label, meta: { error, touched } }) => {
    //watching the possibilies of the React Form object props and functions
    //console.log(input);
    //console.log(meta); //see not only the error message but also additional condition props
    //Rendering the content
    return (
        <div className="field">
            {/*label with content from a property in the SurveyForm component*/}
            <label>{label}</label>
            {/*input field with all existing functions and values of props.input object -> same functionality like writing all the functions like onBlur={input.onBlur} onChange={input.onChange} ...*/}
            <input {...input} type="text"/>
            {/*Tag for styling the error messages*/}
            <div className="ui orange text" style={{ marginBottom: '20px' }}>
                {/*output of the defined error messages possibly caused in all validated input fields that have already been touched*/}
                {/*with && both statements have to be fullfilled to show the message*/}
                {touched && error}
            </div>
        </div>
    );
};