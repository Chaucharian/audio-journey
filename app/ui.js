class UI {
    constructor(soundEntities) {
        this.panel = document.getElementById('panel');
        this.soundConfigPanel = document.getElementById('sound-config');
        this.soundSelectionPanel = document.getElementById('sound-selection');
        this.soundEntities = soundEntities;
        this.soundClicked = false;
    }

    showPanel(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.panel.style.display = 'block';
        this.panel.style.top = this.y;
        this.panel.style.left = this.x;

        if(this.soundClicked) { // open sound config panel if it's clicked on a sound
            this.soundSelectionPanel.style.display = 'none';
            this.soundConfigPanel.style.display = 'block';
        } else {
            this.soundConfigPanel.style.display = 'none';
            this.soundSelectionPanel.style.display = 'block';
        }
    
    }

    hidePanel() {
        this.panel.style.display = 'none';
    }

    soundFound(mouseX, mouseY) {
        for(let soundEntity of this.soundEntities) {
            if(soundEntity.getId() !== 'player') {
                var dx = soundEntity.getPosition().x - mouseX,
                dy = soundEntity.getPosition().y - mouseY,
                circleRadius = 1;
                this.soundClicked = (Math.sqrt(dx * dx + dy * dy) - (soundEntity.getSize() + circleRadius)) <= 0 ? true : false;
            }
        }
        return this.soundClicked;
    }

}

export default UI;