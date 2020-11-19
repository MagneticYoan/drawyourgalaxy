'use strict';
export {context_color}

let canvas_color = document.getElementById('canvas_color');
let ctx_color = canvas_color.getContext('2d');
let posX_color = 0;
let posY_color = 0;
let context_color = 'white';

// palette de dégradé
document.addEventListener("DOMContentLoaded", function() {
    let degrade = ctx_color.createLinearGradient(0,0,250, 0);
    degrade.addColorStop(0, 'orangered');
    degrade.addColorStop(0.1, 'orange');
    degrade.addColorStop(0.3, 'yellow');
    degrade.addColorStop(0.4, 'lime');
    degrade.addColorStop(0.5, 'aquamarine');
    degrade.addColorStop(0.6, 'cyan');
    degrade.addColorStop(0.7, 'blue');
    degrade.addColorStop(0.8, 'purple');
    degrade.addColorStop(0.9, 'deeppink');
    degrade.addColorStop(1, 'red');
    ctx_color.fillStyle = degrade;
    ctx_color.fillRect(0,0,250,250);
    
    // palette noir & blanc
    let degrade_bw = ctx_color.createLinearGradient(0,0,0,250);
    degrade_bw.addColorStop(0, 'rgba(255,255,255,1)')
    degrade_bw.addColorStop(0.5, 'rgba(255,255,255,0)')
    degrade_bw.addColorStop(0.5, 'rgba(0,0,0,0)');
    degrade_bw.addColorStop(1, 'rgba(0,0,0,1');
    ctx_color.fillStyle = degrade_bw;
    ctx_color.fillRect(0,0,250,250);
})
// change color from button data-set
function changeColor() {
    context_color = $(this).data('color');
}  
    
// get pos from mouse on mouseclick
function getMousePos (e) {
    posX_color = e.offsetX;
    posY_color = e.offsetY;
    getColorRGB();
    canvas_color.addEventListener('click', ()=> {document.getElementById('canvas_color').classList.add("show_selector")})
}

//get rgb code from pixel
function getColorRGB() {
    let data = ctx_color.getImageData(posX_color, posY_color, 1, 1).data;
    context_color = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255 } )`;
}

//change rgb to hexa
function rgbToHex (r, g, b) {
    return '#'+ componentToHex(r) + componentToHex(g) + componentToHex(b)
}

//transform each part of rgb to hexa
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//strokeStyle pour changer la couleur
button_red.addEventListener('click', changeColor);
button_cyan.addEventListener('click', changeColor);
button_orange.addEventListener('click', changeColor);
button_lime.addEventListener('click', changeColor);
canvas_color.addEventListener('click', getMousePos);