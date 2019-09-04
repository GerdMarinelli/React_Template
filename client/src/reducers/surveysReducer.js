//Internal imports
import { FETCH_SURVEYS } from '../actions/types';

//definition of the reducer and making it accessible to other files
//default of the state should be an empty array to avoid an undefined error for the first loading
export default function (state = [], action) {
    //console.log(action);
    switch (action.type) {
        //if there is an action with type available
        case FETCH_SURVEYS:
            //then return the defined payload
            return action.payload;
        //if there is no action with type available
        default:
            //if no state, then return the default value = empty array
            return state;
    }
}