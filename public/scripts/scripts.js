document.addEventListener( 'DOMContentLoaded', function ()
{
    const observer = new IntersectionObserver( ( entries ) =>
    {
        entries.forEach( entry =>
        {
            if ( entry.isIntersecting )
            {
                entry.target.classList.add( 'visible' );
            } else
            {
                entry.target.classList.remove( 'visible' );
            }
        } );
    }, { threshold: 0.01 } ); // Adjust threshold as needed

    const elements = document.querySelectorAll( '.story-container, .story-card, .gallery-image' );
    elements.forEach( el => observer.observe( el ) );
} );

/*Google Reviews*/
(
    function ( d, s, id ) 
    {
        var js;
        if ( d.getElementById( id ) ) 
        {
            return;
        }
        js = d.createElement( s );
        js.id = id;
        js.src = "https://embedsocial.com/cdn/aht.js";
        d.getElementsByTagName( "head" )[ 0 ].appendChild( js );
    }
        (
            document,
            "script",
            "EmbedSocialWidgetScript"
        )
);

// Function to set maximum width for elements of given class
function setCommonMaxWidthForClass( className )
{
    const elements = document.querySelectorAll( className );
    let maxWidth = 0;

    // Find the maximum width among elements
    elements.forEach( ( element ) =>
    {
        const width = element.offsetWidth;
        if ( width > maxWidth )
        {
            maxWidth = width;
        }
    } );

    // Set the maximum width to all elements
    elements.forEach( ( element ) =>
    {
        element.style.width = `${ maxWidth }px`;
    } );
}

// Apply the maximum width setting for each class
setCommonMaxWidthForClass( '.event-body' );
setCommonMaxWidthForClass( '.event-date' );
setCommonMaxWidthForClass( '.event-time' );

function Delete( url )
{
    
    Swal.fire( {
        title: "Are you sure you want to delete this event?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    } ).then( ( result ) =>
    {
        if ( result.isConfirmed )
        {
            console.log("URL: " + url);
            $.ajax( {
                url: url,
                type: 'DELETE',
                success: function ( data )
                {
                    dataTable.ajax.reload();
                    toastr.success( data.message );
                }
            } );
        }
    } );
}