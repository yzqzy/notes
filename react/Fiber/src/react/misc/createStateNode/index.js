import { createDOMElement } from '../../dom';

export default function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
}