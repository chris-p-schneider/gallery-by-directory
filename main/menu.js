///////////////////////////////////////////////////////////////
// menu.js
// Gallery by Directory menu creation and functionality
///////////////////////////////////////////////////////////////

let Menu = function(gallery) {

	// MENU
	let menu = new Div('gbd-menu');
	menu.setAttribute('style', 'display: flex;'); // none

	let mcLeft = new Div('gbd-menu-column-container');
	let mcRight = new Div('gbd-menu-column-container');
	let mcl = new Para('Left Column');
	let mcr = new Para('Right Column');
	mcLeft.appendChild(mcl);
	mcRight.appendChild(mcr);

	///////////////////////////////////////////////////////////////

	// COLUMNS SLIDER
	let labelSC = new Label('sliderColumns', 'Adjust Columns');
	let sliderColumns = new Input('range', 
						'sliderColumns', 'sliderColumns');
	sliderColumns.setAttribute('min', 1);
	sliderColumns.setAttribute('max', 11);
	sliderColumns.setAttribute('step', 1);
	sliderColumns.setAttribute('value', 3);
	let outputSC = new Output('sliderColumns', 'outputSC');
	outputSC.textContent = sliderColumns.value;

	// Change columns on slider input
	sliderColumns.addEventListener('input', () => {
		let columns = sliderColumns.value;
		outputSC.textContent = columns;

		let percent = Math.floor(100 / columns);
		let cards = gallery.getElementsByClassName('gbd-gallery-card');
		let imgContainers = gallery.getElementsByClassName('gbd-gallery-card-image-container');
		let images = gallery.getElementsByClassName('gbd-card-image');
		let expandIcons = gallery.getElementsByClassName('gbd-card-expand-icon');

		// resize cards to columns, images to image containers
		for (let c = 0; c < cards.length; c++) {
			cards[c].setAttribute('style', 'width: calc(' + percent + 
				'% - 20px);'); // height: calc(' + percent + '% - 20px);
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

	// APPENDS
	mcLeft.appendChild(labelSC);
	mcLeft.appendChild(sliderColumns);
	mcLeft.appendChild(outputSC);

	menu.appendChild(mcLeft);
	menu.appendChild(mcRight);

	///////////////////////////////////////////////////////////////

	return menu;
}

///////////////////////////////////////////////////////////////