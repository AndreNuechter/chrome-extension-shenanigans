const changeColor = document.getElementById('change-color');
let clicked = false;

chrome.storage.sync.get('color', (data) => {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = ({ target: { value: color } }) => {
    clicked = !clicked;

    const appliedColor = clicked ? color : 'white';

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(
            tabs[0].id, { code: 'document.body.style.backgroundColor = "' + appliedColor + '";' });
    });
};