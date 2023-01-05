///////////////////////////////////////////////////////////////
// load.js
// Load events and others that don't fit elsewhere
///////////////////////////////////////////////////////////////

// ON SCRIPT LOAD
CreateGalleries();

// onresize = (event) => {};

///////////////////////////////////////////////////////////////

// Opacity fade in/out for Card Expand Icon
let imgContainers = document.getElementsByClassName('gbd-gallery-card-image-container');
let expandIcons = document.getElementsByClassName('gbd-card-expand-icon');

for (let i = 0; i < imgContainers.length; i++) {
    imgContainers[i].addEventListener('mouseover', function(event) {
 		expandIcons[i].style.opacity = 1;
    });
    imgContainers[i].addEventListener('mouseout', function(event) {
 		expandIcons[i].style.opacity = 0;
    });
}


///////////////////////////////////////////////////////////////