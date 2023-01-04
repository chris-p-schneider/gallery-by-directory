///////////////////////////////////////////////////////////////
// gallery.js
// Functions for Gallery by Directory
///////////////////////////////////////////////////////////////
//
// INSTRUCTIONS FOR USE
// 1 - name your gallery sub-directories 'gN',
//     where N is a number starting at 1 (ex: g1, g2...)
// 2 - ensure all image files are '.jpg' format
// 3 - name all your '.jpg' files 'N.jpg',
//     where N is a number starting at 1 (ex: 1.jpg, 2.jpg...)
// 4 - create '0.txt' in each gallery folder
//     (If there is no '0.txt' file, there will be no gallery
//      title or image captions)
// 5 - write the title of the gallery on the first line,
//     then write the title of each image after,
//     with each image title on a new line
//     (ex: My Gallery Title
//          Image Title 1
//          Image Title 2...)
//
///////////////////////////////////////////////////////////////
// GALLERY VARIABLES
// Adjust these variables to match your sub-directories
///////////////////////////////////////////////////////////////

// Enter how many subdirectories
let numGalleries = 3;
// Enter how many images in each gallery
let numImages = [7, 8, 11];

///////////////////////////////////////////////////////////////
// HTML FUNCTIONS
///////////////////////////////////////////////////////////////

function OpenMenu(menu) {
    if (menu.nextSibling.style.display == 'none') {
        menu.nextSibling.style.display = 'flex';
    }
    else {
        menu.nextSibling.style.display = 'none';
    }
}

///////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////

// gets text from '0.txt' if in directory
function GetText(galleryIndex) {

    let req = new XMLHttpRequest();
    req.open('GET', './g' + (galleryIndex + 1) + '/0.txt', false);
    req.send();

    let text = req.response;

    // if '0.txt not present'
    if (req.status == 404) {
        text = '';
    }

    return text;
}

///////////////////////////////////////////////////////////////
// CREATE GALLERIES
///////////////////////////////////////////////////////////////

function CreateGalleries() {

    const gbdc = document.getElementById('gbdc');

    for (let g = 0; g < numGalleries; g++) {

        let galleryText = GetText(g);
        let gtArray = [''];

        if (galleryText != '') {
            gtArray = galleryText.split('\r\n');
            // Note: \r used for Windows return carriage char
    
            // CREATE GALLERY HEAD
            let head = new Div('gbd-head');
            let title = new Heading(1, gtArray[0], 'gbd-title');
            let iconDiv = new Div('gbd-ic');
            let icon = new Img('./gear.svg', 
                            'Settings', 'gbd-icon');
            iconDiv.setAttribute('onclick', 'OpenMenu(this)')
            let hr = new Hr('gbd-hr');
            
            head.appendChild(title);
            iconDiv.appendChild(icon);
            head.appendChild(iconDiv);

            // CREATE GALLERY BODY
            let gallery = new Div('gbd');

            for (let tc = 0; tc < numImages[g]; tc++) {
                let caption = '';
                // if '0.txt' has more than gallery title
                if (gtArray.length > 1) {
                    caption = gtArray[tc + 1];
                }
                let gtc = new Div('gbd-tc');
                let gt = new Img('./g' + (g + 1) + '/' + (tc + 1) + '.jpg',
                                 caption, 'gbd-thumb');
                let gc = new Para(caption, 'gbd-caption');

                gtc.appendChild(gt);
                gtc.appendChild(gc);
                gallery.appendChild(gtc);
            }

            // CREATE GALLERY MENU
            let menu = new Menu(gallery);  // menu.js
            head.appendChild(menu); // after gallery created

            // head, hr, body separate for css reasons
            gbdc.appendChild(head); 
            gbdc.appendChild(hr);
            gbdc.appendChild(gallery);
        }
    }
}

///////////////////////////////////////////////////////////////

// ON SCRIPT LOAD
CreateGalleries();

///////////////////////////////////////////////////////////////