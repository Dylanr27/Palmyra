import Photo from '../models/Photo.js';

async function listPhotos ()
{
    try
    {
        const photo = await Photo.find();
        photo.sort( ( a, b ) => a.gridOrder - b.gridOrder );
        return photo;
    } catch ( error )
    {
        console.error( 'Failed to fetch photo:', error );
        throw error;
    }
}

async function createPhotoForm ( req, res )
{
    try
    {
        const group = req.query.group; // Get the group type from query parameter
        const photoCount = await Photo.countDocuments( { group: group } ); // Count photos in the specified group
        res.render( 'photo-upsert', { group, photoCount } ); // Pass group and photoCount to the template
    } catch ( error )
    {
        console.error( 'Failed to create photo form:', error );
        res.status( 400 ).send( error );
    }
}

async function createPhoto ( req, res )
{
    try
    {
        console.log( 'req.body:', req.body );
        console.log( 'req.file:', req.file );

        const maxGridOrder = await Photo.findOne( { group: req.body.group } )
            .sort( { gridOrder: -1 } )
            .limit( 1 )
            .select( 'gridOrder' );

        if ( maxGridOrder )
        {
            // Update in descending order
            for ( let i = maxGridOrder.gridOrder; i > req.body.gridOrder; i-- )
            {
                await Photo.updateOne(
                    { group: req.body.group, gridOrder: i },
                    { $inc: { gridOrder: 1 } }
                );
            }
        }

        const newPhoto = new Photo( {
            alt: req.body.alt,
            group: req.body.group,
            gridOrder: req.body.gridOrder,
            url: req.file.path.replace( 'public', '' )
        } );
        await newPhoto.save();

        // Redirect or respond
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create photo:', error );
        res.status( 400 ).send( error );
    }
}


async function getPhoto ( req, res )
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

async function deletePhoto ( req, res )
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