enum ObjectString {
  number = '[object Number]',
  string = '[object String]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  object = '[object Object]',
  array = '[object Array]',
  date = '[object Date]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]',
}

export function isNumber(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.number
}

export function isString(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.string
}

export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.boolean
}

export function isNull(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.null
}

export function isUndefined(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.undefined
}

export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.object
}

export function isArray(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.array
}

export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.date
}

export function isRegExp(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.regexp
}

export function isSet(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.set
}

export function isMap(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.map
}

export function isFile(data: unknown) {
  return Object.prototype.toString.call(data) === ObjectString.file
}
