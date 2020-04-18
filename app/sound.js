import { Howl } from 'howler';
import ambientSound from './sounds/ambiente.mp3';
import fogataSound from './sounds/fuego.mp3';
import natureeSound from './sounds/naturaleza.mp3';

class Sound {

    constructor(x, y, soundPath) {
        
        this.x = x;
        this.y = y;
        this.soundPath = soundPath;
        this.sound = '';

        switch(this.soundPath) {
            case 'Nature':
                this.soundPath = natureeSound;
            break;
            case 'Fire':
                this.soundPath = fogataSound;
            break;
            case 'Ambient':
                this.soundPath = ambientSound;
            break;
        }

        this.sound = new Howl({
            src: [this.soundPath],
            autoplay: true,
            format: ['ogg'],
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