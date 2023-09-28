import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';


export const profileSchema = new EntitySchema<Profile>({
  class: Profile,
  tableName: 'profile',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    imageUrl: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true
    },
    user: {
      entity: () => User,
      reference: 'm:1',
      inversedBy: 'profiles',
      ref: true
    },
  },
});
