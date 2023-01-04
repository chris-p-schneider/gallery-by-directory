////////////////////////////////////////////////////////////////
// html.js
// HMTL element template functions
////////////////////////////////////////////////////////////////
//
// CONVENTIONS:
// - Parameters with '_o' suffix are optional.
// - 'className_o' and 'id_o' always last parameters.
// - Pass 'false' to skip optional args preceding desired args
//
////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////

// reassign element to itself with set optional attributes
function SetOptionalAttributes(element, attributeArray, argArray) {
    for (let a = 0; a < argArray.length; a++) {
        if (argArray[a]) {
            element.setAttribute(attributeArray[a], argArray[a]);
        }
    }
    return element;
}

////////////////////////////////////////////////////////////////
// STRUCTURING
////////////////////////////////////////////////////////////////

let Div = function(className_o, id_o) {
    let div = document.createElement('div');
    div = SetOptionalAttributes(div, ['class', 'id'], [className_o, id_o]);
    return div;
}

////////////////////////////////////////////////////////////////
// MEDIA
////////////////////////////////////////////////////////////////

// :: currently uses the same text for image alt and title
let Img = function(src, text_o, className_o, id_o) {
    let img = document.createElement('img');
    img.setAttribute('src', src);
    img = SetOptionalAttributes(img, 
            ['alt', 'title', 'class', 'id'],
            [text_o, text_o, className_o, id_o]);
    return img;
}

////////////////////////////////////////////////////////////////
// TEXT
////////////////////////////////////////////////////////////////

let Para = function(text, className_o, id_o) {
    let p = document.createElement('p');
    p = SetOptionalAttributes(p, ['class', 'id'], [className_o, id_o]);
    p.innerHTML = text;
    return p;
}

// sizeInt represents HTML heading sizes, 1:6; default 1
let Heading = function(sizeInt, text, className_o, id_o) {
    if (sizeInt < 0 || sizeInt > 6) {
        sizeInt = 1;
    }
    let h = document.createElement('h' + sizeInt);
    h = SetOptionalAttributes(h, ['class', 'id'], [className_o, id_o]);
    h.innerHTML = text;
    return h;
}

let Hr = function(className_o, id_o) {
    let hr = document.createElement('hr');
    hr = SetOptionalAttributes(hr, ['class', 'id'], [className_o, id_o]);
    return hr;
}

////////////////////////////////////////////////////////////////
// INPUT
////////////////////////////////////////////////////////////////

let Form = function(actionString, className_o, id_o) {
    let form = document.createElement('form');
    form.setAttribute('action', actionString);
    form = SetOptionalAttributes(form, ['class', 'id'], [className_o, id_o]);
    return form;
}

let Label = function(forString, text, className_o, id_o) {
    let label = document.createElement('label');
    label.setAttribute('for', forString);
    label.innerHTML = text;
    label = SetOptionalAttributes(label, ['class', 'id'], [className_o, id_o]);
    return label;
}

// id required for input element
let Input = function(typeString, nameString, idString, formId_o, className_o) {
    let input = document.createElement('input');
    input.setAttribute('type', typeString);
    input.setAttribute('name', nameString);
    input.setAttribute('id', idString);
    input = SetOptionalAttributes(input, ['form', 'class'], [formId_o, className_o]);
    return input;
}

let Output = function(forString, nameString, formId_o, className_o, id_o) {
    let output = document.createElement('output');
    output.setAttribute('for', forString);
    output.setAttribute('name', nameString);
    output = SetOptionalAttributes(output, ['form', 'class', 'id'], [formId_o, className_o, id_o]);
    return output;
}

////////////////////////////////////////////////////////////////