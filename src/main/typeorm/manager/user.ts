import { User } from '../entity'

export const searchAll = () => User.find()

export const addSingle = (state: Sql.User) => {
  const { name, sex, age } = state
  const user = new User()
  user.name = name
  user.sex = sex
  user.age = age

  return user.save()
}
