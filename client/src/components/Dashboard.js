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
					<i className="large plus circle icon"></i>
                    New Survey
                </Link>
                <Link to="/surveys" className="item">
                    2
                </Link>
                <Link to="/surveys" className="item">
                    3
                </Link>
            </div>
            {/*list of already created surveys*/}
            <SurveyList />
        </div>
    );
};
//Make Dashboard component accessible to other files
export default Dashboard;