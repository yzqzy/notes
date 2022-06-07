import { useEffect, useState } from "react"
import { Button } from 'antd'

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

const HelloHooks = (props: Greeting) => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    if (count > 5) {
      setText('休息一下')
    }
  }, [ count ])

  return (
    <>
      <p>点击了 {count } { text }</p>
      <Button onClick={ () => setCount(count + 1) }>Hello { props.name }</Button>
    </>
  )
}

// 类型提示
HelloHooks.defaultProps = {
  firstName: '',
  lastName: ''
}

export default HelloHooks
