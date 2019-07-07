import Entity from './entity';
import { Howler } from 'howler';
class Player extends Entity {

    constructor(x, y, size) {
        super({x, y, size, id: 'player'});
        this.velocity = { x: 0, y: 0 };
        this.aceleration = 0.5;
        this.orientation = { beta: 0, gamma: 0 };
        // move 3d space acordding to player's position
        Howler.pos(x, y, -0.5);
    }

    update() {
        Howler.pos(this.position.x, this.position.y, -0.5);
    }

    setVelocityX(velocity) {
        this.velocity.x = velocity;
        this.velocity.x *= 0.9;
        this.position.x += this.velocity.x;
    }

    setVelocityY(velocity) {
        this.velocity.y = velocity;
        this.velocity.y *= 0.9;
        this.position.y += this.velocity.y;    
    }

    getVelocity() {
        return this.velocity;
    }

    setAceleration(aceleration) {
        this.aceleration = aceleration;
    }

    getAceleration() {
        return this.aceleration;
    }

    setOrientationValues(values) {
        this.orientation = values;
    }

    getOrientationValues() {
        return this.orientation;
    }
}

export default Player;