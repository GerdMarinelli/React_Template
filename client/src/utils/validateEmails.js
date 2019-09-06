//reusable function to validate the format of an email
//regex js validation string for emails

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (recipients) => {
    //splitting the string with several emails and delete empty spaces in front and behind "each" email, not only in front and behind the array
    const invalidEmails = recipients
        .split(',')
        //iteration through all the single emails in the array
        .map(email => email.trim())
        //filtering the invalid emails out of the complete separated and trimmed emails
        //re variable is defined above
        //when email is valid, test() returns true, if invalid returns false
        .filter(email => re.test(email) === false);
    //output of the invalid emails
    if (invalidEmails.length) {
        return `These eMails are invalid: ${invalidEmails}`;
    }
    //if there are no invalid email then return nothing = no output of this function
    return;
}