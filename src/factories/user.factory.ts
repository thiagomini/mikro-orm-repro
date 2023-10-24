import { User } from "../entities/user.entity";
import { FactoryGirl } from 'factory-girl-ts'

export const userFactory = FactoryGirl.define(User, () => ({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}))