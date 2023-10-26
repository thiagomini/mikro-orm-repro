import { FactoryGirl } from 'factory-girl-ts'

import { User } from "../entities/user.entity";

export const userFactory = FactoryGirl.define(User, () => ({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}))