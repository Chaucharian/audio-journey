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
            this.createEntity( new Sound(this.mouse.x, this.mouse.y, this.ui.soundName) );
            this.ui.hidePanel();
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
