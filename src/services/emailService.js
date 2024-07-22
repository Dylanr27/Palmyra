import { config } from 'dotenv';
config();

import sgMail from '@sendgrid/mail';

sgMail.setApiKey( process.env.SENDGRID_API_KEY );

const sendEmail = ( name, email, message ) =>
{
    const msg = {
        to: process.env.EMAIL_RECIPIENT,
        from: process.env.EMAIL_SENDER,
        subject: `New Palmyra feedback from ${ name }`,
        text: `You have received a new message from ${ name }\nEmail: (${ email }):\n${ message }`,
    };

    console.log( 'Sending email to: ' + process.env.EMAIL_RECIPIENT, '\n from: ' + name + " | " + process.env.EMAIL_SENDER + "\n" + message );

    return sgMail.send( msg );
};

export default sendEmail;