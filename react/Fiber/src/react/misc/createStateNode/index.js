import { createDOMElement } from '../../dom';
import { createReactInstance } from '../createReactInstance';

export default function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
  return createReactInstance(fiber);
}