// NOTE: listen to extension (popup) and send 1 msg back
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.recording) {
        const recording = !!+request.recording;
        // NOTE: document is the actual page
        document[
            recording ? 'addEventListener' : 'removeEventListener'
        ]('click', talkToExt);
    }
    sendResponse({ msg: 'gottcha' });
});

function talkToExt({ target }) {
    // NOTE: console belongs to the page
    console.log(target.tagName);

    // NOTE: talk to extension (background) and get 1 msg back
    chrome.runtime.sendMessage({ tagName: target.tagName }, response => {
        console.log(`extension said ${response.msg}`);
    });
}