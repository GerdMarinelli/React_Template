//External imports
import React from 'react';

//Landing page component definition
const Landing = () => {
    return (
        //some very simple content center aligned
        <div className="ui inverted segment">
            <div style={{ textAlign: "center", margin: '70px 0px 120px 0px' }}>
                <img className="ui centered big fluid image" src="/res/pics/piterion_logo_transparent.png" />
            </div>
            <img className="ui fluid image" src="/res/pics/piterion_landing.png" />
        </div>
    );
}
//Make the Landing component accessible to other files
export default Landing;