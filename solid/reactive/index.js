const context = []

function getCurrentObserver() {
  return context[context.length - 1]
}

export function createSignal(value) {
  const subscribles = new Set()

  const read = () => {
    const current = getCurrentObserver()
    if (current) subscribles.add(current)

    return value
  }

  const write = nextValue => {
    value = nextValue
    for (const sub of subscribles) {
      sub()
    }
  }

  return [read, write]
}

export function createEffect(fn) {
  const execute = () => {
    context.push(execute)
    try {
      fn()
    } catch (error) {
      context.pop()
    }
  }

  execute()
}
