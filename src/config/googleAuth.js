// googleAuth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

export default function setupGoogleAuth(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // Replace this with your user retrieval logic if necessary
        done(null, id);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        // In a real application, you might save the profile information in a database
        return cb(null, profile);
    }));
}