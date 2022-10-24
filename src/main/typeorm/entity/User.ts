import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
