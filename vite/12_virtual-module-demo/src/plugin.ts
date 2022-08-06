const students = [
  {
    name: 'yueluo',
    age: '24'
  },
  {
    name: 'heora',
    age: '24'
  }
]

const modulePrefix = 'sign:'

const getNo = (id: string) => id.split(modulePrefix)[1]
const signIn = (no: string) => students[+no - 1]

export default function MyVirtualDatesPlugin() {
  return {
    name: 'sign-plugin',
    resolveId(id: string) {
      if (signIn(getNo(id))) return id
    },
    load(id: string) {
      const no = getNo(id)

      if (signIn(no)) {
        return `export default ${ JSON.stringify(signIn(no)) }`
      }
    }
  }
}