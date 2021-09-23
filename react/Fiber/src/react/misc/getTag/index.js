import { Component } from "../../component";

export default function getTag (vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
  if (Object.getPrototypeOf(vdom.type) === Component) {
    return 'class_component';
  }
  return 'function_component';
}