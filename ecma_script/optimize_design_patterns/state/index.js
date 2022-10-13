// class Light {
//   constructor() {
//     this.state = 'off'
//     this.oBtn = document.getElementById('J-btn')
//   }

//   init() {
//     this.bindEvents()
//   }

//   bindEvents() {
//     this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
//   }

//   buttonWasPressed() {
//     if (this.state === 'off') {
//       console.log('弱光')
//       this.state = 'weak'
//       return
//     }

//     if (this.state === 'weak') {
//       console.log('强光')
//       this.state = 'strong'
//       return
//     }

//     if (this.state === 'strong') {
//       console.log('关灯')
//       this.state = 'off'
//     }
//   }
// }

// new Light().init()

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// class OffLightState {
//   constructor(light) {
//     this.light = light
//   }

//   buttonWasPressed() {
//     console.log('弱光')
//     this.light.setState(this.light.weakLightState)
//   }
// }
// class WeakLightState {
//   constructor(light) {
//     this.light = light
//   }

//   buttonWasPressed() {
//     console.log('强光')
//     this.light.setState(this.light.strongLighttate)
//   }
// }
// class StrongLightState {
//   constructor(light) {
//     this.light = light
//   }

//   buttonWasPressed() {
//     console.log('关灯')
//     this.light.setState(this.light.offLightState)
//   }
// }

// class Light {
//   constructor() {
//     this.offLightState = new OffLightState(this)
//     this.weakLightState = new WeakLightState(this)
//     this.strongLighttate = new StrongLightState(this)

//     this.currentState = this.offLightState
//     this.oBtn = document.getElementById('J-btn')
//   }

//   init() {
//     this.bindEvents()
//   }

//   bindEvents() {
//     this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
//   }

//   buttonWasPressed() {
//     this.currentState.buttonWasPressed()
//   }

//   setState(newState) {
//     this.currentState = newState
//   }
// }

// new Light().init()

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// class State {
//   constructor(light) {
//     this.light = light
//   }

//   buttonWasPressed() {
//     throw new Error('抽象类不允许使用')
//   }
// }

// class OffLightState extends State {
//   buttonWasPressed() {
//     console.log('弱光')
//     this.light.setState(this.light.weakLightState)
//   }
// }
// class WeakLightState extends State {
//   buttonWasPressed() {
//     console.log('强光')
//     this.light.setState(this.light.strongLighttate)
//   }
// }
// class StrongLightState extends State {
//   buttonWasPressed() {
//     console.log('关灯')
//     this.light.setState(this.light.offLightState)
//   }
// }

// class Light {
//   constructor() {
//     this.offLightState = new OffLightState(this)
//     this.weakLightState = new WeakLightState(this)
//     this.strongLighttate = new StrongLightState(this)

//     this.currentState = this.offLightState
//     this.oBtn = document.getElementById('J-btn')
//   }

//   init() {
//     this.bindEvents()
//   }

//   bindEvents() {
//     this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
//   }

//   buttonWasPressed() {
//     this.currentState.buttonWasPressed()
//   }

//   setState(newState) {
//     this.currentState = newState
//   }
// }

// new Light().init()

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

const FSM = {
  off: {
    buttonWasPressed() {
      console.log('弱光')
      this.setState(FSM.weak)
    }
  },
  weak: {
    buttonWasPressed() {
      console.log('强光')
      this.setState(FSM.strong)
    }
  },
  strong: {
    buttonWasPressed() {
      console.log('关灯')
      this.setState(FSM.off)
    }
  }
}

class Light {
  constructor() {
    this.currentState = FSM.off
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    this.currentState.buttonWasPressed.call(this)
  }

  setState(newState) {
    this.currentState = newState
  }
}

new Light().init()

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
