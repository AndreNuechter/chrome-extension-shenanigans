alert('are you there?');

document.addEventListener('click', ({ target }) => {
    alert(target.tagName);
}, false);