///////////////////////////////////////////////////////////////
// menu.js
// Gallery by Directory menu creation
///////////////////////////////////////////////////////////////

let Menu = function(gallery) {

	// MENU
	let menu = new Div('gbd-menu');
	menu.setAttribute('style', 'display: flex;'); // none

	let mcLeft = new Div('gbd-mc');
	let mcRight = new Div('gbd-mc');
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

	// change columns on slider input
	sliderColumns.addEventListener('input', () => {
		let columns = sliderColumns.value;
		outputSC.textContent = columns;

		let percent = Math.floor(100 / columns);
		let tc = gallery.getElementsByClassName('gbd-tc');
		let thumb = gallery.getElementsByClassName('gbd-thumb');
		for (let t = 0; t < tc.length; t++) {
			tc[t].setAttribute('style', 'width: calc(' + percent + 
				'% - 20px); height: calc(' + percent + '% - 20px);');
			let width = thumb[t].offsetWidth;
			thumb[t].setAttribute('style', 'height: ' + width + 'px;');
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