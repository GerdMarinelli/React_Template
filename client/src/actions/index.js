//External imports
import axios from 'axios';

//Internal imports
import { FETCH_USER, FETCH_SURVEYS } from './types';

//completely written function before ES2015 refactoring
/*
export const fetchUser = () => {
    return function (dispatch) {
        //fetch user info out of the DB from the predefined RestAPI path
        axios
            .get('/api/current_user')
            //update of the local user model
            .then(res => dispatch({
                //description of requested data
                type: FETCH_USER,
                //response data from the DB
                payload: res
            }));
    };
};
*/
//Action creator to get info about current user
export const fetchUser = () => async dispatch => {
    //fetch user info out of the DB from the predefined RestAPI path
    const res = await axios.get('/api/current_user');
    //update of the local user model
    dispatch({
        //description of requested data
        type: FETCH_USER,
        //response data from the DB
        payload: res.data
    });
};

//Action creator to get the Stripe token fur further use
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    //we use the FETCH_USER type to automatically update the credits in the Header after payment
    dispatch({
        //description of requested data
        type: FETCH_USER,
        //response data from the DB
        payload: res.data
    });
}

//Action creator to send out emails from a survey receiving the form values object and the react-router history object
export const submitSurvey = (values, history) => async dispatch => {
    //submit the values from the survey to the predefined backend RestAPI path
    const res = await axios.post('/api/surveys', values);
    //Navigating back to a defined page after action successfully terminated
    history.push('/surveys');
    //update of the local user model
    dispatch({
        //description of requested data
        type: FETCH_USER,
        //response data from the DB
        payload: res.data
    });
}

//Action creator to fetch the surveys of a user to display is a list on the dashboard
export const fetchSurveys = () => async dispatch => {
    //fetch the objects from the express server API
    const res = await axios.get('/api/surveys');
    //display of the local surveys list
    dispatch({
        //description of requested data
        type: FETCH_SURVEYS,
        //response array from the DB
        payload: res.data
    });
}