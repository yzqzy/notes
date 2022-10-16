// const Modal = function (sex, clothes) {
//   this.sex = sex
//   this.clothes = clothes
// }

// Modal.prototype.tablePhoto = function () {
//   console.log(`性别 = ${this.sex}, 衣服 = ${this.clothes}`)
// }

// for (let i = 0; i < 50; i++) {
//   const modal = new Modal('male', `clothes ${i}`)
//   modal.tablePhoto()
// }

// for (let i = 0; i < 50; i++) {
//   const modal = new Modal('female', `clothes ${i}`)
//   modal.tablePhoto()
// }

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// const Modal = function (sex) {
//   this.sex = sex
// }

// Modal.prototype.tablePhoto = function () {
//   console.log(`性别 = ${this.sex}, 衣服 = ${this.clothes}`)
// }

// const maleModal = new Modal('male')
// const femaleModal = new Modal('female')

// for (let i = 0; i < 50; i++) {
//   maleModal.clothes = `clothes ${i}`
//   maleModal.tablePhoto()
// }

// for (let i = 0; i < 50; i++) {
//   femaleModal.clothes = `clothes ${i}`
//   femaleModal.tablePhoto()
// }

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

const Modal = function (sex) {
  this.sex = sex
}

Modal.prototype.tablePhoto = function () {
  console.log(`性别 = ${this.sex}, 衣服 = ${this.clothes}`)
}

const ModalFactory = (function () {
  const modalGender = {}

  return {
    createModal: function (sex) {
      if (modalGender[sex]) return modalGender[sex]
      return (modalGender[sex] = new Modal(sex))
    }
  }
})()

const ModalManager = (function () {
  const modalObj = {}

  return {
    add: function (sex, i) {
      modalObj[i] = {
        clothes: `clothes ${i}`
      }
      return ModalFactory.createModal(sex)
    },
    setExternalState: function (modal, i) {
      modal.clothes = modalObj[i].clothes
    }
  }
})()

for (let i = 0; i < 50; i++) {
  const maleModal = ModalManager.add('male', i)
  ModalManager.setExternalState(maleModal, i)
  maleModal.tablePhoto()
}

for (let i = 0; i < 50; i++) {
  const femaleModal = ModalManager.add('female', i)
  ModalManager.setExternalState(femaleModal, i)
  femaleModal.tablePhoto()
}

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
