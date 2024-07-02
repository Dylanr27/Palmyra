require( 'dotenv' ).config();

const sgMail = require( '@sendgrid/mail' );

sgMail.setApiKey( process.env.SENDGRID_API_KEY ); // Replace with your actual SendGrid API Key

exports.sendEmail = ( name, email, message ) =>
{
    const msg = {
        to: process.env.EMAIL_RECIPIENT, // Change to your recipient
        from: process.env.EMAIL_SENDER, // Change to your verified sender
        subject: `New Palmyra feedback from ${ name }`,
        text: `You have received a new message from ${ name }\nEmail: (${ email }):\n${ message }`,
    };

    console.log( 'Sending email to: ' + process.env.EMAIL_RECIPIENT, '\n from: ' + name + " | " + process.env.EMAIL_SENDER + "\n" + message );

    return sgMail.send( msg );
};