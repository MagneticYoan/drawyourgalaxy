'use strict';
import { context_color } from './paint.js';
import {nbrStars, createStars} from './background.js';

document.addEventListener("DOMContentLoaded", function() {
    
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let drawing = false;
    let posX = 0;
    let posY = 0;
    let context_width = 3;
    let color_selector = document.getElementById('color_selector');
    let buttons = document.querySelectorAll('#button_size button');
    let mirrorX = 0;
    let mirrorY = 0;
    let nbCadrans = 180;
    let radians = (Math.PI / nbCadrans) * nbCadrans;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let prevMirrorX = (cos * (posX - (canvas.width/2))) + (sin * (posY - (canvas.height/2))) + canvas.width/2;
    let prevMirrorY = (cos * (posY - (canvas.height/2))) - (sin * (posX - (canvas.width/2))) + canvas.height/2;
    context.shadowColor = context_color;
    context.shadowBlur = 10;
    
    
    //get mouse y & x coordonates
    function getMousePos (e) {
        posX = e.offsetX;
        posY = e.offsetY;
        drawing = true;
        getMirrorPos(e);
        context.beginPath();
        context.moveTo(posX, posY);
        context.lineTo(posX, posY);
    }
    
    function getMirrorPos (e) {
        prevMirrorX = (cos * (posX - (canvas.width/2))) + (sin * (posY - (canvas.height/2))) + canvas.width/2;
        prevMirrorY = (cos * (posY - (canvas.height/2))) - (sin * (posX - (canvas.width/2))) + canvas.height/2;
        context.moveTo(prevMirrorX, prevMirrorY);
    }
    
    //draw a line from starting pos
    function drawInHere(e) {
        if(drawing) {
            drawALine(context, posX, posY, e);
        }
    }
    
    // draw a line to actual pos
    function drawALine(actualContext, x, y, e) {
        actualContext.strokeStyle = context_color;
        actualContext.lineWidth = context_width;
        getMousePos(e);
        actualContext.lineTo(x, y);
        calculateMirrorCoord(x, y);
        actualContext.moveTo(prevMirrorX, prevMirrorY);
        actualContext.lineTo(mirrorX, mirrorY)
        actualContext.stroke();
    }
    
    // stop drawing
    function stopDrawing () {
        context.closePath();
        drawing = false;
    }
    
    // clear all drawing
    function clearDrawing() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }
    
    //change pen size
    function changeSize() {
        context_width = $(this).data('size');
    }
    
    //save image
    // Convert canvas to image
    function saveImage() {
        let canvas = document.getElementById('canvas');
        let dataURL = canvas.toDataURL("image/jpeg", 1.0);
        downloadImage(dataURL, 'my-canvas.jpeg');
    }
    
    // Save | Download image
    function downloadImage(data, filename = 'untitled.jpeg') {
        let a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
    
    //calculate other coordonates
    function calculateMirrorCoord(x, y) {
        let center = {x: canvas.width/2, y: canvas.height/2};

        mirrorX = (cos * (x - center.x)) + (sin * (y - center.y)) + center.x;
        mirrorY = (cos * (y - center.y)) - (sin * (x - center.x)) + center.y;
        
    }
    
    //event listener for size buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', changeSize);
    }
    
    canvas.addEventListener('mousedown', getMousePos);
    canvas.addEventListener('mousemove', drawInHere)
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    document.getElementById('clear_all').addEventListener('click', clearDrawing);
    document.getElementById('save').addEventListener("click", saveImage);
    color_selector.addEventListener('click', ()=> {document.getElementById('canvas_color').classList.toggle("show_selector")})
    document.addEventListener('DOMContentLoaded', createStars(nbrStars));
})