import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { Company } from '../entities/company.entity';
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
    company: {
      entity: () => Company,
      reference: 'm:1',
      inversedBy: 'users',
      ref: true,
      nullable: true
    },
    profiles: {
      entity: () => Profile,
      reference: '1:m',
      mappedBy: 'user',
      nullable: true
    },
  },
});
