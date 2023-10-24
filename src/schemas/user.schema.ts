import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';


export const userSchema = new EntitySchema<User>({
  class: User,
  tableName: 'user',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    createdAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
    profile: {
      entity: () => Profile,
      reference: '1:1',
      inversedBy: 'user',
      nullable: true,
      ref: true
    },
  },
});
