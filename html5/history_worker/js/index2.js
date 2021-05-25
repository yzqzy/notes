let boxes = Array.from(document.getElementsByClassName('box'));

function selectBox (id) {
  boxes.forEach(item => {
    item.classList.toggle('selected', item.id == id);
  });
}

boxes.forEach(item => {
  item.addEventListener('click', e => {
    let id = item.id;
    history.pushState({ id }, null, `selectd=${id}`);
    selectBox(id);
  })
});

window.addEventListener('popstate', e => {
  let id = e.state.id;
  selectBox(id);
});