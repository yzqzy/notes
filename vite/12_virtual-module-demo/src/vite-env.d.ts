/// <reference types="vite/client" />

interface Studnet {
  name: string;
  age: string;
}

declare module 'sign:*' {
  const student: Studnet
  export default student
}
