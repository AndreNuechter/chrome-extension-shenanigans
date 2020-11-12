chrome.runtime.onInstalled.addListener(() => {
    // NOTE: set data to storage
    // FIXME: this doesnt set recording to false on page refresh and it's shared between tabs
    chrome.storage.local.set({ recording: false }, () => console.log('set data'));

    // NOTE: enable page-action (the pop-up) for all urls
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: '<all_urls>' }
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    // NOTE: listen to content and send 1 msg back (cant be in popup as it closes in click)
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.tagName) {
            // NOTE: extension console
            console.log(`clicked on ${request.tagName}`);
            // TODO store data from content (sync or local?)
            // also, see issue above: data needs to be restricted in a sensible way
            sendResponse({ msg: 'noted' });
        }
        return true;
    });
});