class Entity {

    constructor(args) {
        const { x, y, soundPath, id } = args;
        this.position = { x, y };
        this.id = id;
        this.soundPath = soundPath;
    }

    update(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }
    
    getId() {
        return this.id;
    }
}

export default Entity;