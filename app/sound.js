import Entity from './entity';
import { Howl } from 'howler';

class Sound extends Entity {

    constructor(x, y, soundPath) {
        super({ x, y, id: 'sound', soundPath });
        
        const sound = new Howl({
            src: [soundPath],
            loop: true
        });
        const soundId = sound.play();
        sound.once('play', () => {
          // Set the position of the speaker in 3D space.
          sound.pos(x, y, -0.5, soundId);
          sound.volume(1, soundId);
    
          // Tweak the attributes to get the desired effect.
          sound.pannerAttr({
            panningModel: 'HRTF',
            refDistance: 8,
            rolloffFactor: 2.5,
            distanceModel: 'exponential'
          }, soundId);
        }, soundId);
    }

}

export default Sound;