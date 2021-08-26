const oBtn = document.getElementById('J-btn');

console.log('index');

oBtn.addEventListener('click', () => {
  import(/*webpackChunkName: 'login'*/'./login.js')
    .then(login => {
      console.log(login);
    })
    .catch(err => {
      console.log(err);
    })
});