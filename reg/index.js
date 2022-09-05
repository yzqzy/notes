const reg = /.*(?=\/)\/(.*)/
const str = 'test/equ/vc-upload-12313123-11.docx'

const newStr = str.replace(reg, function ($, $1) {
  console.log($)
  console.log($1)
  return $.replace($1, 'aaa.docx')
})
