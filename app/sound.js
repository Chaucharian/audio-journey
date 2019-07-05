import Entity from './entity';
import { Howl } from 'howler';
import ambientSound from './sounds/ambiente.mp3';
import fogataSound from './sounds/fuego.mp3';
import natureeSound from './sounds/naturaleza.mp3';
class Sound extends Entity {

    constructor(x, y, soundPath) {
        super({ x, y, id: 'sound', soundPath });

        switch(soundPath) {
            case 'Nature':
                soundPath = natureeSound;
            break;
            case 'Fire':
                soundPath = fogataSound;
            break;
            case 'Ambient':
                soundPath = ambientSound;
            break;
        }
        
        this.sound = new Howl({
            src: [soundPath],
            loop: true
        });
        const soundId = this.sound.play();
        this.sound.once('play', () => {
          // Set the position of the speaker in 3D space.
          this.sound.pos(x, y, -0.5, soundId);
          this.sound.volume(1, soundId);
    
          // Tweak the attributes to get the desired effect.
          this.sound.pannerAttr({
            panningModel: 'HRTF',
            coneOuterAngle: 360,
            coneInnerAngle: 360,
            coneOuterGain: 1,
            maxDistance: 200,
            refDistance: 1,
            rolloffFactor: 1,
            distanceModel: 'exponential'
          }, soundId);
        }, soundId);
    }

}

export default Sound;