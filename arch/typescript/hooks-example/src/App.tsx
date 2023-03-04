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

// type Children = JSX.Element | JSX.Element[] | null
// const Box = ({ children }: { children: Children }) => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       {children}
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <Box>
//       <h2>Hello!</h2>
//       <h2>Hello!</h2>
//     </Box>
//   )
// }

// ------------------------

// import { useState } from 'react'

// export default function Aop() {
//   // const [count, setCount] = useState(0)
//   // const [count, setCount] = useState<number>(0)
//   const [count, setCount] = useState(() => 0)

//   return (
//     <div>
//       {count}
//       {/* Race Condition */}
//       <button onClick={() => setCount(x => x + 1)}>+</button>
//     </div>
//   )
// }

// ------------------------

import { useEffect, useRef, useState } from 'react'
import { timer } from 'rxjs'

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const subscription = timer(0, 1000).subscribe(() => setCount(x => x + 1))
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('count changed to', count)
  }, [count])

  return (
    <div>
      {count}
      <button onClick={() => setCount(x => x + 1)}>+</button>
    </div>
  )
}

// function LogBottonClicks() {
//   const countRef = useRef(0)

//   const handle = () => {
//     countRef.current++
//     console.log(`Clicked ${countRef.current} times`)
//   }

//   console.log('rendered')

//   return <button onClick={handle}>Click me</button>
// }

// function TextInputWithFocusButton() {
//   const inputEl = useRef(null)

//   const onButtonClick = () => {
//     // `current` points to the mounted text input element
//     inputEl.current.focus()
//   }

//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   )
// }

function LogButtonClicks() {
  const countRef = useRef(0)
  const [_, setVer] = useState(0)

  const handle = () => {
    countRef.current++
    console.log(`Clicked ${countRef.current} times`)
    setVer(ver => ver + 1)
  }

  return <button onClick={handle}>Click me</button>
}

// let ref = null
// if (a > 0) {
//   ref = useRef(true)
// } else {
//   ref = useRef((false))
// }
