import { Howler } from 'howler';

class Player {

    constructor(body) {
        this.body = body;
    }

    update() {
        const { x, y } = this.body.position; 
        Howler.pos(x, y, -0.5);
    }

    getBody() {
        return this.body;
    }

    getPosition() {
        return this.body.position;
    }

}

export default Player;