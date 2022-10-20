const fs = require('fs')
const path = require('path')

const data_file = path.resolve(__dirname, 'a.txt')
const dest_file = path.resolve(__dirname, 'b.txt')

// const buffer = Buffer.alloc(10)

// fs.open(data_file, 'r', (err, rfd) => {
//   fs.open(dest_file, 'w', (err, wfd) => {
//     fs.read(rfd, buffer, 0, 10, 0, (err, readBytes) => {
//       fs.write(wfd, buffer, 0, 10, 0, (err, wriiten) => {
//         console.log('write success')
//       })
//     })
//   })
// })

// ---------------------------------------------------------------------------

// const BUFFER_SIZE = buffer.length

// let readOffset = 0

// fs.open(data_file, 'r', (err, rfd) => {
//   fs.open(dest_file, 'w', (err, wfd) => {
//     const next = () => {
//       fs.read(rfd, buffer, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
//         if (!readBytes) {
//           fs.close(rfd, () => {})
//           fs.close(wfd, () => {})
//           console.log('copy success')
//           return
//         }

//         readOffset += readBytes

//         fs.write(wfd, buffer, 0, readBytes, (err, wriiten) => {
//           next()
//         })
//       })
//     }
//     next()
//   })
// })

// ---------------------------------------------------------------------------

function copyFile(origin, target, size) {
  const buffer = Buffer.alloc(size)

  let readOffset = 0

  fs.open(origin, 'r', (err, rfd) => {
    fs.open(target, 'w', (err, wfd) => {
      const next = () => {
        fs.read(rfd, buffer, 0, size, readOffset, (err, readBytes) => {
          if (!readBytes) {
            fs.close(rfd, () => {})
            fs.close(wfd, () => {})
            console.log('copy success')
            return
          }

          readOffset += readBytes

          fs.write(wfd, buffer, 0, readBytes, (err, wriiten) => {
            next()
          })
        })
      }
      next()
    })
  })
}

copyFile(data_file, dest_file, 20)
