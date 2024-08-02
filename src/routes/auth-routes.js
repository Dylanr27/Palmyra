import express from 'express';
import passport from 'passport';

const router = express.Router();

const logRouteCall = ( req, res, next ) => 
{
    console.log( `Route called: ${ req.method } ${ req.path }` );
    next();
};

router.use( logRouteCall );

router.get( '/google',
    passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ) );

router.get( '/google/callback',
    passport.authenticate( 'google', { failureRedirect: '../unauthorized', failureMessage: true } ),
    ( req, res ) =>
    {
        res.redirect( '/' );
    } );

router.get( '/unauthorized', ( req, res ) =>
{
    res.render( 'unauthorized' );
} );

router.get( '/logout', ( req, res, next ) =>
{
    req.logout( ( err ) =>
    {
        if ( err )
        {
            return next( err );
        }
        req.session.destroy( ( err ) =>
        {
            if ( err )
            {
                return next( err );
            }
            res.redirect( '/' );
        } );
    } );
} );

export default router;