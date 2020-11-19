'use strict';
console.log('ok');
// programme étoiles
const sizes = ['tiny', 'normal', 'big'];
const nbrStars = 150;
let main = document.getElementById('shiningStars');


function createStars (number) {
    for (let i=0; i < number; i++){
        // on "choisit" la taille au hasard
        let whatSize = randomNumber(0,2);
        // on place dans le main
        
        let star = document.createElement('div');
        main.appendChild(star);
        
        star.classList.add('star');
        star.classList.add(sizes[whatSize]);
        
        // on déclare la position
        
        placeStars(star);
        }
    }


function placeStars(element) {
    // window.innerHeight : hauteur de la fenetre
    // window.innerWidth : largeur de la fenetre
    
    element.style.top = `${randomNumber(0, window.innerHeight)}px`;
    element.style.left = `${randomNumber(0, window.innerWidth)}px`;
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export {nbrStars, createStars};