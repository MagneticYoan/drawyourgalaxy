'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//carré
ctx.beginPath();
ctx.moveTo(100, 200);
ctx.strokeRect(100, 200, 100, 100);
ctx.closePath();

//triangle
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(500, 35);
ctx.lineTo(500, 125);
ctx.closePath();
ctx.stroke();

//losange
ctx.beginPath();
ctx.moveTo(700,50);
ctx.lineTo(800,100);
ctx.lineTo(700,150);
ctx.lineTo(600, 100);
ctx.closePath();
ctx.stroke();

//grille
ctx.beginPath();
// sur l'axe y
for (let i=300; i<= 500; i += 20) {
    ctx.moveTo(700, i);
    ctx.lineTo(900, i);
    
}
// sur l'axe x
for (let i=900; i>= 700; i -= 20) {
    ctx.moveTo(i, 300);
    ctx.lineTo(i, 500);
}
ctx.stroke();
ctx.closePath();

//spirale bis 
ctx.beginPath();
let x = 400;
let y = 400;
ctx.moveTo(x, y);
for(let i = 400; i>= 50; i -= 50) {
    x -= i;
    ctx.lineTo(x, y);
    y += i;
    ctx.lineTo(x, y);
    i -= 50;
    x += i;
    ctx.lineTo(x, y);
    y -= i;
    ctx.lineTo(x, y);
}
ctx.stroke();
ctx.closePath();
