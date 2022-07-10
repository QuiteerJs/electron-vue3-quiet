import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { nullable: true })
  name: string

  @Column('boolean')
  sex: boolean

  @Column('int')
  age: number
}
