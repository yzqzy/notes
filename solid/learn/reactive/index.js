module.exports = { useState, useEffect }

let Listener = null

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
      observer && observer.fn()
    }

    return value
  }

  return [read, write]
}

function useEffect(fn) {
  const computation = {
    fn,
    sources: []
  }

  let listener = Listener
  Listener = computation

  let nextValue

  try {
    nextValue = computation.fn()
  } catch (error) {
    console.log(error)
  }

  Listener = listener
}
