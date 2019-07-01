import Entity from './entity';

class Player extends Entity {

    constructor(x, y) {
        super({x, y, id: 'player'});
        this.velocity = 20;
    }

    getVelocity() {
        return this.velocity;
    }
}

export default Player;