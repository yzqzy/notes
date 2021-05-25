const { getUserClasses, co } = require('./generator');

const uid = 1;

co(getUserClasses(uid)).then(value => {
  console.log(value);
}).catch(reason => {
  console.log(reason);
});
