const CryptoJS = require('crypto-js')

const AESTool = (key, iv) => {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)

  const options = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }

  return {
    encrypt: text => CryptoJS.AES.encrypt(text, key, options).toString(),
    decrypt: text => CryptoJS.AES.decrypt(text, key, options).toString(CryptoJS.enc.Utf8)
  }
}

const key = '6fa979f20126cb08aa645a8f495f6d85'
const iv = 'I8zyA4lVhMCaJ5Kg'

const { encrypt, decrypt } = AESTool(key, iv)

const text = '月落 heora'

const encoded = encrypt(text)
const decrypted = decrypt(encoded)

console.log('encrypt: ', encoded)
console.log('decrypt: ', decrypted)
