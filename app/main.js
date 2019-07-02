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
            if(soundName === '') {
                this.ui.showOptionsPanel(event.pageX, event.pageY);
                this.ui.x = event.clientX;
                this.ui.y = event.clientY;
            } else {
                this.ui.soundName = soundName;
                this.mouse.click = true;
                this.mouse.x = this.ui.x;
                this.mouse.y = this.ui.y;
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
        this.render = new Render(this.SCREEN_WIDTH, this.SCREEN_HEIGHT, this.entities);
        this.ui = new UI();
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
            this.createEntity( new Sound(this.mouse.x, this.mouse.y, this.ui.soundName) );
            this.ui.hideOptionsPanel();
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
