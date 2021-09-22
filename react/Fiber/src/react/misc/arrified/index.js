export default function arrified (arg) {
  return Array.isArray(arg) ? arg : [arg];
}