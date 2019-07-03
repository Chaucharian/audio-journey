class Entity {

    constructor(args) {
        const { x, y, soundPath, id, size } = args;
        this.position = { x, y };
        this.id = id;
        this.soundPath = soundPath;
        this.size = size || 20;
    }

    update(position) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    setSize(size) {
        this.size = size;
    }

    getSize() {
        return this.size;
    }
    
    getId() {
        return this.id;
    }
}

export default Entity;