import Photo from '../models/Photo.js';

async function listPhotos()
{
    try
    {
        const photo = await Photo.find();
        return photo;
    } catch ( error )
    {
        console.error( 'Failed to fetch photo:', error );
        throw error;
    }
}

function createPhotoForm( req, res )
{
    try
    {
        res.render( 'photo-upsert' );
    } catch ( error )
    {
        console.error( 'Failed to create photo:', error );
        res.status( 400 ).send( error );
    }
}



async function createPhoto( req, res )
{
    try
    {
        console.log( 'req.body:', req.body );
        const newPhoto = new Photo( req.body );
        await newPhoto.save();
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create photo:', error );
        res.status( 400 ).send( error );
    }
}


async function getPhoto( req, res )
{
    try
    {
        const photo = await Photo.findById( req.params.id );
        if ( !photo )
        {
            return res.status( 404 ).send();
        }
        res.render( 'photo-upsert', { photo: photo } );
    } catch ( error )
    {
        console.error( 'Failed to get photo:', error );
        res.status( 500 ).send( error );
    }
}

async function deletePhoto( req, res )
{
    try
    {
        const photo = await Photo.findByIdAndDelete( req.params.id );
        if ( !photo )
        {
            return res.status( 404 ).send();
        }
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to delete photo:', error );
        res.status( 500 ).send( error );
    }
}


export default { listPhotos, createPhotoForm, createPhoto, getPhoto, deletePhoto };