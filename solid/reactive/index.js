let Listener

function useState(value) {
  const state = {
    value,
    observers: []
  }

  const read = () => {
    if (Listener) {
      Listener.sources.push(this)
      state.observers.push(Listener)
    }
    return state.value
  }

  const write = value => {
    state.value = value

    for (const observer of state.observers) {
      observer()
    }

    return value
  }

  return [read, write]
}

const [usernmae, setUsernmae] = useState('heora')

console.log(usernmae())

setUsernmae('yueluo')

console.log(usernmae())
