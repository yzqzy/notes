const logger = store => next => action => {
  console.log(action, store);
  
  next(action);
}; 

export default logger;