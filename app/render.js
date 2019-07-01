import p5 from 'p5';

class Render {

    constructor(width, height, entities) {
        this.animater = p5 => {
          p5.setup = () => {
            this.setup(p5);
          }
          p5.draw = () => {
            this.draw(p5);
          }
        }
    
        this.width = width;
        this.height = height;
        this.p5 = new p5(this.animater);
        this.x = 0;
        this.y = 0;
        this.radius = 40;
        this.entities = entities;
      }
    
      setup(p5) {
        this.canvas = p5.createCanvas(this.width, this.height);
      }
    
      draw(p5) {
        p5.background(0, 0, 0);
    
        if(this.entities.length === 0) return;
        for(let entity of this.entities) {
            p5.ellipse(entity.getPosition().x, entity.getPosition().y, this.radius, this.radius);        
        }
      }

}

export default Render;