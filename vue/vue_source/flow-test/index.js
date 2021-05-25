// @flow

class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;

  constructor (x: string, y: string | number) {
    this.x = x;
    this.y = y;
    this.z = false;
  }
}

var bar: Bar = new Bar('hello', 4);