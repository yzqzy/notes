class Light {
  constructor() {
    this.state = 'off'
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    if (this.state === 'off') {
      console.log('弱光')
      this.state = 'weak'
      return
    }

    if (this.state === 'weak') {
      console.log('强光')
      this.state = 'strong'
      return
    }

    if (this.state === 'strong') {
      console.log('关灯')
      this.state = 'off'
    }
  }
}

new Light().init()
