var data = [
  {
    name: 'VueJS'
  },
  {
    name: 'ReactJS'
  },
  {
    name: 'AngularJs'
  },
  {
    name: 'jQuery'
  },
  {
    name: 'HTML'
  },
  {
    name: 'CSS'
  }
]

var oupputArea = document.getElementsByClassName('output')[0],
    btn = document.getElementById('btn'),
    inputKwd = document.getElementById('inputKwd');

renderDOM(data);

function renderDOM (data) {
  var outputStr = ''; 

  for (var i = 0; i < data.length; i++) {
    outputStr += '<p>' + data[i].name +  '</p>';
  }

  oupputArea.innerHTML = outputStr;
}

btn.addEventListener('click', function () {
  var showData = data.filter(function (item) {
    return item.name.indexOf(inputKwd.value) !== -1;
  });
  renderDOM(showData);

  history.pushState({ value: inputKwd.value }, null, '#' + inputKwd.value);
}, false);

window.addEventListener('popstate', function (e) {
  var value = e.state ? e.state.value : '';

  var showData = data.filter(function (item) {
    return item.name.indexOf(value) !== -1;
  });
  inputKwd.value = value;
  renderDOM(showData);
}, false);