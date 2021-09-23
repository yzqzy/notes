export function createReactInstance (fiber) {
  let instance = null;

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props); 
  } else {
    instance = fiber.type;
  }

  return instance;
}