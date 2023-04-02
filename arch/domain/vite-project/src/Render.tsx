import { useMemo, useRef, useEffect } from 'react'
import { FormItemProps, Meta } from './dsl.types'
import { Form, FormItem } from './Form'

function useDSL(meta: Meta) {
  const formDSL = useMemo(() => new Form(meta), [])
  return formDSL
}

export default (meta: Meta) => {
  const formDSL = useDSL(meta)
}

const Form = (props: FormItemProps) => {}
const Input = (props: FormItemProps) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current!.value = props.defaultValue
  }, [])

  return <input ref={ref} onChange={e => props.onChange(e.target.value)} />
}

function render(formItem: FormItem) {
  const passProps = {
    onChange: (value: any) => {
      formItem.setValue(value)
    },
    defaultValue: formItem.getValue(),
    item: formItem
  }

  switch (formItem.getType()) {
    case 'form':
      return <Form {...passProps} />
    case 'input':
      return <Input {...passProps} />
    default:
      throw new Error(`component ${formItem.getType()} not Found`)
  }
}
