//External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

//Internal imports
import App from './components/App';
import reducers from './reducers';

//Temporary test code for testing the Mailer backend without the frontend

import axios from 'axios';
window.axios = axios;

//content for the console input:
//axios -> shows axios functions
//creation of a test survey inside the console:
//const survey = { title: 'my title', subject: 'my subject', recipients: 'gerd.marinelli@piterion.com', body: 'test body'};
//survey
//axios.post('/api/surveys', survey);

//Creation of the Redux store to collect stats of the whole application
//collecting stats from our reducers, objects and middlewares' results
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Rendering the basic App
ReactDOM.render(
    //components inside the Provider tag containing all stats of the application
    <Provider store={store}>
        {/*App tag represents the App component defined in a separate file*/}
        <App />
    </Provider>,
    //putting the result in the index.html root tag
    document.querySelector('#root')
);

//console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY); //showing the Stripe key in the console
//console.log('Environment is', process.env.NODE_ENV); //showing if browser content shows prod or dev mode