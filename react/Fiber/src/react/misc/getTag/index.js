export default function getTag (vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
}