import { libPath } from '~/config'
import { Library } from 'ffi-napi'
import { join } from 'path'

const lib = Library(join(libPath, `dll_test_${process.platform}_${process.arch}.dll`), {
  add: ['int', ['int', 'int']]
})

// add (a: number, b: number) => (a + b)

console.log(lib.add(1, 2))
// https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
