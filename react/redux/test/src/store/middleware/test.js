const test = store => next => action => {
  console.log('test running.');
  
  next(action);
}; 

export default test;