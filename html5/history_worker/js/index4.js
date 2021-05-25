let slot = document.getElementsByTagName('p')[0];

window.addEventListener('hashchange', e => onRouterChange(e));

function onRouterChange (e) {
  const hashLocation = window.location.hash.substring(1);
  loadingContent(hashLocation);
}

function loadingContent (uri) {
  const contentUri = `${uri}.html`;
  fetch(contentUri)
    .then(r => r.text())
    .then(content => updateSlot(content))
}

function updateSlot (content) {
  slot.innerHTML = content;
}