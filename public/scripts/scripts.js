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

// Example of what star system may look like: Function to set rating
function setRating ( element, rating )
{
    // Assuming 5 stars and rating is out of 5
    const percentage = ( rating / 5 ) * 100;
    element.style.direction = 'ltr'; // Switch back to left-to-right for linear-gradient
    element.style.background = `linear-gradient(90deg, gold ${ percentage }%, #ccc ${ percentage }%)`;
    element.style.webkitBackgroundClip = 'text';
    element.style.display = 'inline-block'; // Override direction effects on background
    element.style.color = 'transparent'; // Hide original text color
}

// Example usage
const ratings = document.querySelectorAll( '.star-rating' );
ratings.forEach( rating =>
{
    // Example: Set the first rating to 4 stars
    setRating( rating, 5 );
} );


// Function to set maximum width for elements of given class
function setCommonMaxWidthForClass ( className )
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