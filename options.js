const page = document.getElementById('button-div');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
const btnTmpl = document.createElement('button');
const handlerFactory = item => () => {
    chrome.storage.sync.set({ color: item }, () => {
        console.log('color is ' + item);
    });
};

constructOptions(kButtonColors);

function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        const btn = btnTmpl.cloneNode(true);
        btn.style.backgroundColor = item;
        btn.addEventListener('click', handlerFactory(item));
        page.append(btn);
    }
}