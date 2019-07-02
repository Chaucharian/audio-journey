import ambientSound from './sounds/ambiente.mp3';
import fogataSound from './sounds/fuego.mp3';
import natureeSound from './sounds/naturaleza.mp3';

import Player from './player';
import Render from './render';
import Sound from './sound';

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
let upKey = false, downKey = false, leftKey = false, rightKey = false;

class Main {   
    
    constructor() {
        document.addEventListener('keydown', event => {
            const keyCode = event.keyCode;

            if(keyCode === 37) {
                upKey = true;
            } else if(keyCode === 39) {
                downKey = true;
            } else if(keyCode === 38) {
                leftKey = true;
            } else if(keyCode === 40) {
                rightKey = true;
            }
        }, false);
        document.addEventListener('keyup', event => {
            const keyCode = event.keyCode;

            if(keyCode === 37) {
                upKey = false;
            } else if(keyCode === 39) {
                downKey = false;
            } else if(keyCode === 38) {
                leftKey = false;
            } else if(keyCode === 40) {
                rightKey = false;
            }
        }, false);
        document.addEventListener('mousedown', event => {
            this.mouse.click = true;
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        }, false);
        document.addEventListener('mouseup', event => {
            this.mouse.click = false;
        }, false);

        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.entities = [];
        this.player = null;
        this.mouse = { click: false, x: 0, y: 0 };
        this.render = new Render(this.SCREEN_WIDTH, this.SCREEN_HEIGHT, this.entities);

        this.createEntity(new Player(this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT / 2));
        this.update();
    }
    
    update() {
        setTimeout(() => this.update(), 50);

        let playerPosition = this.player.getPosition();

        if(upKey) {
            playerPosition.x -= this.player.getVelocity();
        } else if(downKey) {
            playerPosition.x += this.player.getVelocity();
        } else if(leftKey) {
            playerPosition.y -= this.player.getVelocity();
        } else if(rightKey) {
            playerPosition.y += this.player.getVelocity();
        } else if(this.mouse.click) {
            this.createEntity( new Sound(this.mouse.x, this.mouse.y, fogataSound) );
            this.mouse.click = false;
        }

        this.player.update(playerPosition);
    }

    createEntity(object) {
        // each entity is added to a pool of entities for handling them better
        if(object.getId() === 'player' && this.player === null) this.player = object;
        this.entities.push(object);
    }
   
}

new Main();

/*

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
*/