import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

export default function setupGoogleAuth ( app )
{
    // Temporarily bypass Google Auth setup
    console.log( 'Google Auth setup is temporarily disabled' );
    return;

    // Original Google Auth setup (commented out)
    /*
    passport.serializeUser((user, done) => {
        // Serialize the user session with a simple, static identifier
        done(null, process.env.USER_EMAIL);
    });
    
    passport.deserializeUser((email, done) => {
        // Directly return the email as the user object for the session
        if (email === process.env.USER_EMAIL) {
            done(null, email);
        } else {
            done(new Error("User not found"), null);
        }
    });
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log("Logging in user's email:", profile.emails[0].value);

        if (profile.emails && profile.emails[0].value === process.env.USER_EMAIL) {
            return cb(null, profile);
        } else {
            return cb(null, false, { redirectTo: '/unauthorized' });
        }
    }));
    */
}