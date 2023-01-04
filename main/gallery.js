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

// enter how many subdirectories
let numGalleries = 3;
// enter how many images in each gallery
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

///////////////////////////////////////////////////////////////

let GalleryTitle = function(title) {
	let h = document.createElement('h1');
	h.setAttribute('class', 'gbd-title');
	h.innerHTML = title;
	return h;
}

let GalleryHr = function() {
	let hr = document.createElement('hr');
	hr.setAttribute('class', 'gbd-hr');
	return hr;
}

///////////////////////////////////////////////////////////////

let GalleryThumb = function(src, text) {
	let img = document.createElement('img');
	img.setAttribute('src', src);
	img.setAttribute('alt', text);
	img.setAttribute('title', text);
	img.setAttribute('class', 'gbd-thumb');
	return img;
}

let GalleryCaption = function(text) {
	let p = document.createElement('p');
	p.setAttribute('class', 'gbd-caption');
	p.innerHTML = text;
	return p;
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

function GetText(galleryIndex) {

	let req = new XMLHttpRequest();
	req.open('GET', './g' + (galleryIndex + 1) + '/0.txt', false);
	req.send();

	let text = req.response;

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
	
			// create gallery head
			let head = new Div('gbd-head');
			let title = new GalleryTitle(gtArray[0]);
			let icon = new Div('gbd-icon', '<span>⚙</span>');
			let menu = new Div('gbd-menu');
			let hr = new GalleryHr();
			
			head.appendChild(title);
			head.appendChild(icon);
			// head.appendChild(menu);

			gbdc.appendChild(head);
			gbdc.appendChild(hr);
		}


		// create gallery body
		let gallery = new Div('gbd');

		for (let tc = 0; tc < numImages[g]; tc++) {
			let cap = '';
			if (gtArray.length > 1) {
			 	cap = gtArray[tc + 1];
			}
			let gtc = new Div('gbd-tc');
			let gt = new GalleryThumb('./g' + (g + 1) + '/' +
				(tc + 1) + '.jpg', cap);
			let gc = new GalleryCaption(cap);

			gtc.appendChild(gt);
			gtc.appendChild(gc);
			gallery.appendChild(gtc);
		}

		gbdc.appendChild(gallery);
	}
}

///////////////////////////////////////////////////////////////

CreateGalleries();

///////////////////////////////////////////////////////////////