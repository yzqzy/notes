// function App() {
//   return <h2>Hello world !!!</h2>
// }
// export default App

// ------------------------

// export default function App() {
//   return <Grettings message="Hello React！！！" />
// }

// function Grettings({ message }: { message: string }) {
//   return <h2>{message}</h2>
// }

// function ComposedComponent() {
//   return (
//     <>
//       <A></A>
//       <B></B>
//     </>
//   )
// }

// function A() {
//   return <h2>A</h2>
// }
// const B = () => {
//   return <h2>B</h2>
// }

// ------------------------

// function List({ data }: { data: Array<string> }) {
//   return (
//     <ul>
//       {data.map(word => (
//         <li key={word}>{word}</li>
//       ))}
//     </ul>
//   )
// }

// export default function App() {
//   return <List data={['a', 'b', 'c']} />
// }

// ------------------------

type Children = JSX.Element | JSX.Element[] | null
const Box = ({ children }: { children: Children }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Box>
      <h2>Hello!</h2>
      <h2>Hello!</h2>
    </Box>
  )
}
