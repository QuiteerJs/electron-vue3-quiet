declare namespace Sql {
  interface User {
    name: string
    sex: boolean
    age: number
  }

  interface UserEntity extends User {
    id: number
  }
}
