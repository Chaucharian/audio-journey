import {Howl, Howler} from 'howler';
import ambientSound from './sounds/ambiente.mp3';
import fogataSound from './sounds/fuego.mp3';
import natureeSound from './sounds/naturaleza.mp3';

const ambientalSound = new Howl({
    src: [ambientSound],
    loop: true
});
const fireSound = new Howl({
    src: [fogataSound],
    loop: true
});
const natureSound = new Howl({
    src: [natureeSound],
    loop: true
});
const roomSize = 8;
let keys = [];
let position = { x: 4, y: 4 };

main();

function main () {    
    document.addEventListener('keydown', event => {
        keys[event.keyCode] = true;
    }, false);
    document.addEventListener('keyup', event => {
        keys[event.keyCode] = false;
    }, false);

    setSounds();
    update();
}

function setSounds() {
    setAmbientalSound();
    setFireSound();
    setNatureSound();
}

function setAmbientalSound() {
    var soundId = ambientalSound.play();
    ambientalSound.once('play', function() {
      // Set the position of the speaker in 3D space.
      ambientalSound.pos(roomSize, 6, -0.5, soundId);
      ambientalSound.volume(1, soundId);

      // Tweak the attributes to get the desired effect.
      ambientalSound.pannerAttr({
        panningModel: 'HRTF',
        refDistance: 0.8,
        rolloffFactor: 2.5,
        distanceModel: 'exponential'
      }, soundId);
    }.bind(this), soundId);
}

function setFireSound() {
    var soundId = fireSound.play();
    fireSound.once('play', function() {
      // Set the position of the speaker in 3D space.
      fireSound.pos(4, roomSize, -0.5, soundId);
      fireSound.volume(1, soundId);

      // Tweak the attributes to get the desired effect.
      fireSound.pannerAttr({
        panningModel: 'HRTF',
        refDistance: 0.8,
        rolloffFactor: 4.5,
        distanceModel: 'exponential'
      }, soundId);
    }.bind(this), soundId);
}

function setNatureSound() {
    var soundId = natureSound.play();
    natureSound.once('play', function() {
      // Set the position of the speaker in 3D space.
      natureSound.pos(4, 0, -0.5, soundId);
      natureSound.volume(1, soundId);

      // Tweak the attributes to get the desired effect.
      natureSound.pannerAttr({
        panningModel: 'HRTF',
        refDistance: 0.8,
        rolloffFactor: 4.5,
        distanceModel: 'exponential'
      }, soundId);
    }.bind(this), soundId);
}

function update() {
    requestAnimationFrame(update);
    if(keys[37]) {
        position.x -= .01;
    } else if(keys[39]) {
        position.x += .01;
    } else if(keys[38]) {
        position.y += .01;
    } else if(keys[40]) {
        position.y -= .01;;
    }
    // move listener position like a player in a game
    Howler.pos(position.x, position.y, -0.5);
}