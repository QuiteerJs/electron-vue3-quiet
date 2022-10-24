import { join } from 'path'
import { Library } from 'ffi-napi'
import { libPath } from '~/config'

const lib = Library(join(libPath, `dll_test_${process.platform}_${process.arch}.dll`), {
  add: ['int', ['int', 'int']],
})

// add (a: number, b: number) => (a + b)

console.log(lib.add(1, 2))
// https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
