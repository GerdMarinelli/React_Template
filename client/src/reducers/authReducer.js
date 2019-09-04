//Internal imports
import { FETCH_USER } from '../actions/types';

//definition of the reducer and making it accessible to other files
//default state is set to null to avoid errors during first loading
export default function (state = null, action) {
    //console.log(action);
    switch (action.type) {
        //if there is an action with type available
        case FETCH_USER:
            //then return the defined payload or false for the loading period
            return action.payload || false;
        //if there is no action with type available
        default:
            //if no state, then return the default value = null
            return state;
    }
}