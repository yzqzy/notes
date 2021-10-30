// Anything exported from this file is importable by other in-browser modules.
export function sayHello (who) {
  console.log(`%c${ who } sayHello`, 'color:skyblue');
}
