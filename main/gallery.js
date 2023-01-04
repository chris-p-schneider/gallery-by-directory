///////////////////////////////////////////////////////////////
// gallery.js
// functions for gallery by directory
///////////////////////////////////////////////////////////////
// INSTRUCTIONS FOR USE
// 1 - name your gallery sub-directories 'gN',
// 	   where N is a number starting at 1 (ex: g1, g2...)
// 2 - ensure all image files are '.jpg' format
// 3 - name all your '.jpg' files 'N.jpg',
//     where N is a number starting at 1 (ex: 1.jpg, 2.jpg...)
// 4 - create '0.txt' in each gallery folder
// 	   (If there is no '0.txt' file, there will be no gallery
//      title or image captions)
// 5 - write the title of the gallery on the first line,
//     then write the title of each image after,
//     with each image title on a new line
//     (ex: My Gallery Title
// 			Image Title 1
//          Image Title 2...)
///////////////////////////////////////////////////////////////
// GALLERY VARIABLES
// Adjust these variables to match your sub-directories
///////////////////////////////////////////////////////////////

// Enter how many subdirectories
let numGalleries = 3;
// Enter how many images in each gallery
let numImages = [7, 8, 11];

///////////////////////////////////////////////////////////////
// HTML ELEMENTS
///////////////////////////////////////////////////////////////

const gbdc = document.getElementById('gbdc');

///////////////////////////////////////////////////////////////

let Div = function(className, innerHTML) {
	let div = document.createElement('div');
	div.setAttribute('class', className);
	if (innerHTML) {
		div.innerHTML = innerHTML;
	}
	return div;
}

let Img = function(className, src, text) {
	let img = document.createElement('img');
	img.setAttribute('src', src);
	img.setAttribute('alt', text);
	img.setAttribute('title', text);
	img.setAttribute('class', className);
	return img;
}

let Para = function(className, text) {
	let p = document.createElement('p');
	p.setAttribute('class', 'gbd-caption');
	p.innerHTML = text;
	return p;
}

let Heading = function(className, text, sizeInt) {
	if (sizeInt < 0 || sizeInt > 6) {
		sizeInt = 1;
	}
	let h = document.createElement('h' + sizeInt);
	h.setAttribute('class', className);
	h.innerHTML = text;
	return h;
}

let Hr = function(className) {
	let hr = document.createElement('hr');
	hr.setAttribute('class', className);
	return hr;
}

///////////////////////////////////////////////////////////////
// HTML FUNCTIONS
///////////////////////////////////////////////////////////////

function OpenMenu() {
	//
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

	for (let g = 0; g < numGalleries; g++) {

		let galleryText = GetText(g);
		let gtArray = [''];

		if (galleryText != '') {
			gtArray = galleryText.split('\r\n');
			// Note: \r used for Windows return carriage char
	
			// CREATE GALLERY HEAD
			let head = new Div('gbd-head');
			let title = new Heading('gbd-title', 
							gtArray[0], 1);
			let iconDiv = new Div('gbd-ic');
			let icon = new Img('gbd-icon',
							'./gear.svg', 
							'Settings');
			let menu = new Div('gbd-menu');
			let hr = new Hr('gbd-hr');
			
			head.appendChild(title);
			iconDiv.appendChild(icon);
			head.appendChild(iconDiv);
			// head.appendChild(menu);

			// head, hr, body separate for css reasons
			gbdc.appendChild(head);
			gbdc.appendChild(hr);
		}

		// CREATE GALLERY BODY
		let gallery = new Div('gbd');

		for (let tc = 0; tc < numImages[g]; tc++) {
			let caption = '';
			// if '0.txt' has more than gallery title
			if (gtArray.length > 1) {
			 	caption = gtArray[tc + 1];
			}
			let gtc = new Div('gbd-tc');
			let gt = new Img('gbd-thumb', 
							'./g' + (g + 1) + '/' + (tc + 1) + '.jpg',
							 caption);
			let gc = new Para('gbd-caption', caption);

			gtc.appendChild(gt);
			gtc.appendChild(gc);
			gallery.appendChild(gtc);
		}
		gbdc.appendChild(gallery);
	}
}

///////////////////////////////////////////////////////////////

// ON SCRIPT LOAD
CreateGalleries();

///////////////////////////////////////////////////////////////