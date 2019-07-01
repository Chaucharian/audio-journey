import Entity from './entity';

class Player extends Entity {

    constructor(x, y) {
        super({x, y, id: 'player'});
        this.velocity = 1;
    }

    getVelocity() {
        return this.velocity;
    }
}

export default Player;