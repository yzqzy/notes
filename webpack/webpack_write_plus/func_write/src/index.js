const oBtn = document.getElementById('J-btn');

oBtn.addEventListener('click', function () {
  import(/* webpackChunkName: "login" */ './login.js').then(content => {
    console.log(content);
  })
});

console.log('index');