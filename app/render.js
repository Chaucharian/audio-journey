import p5 from 'p5';

class Render {

    constructor(world) {
        this.animater = p5 => {
          p5.setup = () => {
            this.setup(p5);
          }
          p5.draw = () => {
            this.draw(p5);
          }
        }
        this.width = world.SCREEN_WIDTH;
        this.height = world.SCREEN_HEIGHT;
        this.mouse = world.mouse;
        this.p5 = new p5(this.animater);
        this.x = 0;
        this.y = 0;
        this.radius = 40;
        this.entities = world.entities;
    }
    
    setup(p5) {
        this.canvas = p5.createCanvas(this.width, this.height);
    }
    
    draw(p5) {
        p5.background(0, 0, 0);

        if(this.entities.length === 0) return;
        for(let entity of this.entities) {
            if(entity.getId() === 'player') p5.ellipse(entity.getPosition().x, entity.getPosition().y, entity.getSize(), entity.getSize());        
            if(entity.getId() === 'sound') p5.rect(entity.getPosition().x - entity.getSize() / 2, entity.getPosition().y - entity.getSize() / 2, entity.getSize(), entity.getSize());        
        }
    }

}

export default Render;