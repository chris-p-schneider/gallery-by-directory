///////////////////////////////////////////////////////////////
// menu.js
// Gallery by Directory menu creation and functionality
///////////////////////////////////////////////////////////////

// HELPERS
 
function GetShortestSide(imageElement) {
	let width = imageElement.offsetWidth;
	let height = imageElement.offsetHeight;
	let shortest = 0;
	if (width < height) {
		shortest = width;
	}
	else {
		shortest = height;
	}
	return shortest;
}


///////////////////////////////////////////////////////////////

let Menu = function(gallery) {

	// MENU
	let menu = new Div('gbd-menu');
	menu.setAttribute('style', 'display: flex;'); // none

	let mcLeft = new Div('gbd-menu-column-container');
	let mcRight = new Div('gbd-menu-column-container');
	let mcl = new Para('Image Adjustments');
	let mcr = new Para('Text Adjustments');
	mcLeft.appendChild(mcl);
	mcRight.appendChild(mcr);

	///////////////////////////////////////////////////////////////

	// COLUMNS SLIDER
	let labelSC = new Label('sliderColumns', 'Adjust Columns - ');
	let sliderColumns = new Input('range', 
						'sliderColumns', 'sliderColumns', false, 'menu-slider');
	sliderColumns.setAttribute('min', 0);
	sliderColumns.setAttribute('max', 12);
	sliderColumns.setAttribute('step', 1);
	sliderColumns.setAttribute('value', 0);
	let outputSC = new Output('sliderColumns', 'outputSC');
	outputSC.textContent = 'auto';
	let labelDivSC = new Div();

	// Change columns on slider input
	sliderColumns.addEventListener('input', () => {
		let columns = sliderColumns.value;
		let percent;
		if (columns == 0) {
			outputSC.textContent = 'auto';
		}
		else {
			outputSC.textContent = columns;
			percent = Math.floor(100 / columns);
		}

		let cards = gallery.getElementsByClassName('gbd-gallery-card');
		let imgContainers = gallery.getElementsByClassName('gbd-gallery-card-image-container');
		let images = gallery.getElementsByClassName('gbd-card-image');
		let expandIcons = gallery.getElementsByClassName('gbd-card-expand-icon');

		// Resize cards to columns, images to image containers
		for (let c = 0; c < cards.length; c++) {
			if (columns == 0) {
				cards[c].setAttribute('style', 'width: auto;');				
			}
			else {
				cards[c].setAttribute('style', 'width: calc(' + percent + 
					'% - 20px);'); // height: calc(' + percent + '% - 20px);
			}
			let width = imgContainers[c].offsetWidth;
			images[c].setAttribute('style', 'width: ' + width + 
				'height: ' + width + ';');
			if (width < 200) {
				expandIcons[c].setAttribute('style', 'width: 100px; height: 100px;');				
			}
			else {
				expandIcons[c].setAttribute('style', 'width: 200px; height: 200px;');
			}
		}
	});

	///////////////////////////////////////////////////////////////

	// HEIGHT SLIDER
	let labelSH = new Label('sliderHeight', 'Adjust Image Height - ');
	let sliderHeight = new Input('range', 
						'sliderHeight', 'sliderHeight', false, 'menu-slider');
	sliderHeight.setAttribute('min', 50);
	sliderHeight.setAttribute('max', 1000);
	sliderHeight.setAttribute('step', 5);
	sliderHeight.setAttribute('value', 400);
	let outputSH = new Output('sliderHeight', 'outputSH');
	outputSH.textContent = sliderHeight.value;
	let labelDivSH = new Div();

	// Change image heights on slider input
	sliderHeight.addEventListener('input', () => {
		let height = sliderHeight.value;
		outputSH.textContent = height;

		let images = gallery.getElementsByClassName('gbd-card-image');
		let imgContainers = gallery.getElementsByClassName('gbd-gallery-card-image-container');
		let expandIcons = gallery.getElementsByClassName('gbd-card-expand-icon');

		for (let i = 0; i < images.length; i++) {
			images[i].setAttribute('style', 'height: ' + height + 'px;');
			let shortest = GetShortestSide(imgContainers[i]);
			if (shortest < 200) {
				expandIcons[i].setAttribute('style', 'width: 100px; height: 100px;');				
			}
			else {
				expandIcons[i].setAttribute('style', 'width: 200px; height: 200px;');
			}
		}
	});

	///////////////////////////////////////////////////////////////

	// BORDER-RADIUS SLIDER
	let labelBR = new Label('sliderBorderRadius', 'Adjust Border Radius - ');
	let sliderBorderRadius = new Input('range', 
						'sliderBorderRadius', 'sliderBorderRadius', false, 'menu-slider');
	sliderBorderRadius.setAttribute('min', 0);
	sliderBorderRadius.setAttribute('max', 300);
	sliderBorderRadius.setAttribute('step', 1);
	sliderBorderRadius.setAttribute('value', 20);
	let outputBR = new Output('sliderBorderRadius', 'outputBR');
	outputBR.textContent = sliderBorderRadius.value;
	let labelDivBR = new Div();

	sliderBorderRadius.addEventListener('input', () => {
		let bRad = sliderBorderRadius.value;
		outputBR.textContent = bRad;
		let images = gallery.getElementsByClassName('gbd-card-image');
		for (let i = 0; i < images.length; i++) {
			images[i].setAttribute('style', 'border-radius: ' + bRad + 'px;');
		}
	});


	///////////////////////////////////////////////////////////////
	// APPENDS
	///////////////////////////////////////////////////////////////

	// Columns Slider	
	labelDivSC.appendChild(labelSC);
	labelDivSC.appendChild(outputSC);
	mcLeft.appendChild(labelDivSC);
	mcLeft.appendChild(sliderColumns);

	// Height Slider
	labelDivSH.appendChild(labelSH);
	labelDivSH.appendChild(outputSH);
	mcLeft.appendChild(labelDivSH);
	mcLeft.appendChild(sliderHeight);

	// Border-Radius Slider
	labelDivBR.appendChild(labelBR);
	labelDivBR.appendChild(outputBR);
	mcLeft.appendChild(labelDivBR);
	mcLeft.appendChild(sliderBorderRadius);

	// Menu Columns
	menu.appendChild(mcLeft);
	menu.appendChild(mcRight);

	///////////////////////////////////////////////////////////////

	return menu;
}

///////////////////////////////////////////////////////////////