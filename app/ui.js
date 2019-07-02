class UI {
    constructor() {

    }

    showPanelOptions(x, y) {
        let panel = document.getElementById('panel');
        panel.style.display = 'block';
        panel.style.top = y;
        panel.style.left = x;
    }
}

export default UI;