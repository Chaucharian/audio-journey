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
            this.clickOrTouchHandler(event);
        }, false);
        document.addEventListener('mouseup', event => {
            this.mouse.click = false;
        }, false);
        window.addEventListener('devicemotion', event => {
            // Y = < 0 up > 0 down
            // X = < 0 left > 0 rigth
            const x = event.accelerationIncludingGravity.x;
            const y = event.accelerationIncludingGravity.y;
            // determing key by measuring aceleration axis
            if(x >= 0.5) {
                leftKey = true;
                rightKey = false;
            } else if(x <= -0.5) {
                rightKey = true;
                leftKey = false;
            } else {
                leftKey = false;
                rightKey = false;
            }
            if(y >= 0.5) {
                upKey = false;
                downKey = true;
            } else if(y <= -0.5) {
                downKey = false;
                upKey = true;
            } else {
                upKey = false;
                downKey = false;
            }
        }, false);
        document.addEventListener("touchstart", event => {
            this.clickOrTouchHandler(event);
        }, false);
        document.addEventListener("touchend", event => {
            this.mouse.click = false;
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
        // when player reaches the screen bounds
        if( (this.player.getPosition().x - this.player.getSize() / 2) >= this.SCREEN_WIDTH) {
            this.player.setPosition(0, this.player.getPosition().y);
        } else if(this.player.getPosition().x <= 0) {
            this.player.setPosition(this.SCREEN_WIDTH, this.player.getPosition().y);
        } else if(this.player.getPosition().y  <= 0) {
            this.player.setPosition(this.player.getPosition().x, this.SCREEN_HEIGHT);
        } else if( (this.player.getPosition().y - this.player.getSize() / 2) >= this.SCREEN_HEIGHT) {
            this.player.setPosition(this.player.getPosition().x, 0);
        }

        this.player.update();
    }

    createEntity(object) {
        // each entity is added to a pool of entities for handling them better
        if(object.getId() === 'player' && this.player === null) this.player = object;
        this.entities.push(object);
    }

    clickOrTouchHandler(event) {
        if(event.touches !== undefined) {
            const soundName = event.touches[0].target.getAttribute('name'); 
            const mouseX = event.touches[0].pageX, mouseY = event.touches[0].pageY;

            if(this.ui.soundFound(mouseX, mouseY)) { // open sound config panel
                this.ui.showPanel(event.touches[0].clientX, event.touches[0].clientY);
            } else if(soundName === null) { // open sound selection panel
                this.ui.showPanel(event.touches[0].clientX, event.touches[0].clientY);
            } else { // instance sound 
                this.ui.soundName = soundName;
                this.mouse.click = true;
                this.mouse.x = mouseX;
                this.mouse.y = mouseY;
            }
        } else {
            const soundName = event.target.getAttribute('name');
            const mouseX = event.pageX, mouseY = event.pageY;

            if(this.ui.soundFound(mouseX, mouseY)) { // open sound config panel
                this.ui.showPanel(event.clientX, event.clientY);
            } else if(soundName === null) { // open sound selection panel
                this.ui.showPanel(event.clientX, event.clientY);
            } else { // instance sound 
                this.ui.soundName = soundName;
                this.mouse.click = true;
                this.mouse.x = mouseX;
                this.mouse.y = mouseY;
            }
        }
    }

}

// Validates if the user is using http and is not runnning local, then redirect it to the https site
if(window.location.host.split(':')[1] !== '1234' && window.location.protocol !== 'https:') {
    window.location.replace("https://audio-journey.herokuapp.com");
}

new Main();
