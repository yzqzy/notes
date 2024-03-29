import { useMemo, useRef, useEffect } from 'react'
import { FormItemProps, Meta } from './dsl.types'
import { FormItem, FormComponent } from './Form'

function useForm(meta: Meta) {
  const form = useMemo(() => new FormComponent(meta), [])
  return form
}

export default ({ meta }: { meta: Meta }) => {
  const form = useForm(meta)
  return <Form item={form.getRoot()} />
}

const Form = (props: FormItemProps) => {
  const item = props.item
  return <div>{item.getChildren().map(child => render(child))}</div>
}

function useListenUpdata(item: FormItem) {
  useEffect(() => {
    // custom update
    // item.on('update', () => {})
  })
}

const Condition = (props: FormItemProps) => {
  const cond = props.item.getCond()
  const condIndex = cond()
  return render(props.item.getChildren()[condIndex])
}

const Input = (props: FormItemProps) => {
  const ref = useRef<HTMLInputElement>(null)

  useListenUpdata(props.item)

  useEffect(() => {
    ref.current!.value = props.defaultValue
  }, [])

  return (
    <input
      ref={ref}
      onChange={e => {
        props.onChange && props.onChange(e.target.value)
      }}
    />
  )
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
    case 'condition':
      return <Condition {...passProps} />
    default:
      throw new Error(`component ${formItem.getType()} not Found`)
  }
}
