//Internal imports
const keys = require('../../config/keys');

//Template for the survey email body
module.exports = (survey) => {
    //`` allows to code normal html instead of JSX
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>Survey</h3>
                    <p>Please give us feedback</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};