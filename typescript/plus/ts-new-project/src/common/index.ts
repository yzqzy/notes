export function getTime() {
  const time = new Date()
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
}
