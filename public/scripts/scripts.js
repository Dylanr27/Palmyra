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


