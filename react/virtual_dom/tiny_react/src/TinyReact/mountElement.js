import mountNativeElement from "./mountNativeElement";

export default function mountElement (virtualDOM, container) {
  // Component VS NativeElement
  mountNativeElement(virtualDOM, container);
}