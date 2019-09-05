//External imports
import React from 'react';

//Internal imports
import SurveyList from './surveys/SurveyList';

//Describing the Dashboard component showing a list of already created surveys
const Dashboard = () => {
    return (
        <div>
            {/*list of already created surveys*/}
            <SurveyList />
        </div>
    );
};
//Make Dashboard component accessible to other files
export default Dashboard;