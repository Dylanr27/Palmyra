import MenuItem from '../models/Menu-Item.js';



async function listMenuItems()
{
    try
    {
        const menuItems = await MenuItem.find();
        return menuItems;
    } catch ( error )
    {
        console.error( 'Failed to fetch menuItems:', error );
        throw error;
    }
}

function createMenuItemForm( req, res )
{
    try
    {
        res.render( 'menu-item-upsert' );
    } catch ( error )
    {
        console.error( 'Failed to create menuItem:', error );
        res.status( 400 ).send( error );
    }
}



async function createMenuItem( req, res )
{
    try
    {
        const newMenuItem = new MenuItem( req.body );
        await newMenuItem.save();
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create menuItem:', error );
        res.status( 400 ).send( error );
    }
}


async function getMenuItem( req, res )
{
    try
    {
        const menuItem = await MenuItem.findById( req.params.id );
        if ( !menuItem )
        {
            return res.status( 404 ).send();
        }
        res.render( 'menu-item-upsert', { menuItem: menuItem } );
    } catch ( error )
    {
        console.error( 'Failed to get menuItem:', error );
        res.status( 500 ).send( error );
    }
}


async function updateMenuItem( req, res )
{
    try
    {
        const menuItem = await MenuItem.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );
        if ( !menuItem )
        {
            return res.status( 404 ).send();
        }
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to update menuItem:', error );
        res.status( 400 ).send( error );
    }
}


async function deleteMenuItem( req, res )
{
    try
    {
        const menuItem = await MenuItem.findByIdAndDelete( req.params.id );
        if ( !menuItem )
        {
            return res.status( 404 ).send();
        }
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to delete menuItem:', error );
        res.status( 500 ).send( error );
    }
}


export default { listMenuItems, createMenuItemForm, createMenuItem, getMenuItem, updateMenuItem, deleteMenuItem };