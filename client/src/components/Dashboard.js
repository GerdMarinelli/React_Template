//External imports
import React from 'react';
import { Link } from 'react-router-dom';

//Internal imports
import SurveyList from './surveys/SurveyList';

//Describing the Dashboard component showing a list of already created surveys
const Dashboard = () => {
    return (
        <div>
            <div className="ui visible thin sidebar inverted vertical tiny menu">
                <Link to="/surveys/new" className="grey item" style={{ margin: '30px 0px 0px 0px' }}>
                    New Survey
                </Link>
                <a className="item">
                    2
                </a>
                <a className="item">
                    3
                </a>
            </div>
            {/*list of already created surveys*/}
            <SurveyList />
        </div>
    );
};
//Make Dashboard component accessible to other files
export default Dashboard;