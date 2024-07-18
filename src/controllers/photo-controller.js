import Photo from '../models/Photo.js';

async function listPhotos()
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

async function createPhotoForm( req, res )
{
    try {
        const group = req.query.group; // Get the group type from query parameter
        const photoCount = await Photo.countDocuments({ group: group }); // Count photos in the specified group
        res.render('photo-upsert', { group, photoCount }); // Pass group and photoCount to the template
    } catch (error) {
        console.error('Failed to create photo form:', error);
        res.status(400).send(error);
    }
}

async function createPhoto(req, res) {
    try {
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        // Step 1: Check for an existing photo with the same gridOrder and group
        const existingPhoto = await Photo.findOne({ gridOrder: req.body.gridOrder, group: req.body.group });

        // Step 2: If an existing photo is found, increment gridOrder of subsequent photos
        if (existingPhoto) {
            await Photo.updateMany(
                { group: req.body.group, gridOrder: { $gte: req.body.gridOrder } },
                { $inc: { gridOrder: 1 } }
            );
        }

        // Step 3: Create and save the new photo
        const newPhoto = new Photo({
            alt: req.body.alt,
            group: req.body.group,
            gridOrder: req.body.gridOrder,
            url: req.file.path
        });
        await newPhoto.save();

        // Step 4: Redirect or respond
        res.redirect('/');
    } catch (error) {
        console.error('Failed to create photo:', error);
        res.status(400).send(error);
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