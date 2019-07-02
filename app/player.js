import Entity from './entity';
import { Howler } from 'howler';
class Player extends Entity {

    constructor(x, y) {
        super({x, y, id: 'player'});
        this.velocity = 1;
        // move 3d space acordding to player's position
        Howler.pos(x, y, -0.5);
    }

    update(position) {
        this.position = position;
        Howler.pos(this.position.x, this.position.y, -0.5);
    }


    getVelocity() {
        return this.velocity;
    }
}

export default Player;