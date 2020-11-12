// NOTE: document is the one from popup.html
const recordToggle = document.getElementById('record-toggle');
const toggleStates = [...recordToggle.getElementsByTagName('input')];

document.getElementById('options-link').href = `chrome-extension://${chrome.runtime.id}/options/options.html`;
// NOTE: get data from storage
chrome.storage.local.get('recording', data => {
    // NOTE: popup has separate console (but alert is shared)
    console.log(`recording is ${data.recording}`);
    toggleStates[Number(data.recording)].checked = true;
});

// TODO display data sent from content to background

recordToggle.onchange = ({ target: { value } }) => {
    // NOTE: set to local storage, which isnt synced across devices
    chrome.storage.local.set({ recording: !!+value }, () => {
        // NOTE: popup has separate console (but alert is shared)
        console.log(`set recording to ${!!+value}`);
    });

    // NOTE: talk to content and get 1 msg back
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { recording: value }, response => {
            console.log(response.msg);
        });
    });

    // NOTE: this is a way to manipulate the DOM of the page
    // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    //     chrome.tabs.executeScript(
    //         tabs[0].id, { code: 'document.body.style.backgroundColor = "' + appliedColor + '";' });
    // });
};