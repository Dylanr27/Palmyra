import MenuItem from '../models/Menu-Item.js';

export async function listMenuItems ( req, res )
{
    try
    {
        const menuItems = await MenuItem.findAll();
        return menuItems;
    } catch ( error )
    {
        console.error( 'Failed to fetch menuItems:', error );
        throw error;
    }
}

export function createMenuItemForm ( req, res )
{
    try
    {
        res.render( 'menu-item-upsert' );
    } catch ( error )
    {
        console.error( 'Failed to create menuItem form:', error );
        res.status( 400 ).send( error );
    }
}

export async function createMenuItem ( req, res )
{
    try
    {
        const newMenuItem = await MenuItem.create( req.body );
        res.redirect( '/' );
    } catch ( error )
    {
        console.error( 'Failed to create menuItem:', error );
        res.status( 400 ).send( error );
    }
}

export async function getMenuItem ( req, res )
{
    try
    {
        const menuItem = await MenuItem.findByPk( req.params.id );
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

export async function updateMenuItem ( req, res )
{
    try
    {
        const [ updated ] = await MenuItem.update( req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true
        } );

        if ( !updated )
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

export async function deleteMenuItem ( req, res )
{
    try
    {
        const deleted = await MenuItem.destroy( {
            where: { id: req.params.id }
        } );

        if ( !deleted )
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