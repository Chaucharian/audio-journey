class UI {
    constructor() {

    }

    showOptionsPanel(x, y) {
        let panel = document.getElementById('panel');
        panel.style.display = 'block';
        panel.style.top = y;
        panel.style.left = x;
    }

    hideOptionsPanel() {
        let panel = document.getElementById('panel');
        panel.style.display = 'none';
    }
}

export default UI;