import Player from './player';
import Render from './render';
import Sound from './sound';
import UI from './ui';

let upKey = false, downKey = false, leftKey = false, rightKey = false;
class Main {   
    
    constructor() {
        document.addEventListener('keydown', event => {
            const keyCode = event.keyCode;

            if(keyCode === 37) {
                leftKey = true;
            } else if(keyCode === 39) {
                rightKey = true;
            } else if(keyCode === 38) {
                upKey = true;
            } else if(keyCode === 40) {
                downKey = true;
            }
        }, false);
        document.addEventListener('keyup', event => {
            const keyCode = event.keyCode;
            if(keyCode === 37) {
                leftKey = false;
            } else if(keyCode === 39) {
                rightKey = false;
            } else if(keyCode === 38) {
                upKey = false;
            } else if(keyCode === 40) {
                downKey = false;
            }
        }, false);
        document.addEventListener('mousedown', event => {
            const soundName = event.target.innerText;
            const mouseX = event.pageX, mouseY = event.pageY;

            if(this.ui.soundFound(mouseX, mouseY)) { // open sound config panel
                this.ui.showPanel(event.clientX, event.clientY);
            } else if(soundName === '') { // open sound selection panel
                this.ui.showPanel(event.clientX, event.clientY);
            } else { // instance sound 
                this.ui.soundName = soundName;
                this.mouse.click = true;
                this.mouse.x = mouseX;
                this.mouse.y = mouseY;
            }
        }, false);
        document.addEventListener('mouseup', event => {
            this.mouse.click = false;
        }, false);
       /* window.addEventListener('deviceorientation', event => {
            let x = event.beta;  // In degree in the range [-180,180]
            let y = event.gamma; // In degree in the range [-90,90]

            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            if (x >  90) { x =  90};
            if (x < -90) { x = -90};

            // To make computation easier we shift the range of 
            // x and y to [0,180]
            x += 90;
            y += 90;
            
            this.player.setOrientationValues({ x, y });
        });*/
        window.addEventListener('devicemotion', event => {
            // Y = < 0 arriba > 0 abajo
            // X = < 0 izquierda > 0 derecha
            // console.log(event.accelerationIncludingGravity.y);
        }, false);




        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.entities = [];
        this.player = null;
        this.mouse = { click: false, x: 0, y: 0 };
        this.ui = new UI(this.entities);
        this.render = new Render(this);

        this.createEntity(new Player(this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT / 2, 40));
        this.update();
    }
    
    update() {
        setTimeout(() => this.update(), 50);

        if(upKey) {
            const newVelocity = this.player.getVelocity().y -= this.player.getAceleration();
            this.player.setVelocityY(newVelocity);
        }
        if(downKey) {
            const newVelocity = this.player.getVelocity().y += this.player.getAceleration();
            this.player.setVelocityY(newVelocity);
        }
        if(leftKey) {
            const newVelocity = this.player.getVelocity().x -= this.player.getAceleration();
            this.player.setVelocityX(newVelocity);
        }
        if(rightKey) {
            const newVelocity = this.player.getVelocity().x += this.player.getAceleration();
            this.player.setVelocityX(newVelocity);
        }
        if(this.mouse.click) {
            this.createEntity( new Sound(this.mouse.x, this.mouse.y, this.ui.soundName) );
            this.ui.hidePanel();
            this.mouse.click = false;
        }

        this.player.update();
    }

    createEntity(object) {
        // each entity is added to a pool of entities for handling them better
        if(object.getId() === 'player' && this.player === null) this.player = object;
        this.entities.push(object);
    }
   
}

new Main();
