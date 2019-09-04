//External imports
import React from 'react';
import { Link } from 'react-router-dom';

//Internal imports
import SurveyList from './surveys/SurveyList';

//Describing the Dashboard component showing a button to create a new survey and a list of already created surveys
const Dashboard = () => {
    return (
        <div>
            {/*list of already created surveys*/}
            <SurveyList />
            {/*action button from the ui framework*/}
            <div className="fixed-action-btn">
                {/*target, position and style of the button*/}
                <Link to="/surveys/new" className="btn-floating btn-large green">
                    {/*icon or text of the button*/}
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};
//Make Dashboard component accessible to other files
export default Dashboard;