//External imports
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

//Internal imports
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//bringing all reducers from the reducers directory and imports together
//connected reducer keys are representing the redux store objects (states)
export default combineReducers({
    //object name definition for results out of the authReducer
    auth: authReducer,
    //object name definition for results out of the surveysReducer
    surveys: surveysReducer,
    //the form key is predefined from the redux-form middleware because redux-form handles the form store objects itself
    form: reduxFormReducer
});